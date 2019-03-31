const express = require('express');
const router = express.Router();

const list_controller = require('../controllers/list.controller');
const user_controller = require('../controllers/user.controller');

router.get('/getList', list_controller.getList);
router.post('/authenticate', user_controller.authenticate);
router.post('/adduser', user_controller.adduser);
router.post('/update', list_controller.update);
router.post('/create', list_controller.create);
router.post('/delete', list_controller.deleteNote);

module.exports = router;