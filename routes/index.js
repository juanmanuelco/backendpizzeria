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
router.get('/',ensureAuthenticated,function(req,res){
    res.render('index');
});
router.post('/pedidos',function(req,res){
	console.log(req.body);
	var username=req.body.username;
	var carrito=(req.body.carrito).split(',');
	var fecha=new Date(req.body.fecha);
	var total=0;
	var estado='enviado';
	var nuevoCarrito=new Array();
	for(var i=0;i<(carrito.length)-1;i+=5){
		nuevoCarrito.push(new Array(carrito[i], carrito[i+1], carrito[i+2], carrito[i+3], carrito[i+4]));
		total+=Number(carrito[i+4]);
	}
	var pedidoGuardado=new Pedido({
		username:username,
		estado:estado,
		pedido:nuevoCarrito,
		fecha:fecha,
		total:total,
		direccion:req.body.direccion
	});
	pedidoGuardado.save(function(err,resp){
		if(err){
			res.send('Error')
		}else{
			res.send('ok');
		}
	});
});
router.get('/pedidos',function(req,res){
	res.send('Hola')
})
module.exports = router;
