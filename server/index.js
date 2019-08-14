import dotenv from 'dotenv';

import getApp from './server';
import rollbar from '../lib/logger';

dotenv.config();

const port = process.env.PORT || 3000;

const app = getApp();

app.listen(port, () => {
  rollbar.log(`Server started on port ${port}.\n`);
});
