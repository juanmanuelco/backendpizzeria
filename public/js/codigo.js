function obtenerPedido(){
    $.ajax({
		type:"GET", 
		url:'/admin/obtenerpedidos', 
		dataType:"json", 
		async:false,
		contentType:"text/plain", 
		success: function(respuesta){
            var html=`<table class="table">
                        <tr>
                        <th>ID</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Direccion</th>
                            <th>Pedido</th>
                            <th>Total $</th>
                            <th>Acciones</th>
                        </tr>`;
            for(var i=0;i<respuesta.length;i++){
                var htmlPedido=``;
                var contPed=respuesta[i].pedido;
                for(var j=0;j<(respuesta[i].pedido).length;j++){
                    htmlPedido+='<p>'+respuesta[i].pedido[j][3]+' '+respuesta[i].pedido[j][1]+' de $'+respuesta[i].pedido[j][2]+'</p>';
                }
                html+=`<tr>
                        <td>${respuesta[i]._id}</td>
                        <td>${respuesta[i].fecha}</td>
                        <td id="U${respuesta[i]._id}">${respuesta[i].username}</td>
                        <td>${respuesta[i].direccion}</td>
                        <td id="P${respuesta[i]._id}">${htmlPedido}</td>
                        <td>${(Number(respuesta[i].total)).toFixed(2)}</td>
                        <td>
                            <button id="${respuesta[i]._id}" class="btn btn-info" onclick="aceptar(this)">Aceptar</button>
                            <button id="${respuesta[i]._id}" class="btn btn-danger" onclick="rechazar(this)">Rechazar</button>
                        </td>
                        </tr>`
            }
            html+=`</tr></table`
            document.getElementById('pedidosReales').innerHTML=html
        }
    });
}
function aceptar(identificador){
    var id=identificador.id;
    var envio={'id':id};
    var pedido=document.getElementById('P'+id);
    $.ajax({
        type:"POST",
        url:"/admin/aceptar",
        dataType:"text",
        contentType:"application/json",
        data: JSON.stringify(envio)
    }).done(function(resp){
        var dire=document.getElementById('U'+id).innerText;
        emailjs.send("default_service","correodulceyfrio",{
        to_Destinatario: dire, 
        mensaje: 'Su pedido ha sido aceptado    '+pedido});
        alert('Pedido aceptado');

        obtenerPedido();
    })
}
function rechazar(identificador){
    var id=identificador.id;
    var envio={'id':id};
    $.ajax({
        type:"POST",
        url:"/admin/rechazar",
        dataType:"text",
        contentType:"application/json",
        data: JSON.stringify(envio)
    }).done(function(resp){
        var dire=document.getElementById('U'+id).innerText;
        emailjs.send("default_service","correodulceyfrio",{
            to_Destinatario: dire, 
            mensaje: 'Su pedido ha sido rechazado'});
        alert('Pedido rechazado');

        obtenerPedido();
    })
}