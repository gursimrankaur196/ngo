var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.views+=1;
	res.sendFile('login.html', {root: '/home/raghav/projects/trial/myapp/public'});
});

module.exports = router;

