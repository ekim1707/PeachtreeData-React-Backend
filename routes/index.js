var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/react-project-forum', async (req, res) => {
  const forumData = await User.getForumData(req.body);
  console.log(forumData);
  res.json(forumData);
})

router.post('/react-project-forum', async (req, res) => {

  console.log(req.body.dateb64);

  if ((!req.body.postb64) || (!req.body.tagb64) || (!req.body.dateb64) || (!req.body.timeb64)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const forumData = await User.updateForumData(req.body);
  console.log(forumData);
  res.json(forumData);

})

module.exports = router;
