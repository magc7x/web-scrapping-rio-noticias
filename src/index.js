const app = require('express')();
const getNotices = require('./utils/get-info-notice');
const getNotice_notice = require('./utils/get-notice');

app.get('/' , async (req , res) => {
  let notices = await getNotices(1);
  res.json({notices : notices});
});

app.get('/:indx' , async (req , res) => {
  let notices = await getNotices(req.params.indx);
  res.json({notices : notices});
});

app.get('/noticias/:link' , async (req, res) => {
  let notice = await getNotice_notice(req.params.link);
  res.json(notice);
});

app.listen(8081 , () => {
  console.log('http://localhost:8081');
});