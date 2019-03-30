const express = require('express');
const router = express.Router();

const list_controller = require('../controllers/list.controller');

router.get('/getList', list_controller.getList);

module.exports = router;