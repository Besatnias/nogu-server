const express = require('express');
const router = express.Router();

/* GET mensaje. */
router.get('/mensaje', function(req, res, next) {
  res.render('mensaje', { title: 'Envíame un mensaje' });
});

module.exports = router;