var express = require('express');
var router = express.Router();
const { sanitizeBody } = require('express-validator');
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
  console.log(getComponentData);
  res.json(getComponentData);
});

router.post('/registerProcess', [
  sanitizeBody('first_name').escape(),
  sanitizeBody('last_name').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
], async (req, res) => {

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
  res.json(null);
  }
});

router.post('/loginProcess', [
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
], async (req, res) => {

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
    res.json(null);
  }

});

router.post('/update/newsfeed', [
  sanitizeBody('post').escape(),
  sanitizeBody('where').escape(),
  sanitizeBody('whom').escape(),
  sanitizeBody('when').escape(),
  sanitizeBody('user_id').escape(),
], async (req, res) => {

  console.log(req.body);

  if ((!req.body.post) || (!req.body.where) || (!req.body.whom)|| (!req.body.when) || (!req.body.user_id)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const newInfo = await User.updateNewsfeed(req.body);

  res.json(newInfo);

});

router.post('/remove/newsfeed', [
  sanitizeBody('id').escape(),
  sanitizeBody('user_id').escape(),
], async (req, res) => {

  console.log(req.body);

  const removeInfo = await User.removePost(req.body);

  res.json(removeInfo);
});

router.post('/update/quotebook', [
  sanitizeBody('quote').escape(),
  sanitizeBody('type').escape(),
  sanitizeBody('origin').escape(),
  sanitizeBody('significance').escape(),
  sanitizeBody('when_said').escape(),
  sanitizeBody('user_id').escape(),
], async (req, res) => {

  if ((!req.body.quote) || (!req.body.type) || (!req.body.origin)|| (!req.body.significance) || (!req.body.when_said) || (!req.body.user_id)) {
    console.log('some field was not entered');
    res.json({
      msg: 'invalid'
    })
    return;
  }

  const newInfo = await User.updateQuotebook(req.body);

  res.json(newInfo);

});

router.post('/remove/quotebook', [
  sanitizeBody('id').escape(),
  sanitizeBody('user_id').escape(),
], async (req, res) => {

  const removeInfo = await User.removeQuote(req.body);

  res.json(removeInfo);
});

module.exports = router;
