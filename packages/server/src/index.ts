import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import login from './routes/login';
import logout from './routes/logout';
import search from './routes/search';
import status from './routes/status';

dotenv.config();

const main = async () => {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(express.json());

  app.post('/login', login);
  app.delete('/logout', logout);
  app.get('/status', status);
  app.post('/search', search);

  const port = parseInt(process.env.PORT, 10);
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
};

main();
