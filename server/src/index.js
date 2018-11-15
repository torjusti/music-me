import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { synchronizeDatabase } from './models';
import { recomputeIndex } from './search';
import { router as genres } from './routes/genres';
import { router as songs } from './routes/songs';

const app = express();

// Allow cross-origin resource sharing.
app.use(cors());

// Use gzip compression for all requests.
app.use(compression());

// Used for parsing JSON data using Express.
app.use(bodyParser.json());

// Routes for the application.
app.use('/genres', genres);
app.use('/songs', songs);

// Handle errors. This is a middleware which needs to
// be added last, after all other middlewares.
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json();
});

// Either run on the specified port, or default to 8000.
const port = process.env.PORT || 8000;

const initialize = async () => {
  // Create tables in the database.
  await synchronizeDatabase();

  // Create a search index from the database contents.
  await recomputeIndex();
};

/**
 * Initialize all dependencies and start the server.
 */
initialize().then(() => {
  app.listen(port, () => {
    console.log('Started server at port', port);
  });
});
