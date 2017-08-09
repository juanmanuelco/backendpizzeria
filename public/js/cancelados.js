function obtenerCancelados(){
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
                        </tr>`
            }
            html+=`</tr></table`
            document.getElementById('pedidosReales').innerHTML=html
        }
    });
}