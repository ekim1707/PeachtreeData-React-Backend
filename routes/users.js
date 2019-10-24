var express = require('express');
var router = express.Router();
const User = require('../models/User');
const randToken = require('rand-token');

/* GET users listing. */
router.get('/', async (req, res) => {
  console.log('hi');
  const getUserData = await User.getUser(req.query.email);
  res.json(getUserData);
});

router.get('/components', async (req, res) => {
  const getComponentData = await User.getData(req.query.id, req.query.type);
  res.json(getComponentData);
});

router.post('/registerProcess', async (req, res) => {

  if ((!req.body.first_name) || (!req.body.last_name) || (!req.body.email) || (!req.body.password)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const newUserInfo = await User.checkUser(req.body);

  if (newUserInfo.id > 0) {
    const token = randToken.uid(50);
    const updateUserTokenQuery = await User.updateToken(token, req.body.email);
    if (updateUserTokenQuery) {
      res.json({
        msg: 'loggedIn',
        info: newUserInfo,
        token
      })
    }
  } else {
  res.json({msg: 'invalid'});
  }
});

router.post('/loginProcess', async (req, res) => {

  if ((!req.body.email) || (!req.body.password)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const checkUserQuery = await User.checkQuery(req.body);

  if (checkUserQuery.id > 0) {
    const token = randToken.uid(50);
    const updateUserTokenQuery = await User.updateToken(token, req.body.email);
    if (updateUserTokenQuery) {
      res.json({
        msg: 'loggedIn',
        info: checkUserQuery,
        token
      })
    }
  } else {
    res.json({msg: 'invalid'});
  }

});

router.post('/update/newsfeed', async (req, res) => {

  console.log(req.body);

  if ((!req.body.postb64) || (!req.body.whereb64) || (!req.body.whomb64)|| (!req.body.whenb64) || (!req.body.user_id)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const newInfo = await User.updateNewsfeed(req.body);

  res.json(newInfo);

});

router.post('/remove/newsfeed', async (req, res) => {

  console.log(req.body);

  const removeInfo = await User.removePost(req.body);

  res.json(removeInfo);
});

router.get('/connections', async (req, res) => {
  const userDatabaseList = await User.getAllUsers();
  res.json(userDatabaseList);
})

router.put('/update/connections', async (req, res) => {
  const toggleFavorite = await User.toggleFavorite(req.body);
  console.log(toggleFavorite);
  res.json(toggleFavorite);
});

router.post('/update/quotebook', async (req, res) => {

  if ((!req.body.quoteb64) || (!req.body.type) || (!req.body.originb64)|| (!req.body.significanceb64) || (!req.body.when_saidb64) || (!req.body.user_id)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const newInfo = await User.updateQuotebook(req.body);

  res.json(newInfo);

});

router.post('/remove/quotebook', async (req, res) => {

  const removeInfo = await User.removeQuote(req.body);

  res.json(removeInfo);
});

router.post('/update/freewrite', async (req, res) => {

  if ((!req.body.titleb64) || (!req.body.type)|| !(req.body.listb64 || req.body.moodb64) || (!req.body.entryb64) || (!req.body.tagsb64) || (!req.body.user_id)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const newInfo = await User.updateFreeWrite(req.body);

  res.json(newInfo);

});

router.post('/remove/freewrite', async (req, res) => {

  const removeInfo = await User.removeFreeWrite(req.body);

  res.json(removeInfo);
});

router.post('/remove/freewrite-note-delete', async (req, res) => {
  console.log('made it');

  const removeInfo = await User.removeSticky(req.body);

  res.json(removeInfo);
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;
