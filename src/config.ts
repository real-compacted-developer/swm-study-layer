import dotenv from 'dotenv';

dotenv.config();

const config = {
  DB_LAYER_API: process.env.DB_LAYER_API!
};

export default config;
