import { Request, Response } from 'express';
import fs from 'fs';
import { COOKIES_PATH } from '../constants';

const logout = (_: Request, res: Response) => {
  fs.unlinkSync(COOKIES_PATH);

  res.sendStatus(204);
};

export default logout;
