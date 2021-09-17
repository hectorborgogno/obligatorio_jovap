//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//variables Globales
var infoProduct
var opinionesProductos
let puntuacion=0

//funciones para recolectar datos

function enviarComentario(){
    let objetoFecha=new Date()
    let ahora=objetoFecha.getFullYear()+'-'+objetoFecha.getMonth() +'-'+objetoFecha.getDate()+' '+ objetoFecha.getHours()+':'+objetoFecha.getMinutes()+':'+objetoFecha.getSeconds()
    opinionesProductos.push({score: puntuacion, description: document.getElementById('cuerpoComentario').value, user: localStorage.getItem("NombreUsuario"), dateTime: ahora})
 /* let comentario=[]
    comentario[0]=localStorage.getItem("NombreUsuario")
    comentario[1]=document.getElementById('cuerpoComentario').value
    comentario[2]=document.getElementsByName("star").value
    //agregarComentario(comentario) */
    dibujarComentarios(opinionesProductos)
    puntuacion=0
    cambiarNumeroEstrellas()
}

function cambioDeValorEstrellas(a){
    if((a==-1&&puntuacion==0)||(puntuacion==5&&a==1)){
        //indicación de que no se puede
}else{
    puntuacion+=a
    cambiarNumeroEstrellas()
}
}

function cambiarNumeroEstrellas() {
    document.getElementById('NroDeEstrellas').innerHTML=''+puntuacion+''
    document.getElementById('estrellItaOta').setAttribute('width',16+(5*puntuacion))
    document.getElementById('estrellItaOta').setAttribute('height',16+(5*puntuacion))
}

/*
function agregarComentario(comentario){

}
*/
//funciones de dibujado
function dibujarInfoProducto(arreglo){
    let textoCategoria='<span>'+arreglo.category+'</span>'
    let textoNombre='<span>'+arreglo.name+'</span>'
    let textoImagen='<img class="imagenPrincipal" src="'+arreglo.images[0]+'" alt=""></img>'
    let textoDescripcion=''+arreglo.description+''
    let textoPrecioYVendidos='<div id="precioYComprar"><span id="Moneda" class="Precio">'+arreglo.currency+' </span><span id="Precio" class="Precio">'+arreglo.cost+'</span><br><span class"CantidadVendidos">Vendidos: '+arreglo.soldCount+'</span></div>'
    let textoGaleriaImagenes=''
    for(let i=1;i<arreglo.images.length;i++){
        textoGaleriaImagenes+='<td><img class="imagenMediana" src="'+arreglo.images[i]+'";" alt=""><td> '
    }
    let cabeceraProducto='<div id="cabeceraDescr" class="CabeceraDescr">'+textoCategoria+textoNombre+'</div><br>'
    let descrProducto='<table><tr><td>'+textoImagen+'</td><td><div class="container-fluid"> <p class="text-justify">'+textoPrecioYVendidos+'<br>'+textoDescripcion+'</p></div><td></tr></table>'
    document.getElementById('cabecera').innerHTML=cabeceraProducto
    document.getElementById('descripcion').innerHTML='<div class="card">'+descrProducto+'</div>'
    document.getElementById('galeriaImagenes').innerHTML='<table><tr>'+textoGaleriaImagenes+'</tr></table>'
}

function dibujarRecomendacionesAsociadas(productosR){
    
    for(let i=0; i<productosR.length; i++){
        
    }
}

function dibujarComentarios(opinionesProductos) {
    let textoComentarios=''
    for(let i=0; i<opinionesProductos.length; i++){
        textoComentarios+='<div class="card" >'+opinionesProductos[i].user+'<br></br>'+opinionesProductos[i].description +'<br></br>'+opinionesProductos[i].dateTime +'<br></br>'+opinionesProductos[i].score+'</div><br></br>'
    }
    document.getElementById('comentariosPublicados').innerHTML='<table>'+textoComentarios+'</table>'
}

document.addEventListener("DOMContentLoaded", function(e){
    cambiarNumeroEstrellas()
    getJSONData(PRODUCT_INFO_URL).then(function(devolucion){
        if(devolucion.status === 'ok'){ 
            infoProduct=devolucion.data
            dibujarInfoProducto(infoProduct)
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(devolucion){
        if(devolucion.status === 'ok'){ 
            opinionesProductos=devolucion.data
            dibujarComentarios(opinionesProductos)
        }
    })
});