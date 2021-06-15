import { Fragment, useEffect, VFC } from 'react';
import { SearchResponse } from '../api/api';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';

type ResultsListProps = { results: SearchResponse };

const ResultsList: VFC<ResultsListProps> = ({ results }) => {
  useEffect(() => {
    if (results) {
      // Attach facebook sdk script
      const facebookScript = document.createElement('script');
      facebookScript.async = true;
      facebookScript.defer = true;
      facebookScript.src =
        'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2';
      document.body.appendChild(facebookScript);

      // Refresh elements
      if ((window as any).FB) {
        (window as any).FB.XFBML.parse();
      }

      // Remove script
      return () => {
        document.body.removeChild(facebookScript);
      };
    }

    return () => {};
  }, [results]);

  return (
    <>
      <div id='fb-root' />
      <div>
        {results.map(({ id, name, posts }) => (
          <Accordion
            defaultExpanded
            disabled={!posts}
            TransitionProps={{ timeout: 500 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <span className='flex-1'>{name || id}</span>
              <span>{posts ? `${posts.length} Posts` : 'Not found'}</span>
            </AccordionSummary>
            {posts && (
              <AccordionDetails className='flex flex-col space-y-4'>
                {posts.map(({ href, content }) => (
                  <Fragment key={href}>
                    {href.includes('/posts/') && (
                      <div
                        className='fb-post bg-white w-min mx-auto'
                        data-href={href}
                        data-width={500}
                      />
                    )}
                    {href.includes('/permalink/') && (
                      <div className='p-4 text-gray-900 bg-white'>
                        <a
                          className='text-purple-500'
                          href={href}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {href}
                        </a>
                        <div className='mt-4'>{content}</div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default ResultsList;
