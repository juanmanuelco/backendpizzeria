var express = require('express'), router = express.Router();

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user'),
	bcrypt = require('bcryptjs');

	
router.post('/register',function(req,res){
  if(req.body.password!=req.body.reppass){res.send('Error 2');}else{
    User.findOne({username:req.body.username}).exec(function(err,resp){
      if(err){
        res.send('Error 1');
      }else{
        if(resp!=null){
          res.send('Error 3');
        }else{
          var newUser = new User({
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            cedula:req.body.cedula,
            celular:req.body.celular,
            username:req.body.username ,
            password:req.body.password
          });
          User.createUser(newUser, function (errorCrear, user) {
						if(errorCrear){
							res.send('Error 1');
						}else{
							res.send('ok');
						}
					});
        }
      }
    });
  }
});

router.get('/login',function(err,res){
  res.render('login');
})

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) { return done(null, false, { message: 'Usuario desconocido' }); }
				User.comparePassword(password, user.password, function (err, isMatch) {
					if (err) throw err;
					if (isMatch) {return done(null, user);}
					else { return done(null, false, { message: 'Contraseña incorrecta' }); }
				});
		});
}));
//Serializa al usuario_____________________________________________________________________________________________________________________
passport.serializeUser(function (user, done) { done(null, user.id); });

//Deserializa al usuario____________________________________________________________________________________________________________________
passport.deserializeUser(function (id, done) { User.getUserById(id, function (err, user) { done(err, user); }); });


router.post('/login', passport.authenticate('local',
 { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
  function (req, res) { 
		res.redirect('/');
});



router.post('/loginMovil',function(req,res){
  console.log(req.body)
	var username=req.body.username,password=req.body.password;
    User.findOne().where({username:username}).exec(function(err,resp){
        if(err){res.send('Error 1')}else{
            if(resp){
								bcrypt.compare(password, resp.password, function(err, isMatch) {
										if(isMatch){
                      res.send(resp)
                    }//Inicia sesión
										else{res.send('Error 2')}//Contraseña incorrecta
								});
            }else{
                res.send('Error 3');
            }            
        }
	});
})

module.exports = router;
