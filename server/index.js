import dotenv from 'dotenv';

import getApp from './server';
import logger from '../lib/logger';

dotenv.config();

const port = process.env.PORT || 3000;

const app = getApp();

app.listen(port, () => {
  logger.info(`Server started on port ${port}.\n`);
});
