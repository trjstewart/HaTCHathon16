const router = require('express').Router();

router.get('/', function(req, res) { res.render('index') });

router.use('/user', require('./users'));
router.use('/queue', require('./queue'));

module.exports = router;