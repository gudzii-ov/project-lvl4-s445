import crypto from 'crypto';

export const secret = process.env.CRYPTO_SECRET;

export const encrypt = (value) => crypto.createHmac('sha256', secret)
  .update(value)
  .digest('hex');
