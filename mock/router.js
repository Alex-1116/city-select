const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/allcity',service.getAllCity);

router.get('/nowcity',service.getNowCity);

router.get('/hotcity',service.getHotCity);

module.exports = router;