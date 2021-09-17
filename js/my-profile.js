//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Despliega nombre de usuario y el boton desconectar en el panel de navegacion
function despliegueUsuario(){
    let textoEntrante=localStorage.getItem("NombreUsuario")
    document.getElementById('barraNav').innerHTML+=textoEntrante+'<button id="botonDesconectar" onclick="desconectar()">Desconectar</button>'
}

//ejecuta la desconexion
function desconectar(){
    localStorage.removeItem("NombreUsuario")
    location.href="login.html"
}

document.addEventListener("DOMContentLoaded", function (e) {
    despliegueUsuario()
});
