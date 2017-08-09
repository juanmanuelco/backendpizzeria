var express = require('express'), router = express.Router();
var Pedido = require('../models/pedidos');

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		usuarioLogeado = req.user.username;
		return next();
	} else {
		res.redirect('/users/login');
	}
}

router.get('/obtenerpedidos',ensureAuthenticated,function(req,res){
    Pedido.find().where({estado:'enviado'}).exec(function(err,resp){
        res.send(resp);
    });
});
router.get('/obteneraceptados',ensureAuthenticated,function(req,res){
    Pedido.find().where({estado:'aceptado'}).exec(function(err,resp){
        res.send(resp);
    });
});
router.get('/obtenerrechazados',ensureAuthenticated,function(req,res){
    Pedido.find().where({estado:'rechazado'}).exec(function(err,resp){
        res.send(resp);
    });
});

router.get('/aceptados',ensureAuthenticated,function(req,res){
    res.render('reportes');
});
router.get('/cancelados',ensureAuthenticated,function(req,res){
    res.render('cancelados');
});


router.post('/aceptar',function(req,res){
    Pedido.findByIdAndUpdate({_id:req.body.id},{estado:'aceptado'}).exec(function(err,resp){
        res.send('ok')
    });
});
router.post('/rechazar',function(req,res){
    Pedido.findByIdAndUpdate({_id:req.body.id},{estado:'rechazado'}).exec(function(err,resp){
        res.send('ok')
    });
});

module.exports = router;
