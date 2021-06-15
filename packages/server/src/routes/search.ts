import { Request, Response } from 'express';
import SearchParams from '../@types/SearchParams';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { COOKIES_PATH } from '../constants';
import SearchResponse, { Post } from '../@types/SearchResponse';
import sleep from '../utils/sleep';

const search = async (req: Request, res: Response) => {
  const { searchString, ids } = req.body as SearchParams;

  // Load auth cookies
  const cookiesExist = fs.existsSync(COOKIES_PATH);
  if (!cookiesExist) return res.sendStatus(401);
  const cookies = JSON.parse(fs.readFileSync(COOKIES_PATH, 'utf-8'));
  if (!Object.keys(cookies).length) return res.sendStatus(401);

  // Setup browser
  const browser = await puppeteer.launch({
    headless: !!parseInt(process.env.HEADLESS, 10),
  });

  const context = browser.defaultBrowserContext();
  context.overridePermissions('https://www.facebook.com', []);

  const results = await Promise.all(
    ids.map(async ({ type, value }) => {
      const page = await browser.newPage();
      await page.setCookie(...(cookies as any));
      await page.setViewport({ width: 500, height: 1000 });
      await page.setRequestInterception(true);

      page.on('request', (req) => {
        if (req.resourceType() === 'image') req.abort();
        else req.continue();
      });

      const url = `https://www.facebook.com/${
        type === 'page' ? 'page' : 'groups'
      }/${value}/search/?q=${encodeURIComponent(searchString)}`;
      await page.goto(url, { waitUntil: 'networkidle2' });

      console.log(`started crawling ${url}.`);

      const feed = await page
        .waitForSelector('[role="feed"]', { timeout: 3000 })
        .catch(() => {});

      if (!feed) {
        console.log(`No feed found on ${url}, closing page.`);
        await page.close();
        return { id: value };
      }

      const posts: Post[] = [];

      // Scroll to bottom to fetch all post
      const infiniteScroll = () =>
        new Promise<void>((res) => {
          let responseCount = 0;

          setTimeout(() => {
            console.log(`Scrolling timeout on ${url}.`);
            res();
          }, 10000);

          const scroll = () => {
            const currentResponseCount = responseCount;
            page.evaluate(() => {
              window.scrollBy(0, 1000);
            });
            setTimeout(() => {
              // No more response
              if (responseCount === currentResponseCount) {
                console.log(`Scrolling ended on ${url}.`);
                res();
              }
            }, 3000);
          };

          page.on('response', () => {
            responseCount += 1;
            scroll();
          });

          scroll();
        });

      await infiniteScroll();

      // Get all hrefs in feed
      console.log(`Scanning ${url} for hrefs.`);
      const anchors = await page.$$('[role="feed"] a[role="link"]');
      const getHrefs = async () => {
        for (let i = 0; i < anchors.length; i++) {
          // Some hrefs only assigned on anchor hover
          await anchors[i].hover().catch(() => {});
          await sleep(100);

          const href = await (
            await anchors[i].getProperty('href')
          )?.jsonValue<string>();

          if (href) {
            if (href.includes('/posts/')) posts.push({ href });
            if (href.includes('/permalink/')) {
              const content =
                (await anchors[i].evaluate((el) => el.textContent)) || '';
              posts.push({ href, content });
            }
          }
        }
      };
      await getHrefs();

      console.log(`Fetching ended on ${url}, closing page.`);
      await page.close();

      if (posts.length === 0) return { id: value };

      return {
        id: value,
        name: posts[0].href.split('/')[type === 'group' ? 4 : 3],
        posts,
      } as SearchResponse[number];
    })
  ).catch((err) => {
    console.error(err);
    return null;
  });

  await browser.close();

  if (results)
    return res.status(200).send(
      results.sort((a, b) => {
        return (b.posts?.length || 0) - (a.posts?.length || 0);
      })
    );
  return res.sendStatus(500);
};

export default search;
