import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';

// configurações
const app = express();
app.use(express.json());

routes(app);

export default app;