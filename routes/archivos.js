const express = require('express');
const router = express.Router();

/* GET archivos. */
router.get('/', function(req, res, next) {
  res.render('archivos', { title: 'archivos' });
});

module.exports = router;
