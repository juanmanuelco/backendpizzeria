var mongoose = require('mongoose');
var PedidoSchema = mongoose.Schema({
    username:{type:String},
    estado:{type:String},
    pedido:{type:Array},
    fecha:{type:Date},
    total:{type:Number},
    direccion:{type:String}
});

var Pedido=module.exports=mongoose.model('Pedido',PedidoSchema);