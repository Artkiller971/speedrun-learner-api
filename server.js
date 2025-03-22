import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import gamesRouter from './routes/games.js';
import guidesRouter from './routes/guides.js';
import timingsRouter from './routes/timings.js'

import setupDb from './setupDb.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const app = express();

setupDb();

app.use(express.json());

app.use('/api/games', gamesRouter);
app.use('/api/guides_sets', guidesRouter);
app.use('/api/timings', timingsRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
});

app.listen(3003, () => console.log('Listening on port 3003'));