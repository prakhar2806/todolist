const express = require('express');
const router = express.Router();

const list_controller = require('../controllers/list.controller');
const user_controller = require('../controllers/user.controller');

router.get('/getList', list_controller.getList);
router.post('/authenticate',user_controller.authenticate);

module.exports = router;