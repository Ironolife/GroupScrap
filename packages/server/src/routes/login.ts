import dotenv from 'dotenv';
import { Request, Response } from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { COOKIES_PATH } from '../constants';

dotenv.config();

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const cookiesExist = fs.existsSync(COOKIES_PATH);

  if (
    !cookiesExist ||
    !Object.keys(fs.readFileSync(COOKIES_PATH, 'utf-8')).length
  ) {
    const browser = await puppeteer.launch({
      headless: !!parseInt(process.env.HEADLESS, 10),
    });

    const context = browser.defaultBrowserContext();
    context.overridePermissions('https://www.facebook.com', []);

    const page = await browser.newPage();

    await page.goto('https://www.facebook.com/login');

    await page.type('#email', email);
    await page.type('#pass', password);

    await page.click('#loginbutton');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    const groupLink = await page
      .waitForSelector(
        '[href="https://www.facebook.com/groups/?ref=bookmarks"]',
        { timeout: 3000 }
      )
      .catch((err) => res.sendStatus(401));

    if (groupLink) {
      fs.writeFileSync(COOKIES_PATH, JSON.stringify(await page.cookies()));

      await browser.close();
      return res.sendStatus(200);
    }

    await browser.close();
    return res.sendStatus(401);
  }

  return res.sendStatus(200);
};

export default login;
