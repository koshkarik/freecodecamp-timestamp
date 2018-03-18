import express from 'express';
import url from 'url';

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const { host } = req.headers;
  const href = url.parse(host).href;
  const link1 = `https://${href}/1450137600`;
  const link2 = `https://${href}/21 May 1985`;
  res.render('index', { link1, link2 });
});

app.get('/:time', (req, res) => {
  const input = req.params.time;
  let time;
  const check = /^\d+$/.test(input);
  switch (check) {
    case true:
      time = new Date(Number(input));
      break;
    default:
      time = new Date(input);  
  }
  if(isNaN(time.getTime())) {
    res.render('search', { humanDate: 'null', timeStamp: 'null' });
    return;
  }
  const humanDate = time.toDateString();
  const timeStamp = Date.parse(time);
  res.render('search', { humanDate, timeStamp });
});

app.use((req, res) => {
  res.status(404);
  res.send('404 - Page was not found');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500);
  res.send('500 - Server Error');
});


app.listen(app.get('port'), () => {
  console.log('Express server is running');
});