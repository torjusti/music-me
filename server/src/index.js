import express from 'express';

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Started server at port', port);
});

app.get('/songs', (req, res) => {
  const book = {
    id: 0,
    title: 'My nice song',
  };

  res.json([book]);
});