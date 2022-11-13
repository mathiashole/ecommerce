const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
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

function allowEntry(){

  if(localStorage.getItem('userName') === null){
    window.location = "login.html";
  } else {
    // document.getElementById('profile').innerHTML = (localStorage.getItem("text"));
    showUserMenu();
  }

};


function showUserMenu() {

  let userToAppend = "";
  let userGet = localStorage.getItem('userName');

  userToAppend += `
  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  ${userGet}
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item-text" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item-text" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item-text" onclick= "signOff()">Cerrar sesion</a></li>
  </ul>

  `

  document.getElementById("profile").innerHTML = userToAppend;

}

function signOff(){

  let option = confirm('Deseas cerrar sesion?');

  if(option == true){
    localStorage.removeItem('userName');
    location.reload();
  };

}


