var express = require('express'), router = express.Router();
var Pedido = require('../models/pedidos');
router.get('/obtenerpedidos',function(req,res){
    Pedido.find().where({estado:'enviado'}).exec(function(err,resp){
        res.send(resp);
    });
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
