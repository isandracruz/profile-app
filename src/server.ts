import dotenv from 'dotenv';
import App from './app';
import database from './database';

dotenv.config();

database();
const app = new App();
app.start();