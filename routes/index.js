var express = require('express'), router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		usuarioLogeado = req.user.username;
		return next();
	} else {
		res.redirect('/users/login');
	}
}
router.get('/',ensureAuthenticated,function(req,res){
    res.render('index');
});
module.exports = router;
