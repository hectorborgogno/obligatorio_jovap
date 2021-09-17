//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

    //Dpmde se guardará la información obtenida del JSON
    var listaProductos=[];
    //Crear la parrilla de productos
    function cambioDeValor(){
    mostrarArticulos(listaProductos)
}

    function dibujarBotonAoD(opc){
        let dibujoBoton
        let dibujoOpcionBoton
        let dibujoFuncionBoton

        if(opc==true){
            dibujoOpcionBoton="May a Men"
            dibujoFuncionBoton=" onclick='ordenarDescendente() '"
        }else{
            dibujoOpcionBoton="Men a May"
            dibujoFuncionBoton="onclick=' ordenarAscendente() '"
        }

        dibujoBoton='<button '+dibujoFuncionBoton+' >'+dibujoOpcionBoton+'</button>'
        document.getElementById("ordenamientoPorPrecio").innerHTML=dibujoBoton

    }

    function mostrarArticulos(arreglo){
        let lugar;
        let texto='';
        for(let i=0; i<arreglo.length; i++){
            arreglo[i];
            if((arreglo[i].cost>parseInt(document.getElementById('CantidadMenor').value)||document.getElementById('CantidadMenor').value=='')&&(arreglo[i].cost<parseInt(document.getElementById('CantidadMayor').value)||document.getElementById('CantidadMayor').value=='')){
            //crea una fila donde se muestra un producto, esta fila tiene la iamgen en una celda, el nombre y la descripcion en la siguiente y por último el precio (en ésta última se agregará el boton de compra y demas posivildiades)
            texto+="<tr><td><img class='ParrillaProductos' src='"+arreglo[i].imgSrc+"' alt=''></td><td><p>"+arreglo[i].name+"<br>"+arreglo[i].description+"</p></td><td><p>"+arreglo[i].currency+":"+arreglo[i].cost+"<br>Vendidos:"+arreglo[i].soldCount+"<br><button class='botonCompra' onclick='botonComprar()' >comprar</button></p></td></tr>"
        }}
        document.getElementById('parrilla').innerHTML=texto;
    }

    function ordenarAscendente(){
        arreglo=listaProductos.sort((a,b)=>{
            return a.cost-b.cost
        })
        mostrarArticulos(arreglo)
        dibujarBotonAoD(true)
    }

    function ordenarDescendente(){
        arreglo=listaProductos.sort((a,b)=>{
            return b.cost-a.cost
            
        })
        mostrarArticulos(arreglo)
        dibujarBotonAoD(false)
    }

    function ordenarRelevancia(){
        arreglo=listaProductos.sort((a,b)=>{
            return b.soldCount-a.soldCount                
        })
        mostrarArticulos(arreglo)
    }

    function botonComprar(){
        location.href="product-info.html"
    }

    //Dibujar las diferentes intarfaces de filtros
/*
    function dibujarListaFiltros(){
        let textoE='<select name="Filtros" id="Filtros"><option value="Vacio" >...</option><option value="SeleccionarFiltroPorPrecio">Precio</option> <option value="Stock (en progreso)"></option></select><button id="abrirFiltro" onclick="abrirFiltro()">apply</button>'
        document.getElementById('filtros').innerHTML=textoE
    }
*/
/*
    function abrirFiltro(){
        interfSelCant()
        alert("funciona")
        alert(getElementById("Filtros").value)
        let opcion=getElementById("Filtros").value
        alert(opcion)
        switch (opcion){
            case "SeleccionarFiltroPorPrecio":
                interfSelCant();
                break;
            default:
                document.getElementById('filtros').innerHTML+="seleccione un filtro valido"
                break;
        }
    }
*/
    function interfSelCant(){
        let textoE='<input type="number" name="Cantidad" id="CantidadMenor" onchange="cambioDeValor()" >a<input type="number" name="CantidadMayor" id="CantidadMayor" onchange="cambioDeValor()" ><button class="botonPequenio" id="botonAplicarFiltro" onclick="cambioDeValor()">apply</button>'
        document.getElementById('filtros').innerHTML=textoE
    }

    //Fin del dibujado de las diferentes interfaces

    
    //Se creará un nuevo arreglo respetando los filtros
/*
    function filtroPorPrecio(arreglo){
        
        //se comprueva si uno de los campos de filtros para saber si estan vacios
        let nuevoArreglo={}
        nuevoArreglo=arreglo.filter(lugar=> {
            let precioMayor=parseInt(document.getElementById('CantidadMayor'))
            if(precioMayor==''){
                //si el campo esta vacio se da como complida la condicion sin comprovar comparaciones numericas
                return true
            }else{
                return lugar.cost<precioMayor.value
            }
        } && function (){
            //lo mismo que el aterior solo que papra los precios menores al maximo
            let precioMenor=parseInt(document.getElementById('CantidadMenor'))
            if(precioMenor==''){
                return true
            }else{
                return lugar.cost>precioMenor.value
            }
        })
        return nuevoArreglo
    }
*/
    //se crea la nueva lista y se muestra respetando los filtros de precio
function productosFiltrados(){

    getJSONData(PRODUCTS_URL).then(function(devolucion){
        if(devolucion.status === 'ok'){ 
            listaProductos=filtroPorPrecio(devolucion.data)
            mostrarArticulos(listaProductos);
        }
    })
}


//al iniciar la pagina se cargan los productos
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(devolucion){
        if(devolucion.status === 'ok'){ 
            listaProductos = devolucion.data;
            mostrarArticulos(listaProductos);
        }
    })
    interfSelCant()
    dibujarBotonAoD(true)
})