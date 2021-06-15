import { Request, Response } from 'express';
import fs from 'fs';
import { COOKIES_PATH } from '../constants';

const status = (_: Request, res: Response) => {
  const cookiesExist = fs.existsSync(COOKIES_PATH);

  if (
    !cookiesExist ||
    !Object.keys(fs.readFileSync(COOKIES_PATH, 'utf-8')).length
  )
    return res.sendStatus(401);

  return res.sendStatus(200);
};

export default status;
