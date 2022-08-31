import { application } from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3001;

application.start(PORT);
