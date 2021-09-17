const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//dibujado de interfaces

function dibujoBarraNav(){
  textoBarraNav='<div><a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>  <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>  <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>  <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>  <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a></div></br><div id="barraBusqueda">    <input type="search" name="busqueda" id="inputBusqueda" onchange="barraBusqueda()"></input><button onclick="barraBusqueda()">search</button></div>'
  document.getElementById('barraNav').innerHTML=textoBarraNav
}

function listaBarraBusqueda(textoBuscado){
  
  getJSONData(PRODUCTS_URL).then(function(devolucion){
    if(devolucion.status === 'ok'){ 
        arreglo = devolucion.data;
    }
})


//alert("se ejecuta el get jason data")
let textoLista='<ul>'
for(let i=0; i<arreglo.length; i++){
  nombre=arreglo[i].name
  //alert("entra en el for")
  if(nombre.includes(textoBuscado)){
  //crea una fila donde se muestra un producto, esta fila tiene la iamgen en una celda, el nombre y la descripcion en la siguiente y por último el precio (en ésta última se agregará el boton de compra y demas posivildiades)
  textoLista+='<li>'+nombre+'</li>'
  }
}
textoLista+='</ul>'
return textoLista
}

function barraBusqueda(){
  let textoBusqueda=document.getElementById('inputBusqueda').value
  let textoBarraBusqueda='<input type="search" name="busqueda" id="inputBusqueda" onchange="barraBusqueda()"value="'+textoBusqueda+'"></input><button onclick="barraBusqueda()">search</button>'
  if(textoBusqueda!=''){
    //alert("entra en el if")
    textoBarraBusqueda+=listaBarraBusqueda(textoBusqueda)
  }
  document.getElementById('barraBusqueda').innerHTML=textoBarraBusqueda
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  dibujoBarraNav()
  barraBusqueda()
});