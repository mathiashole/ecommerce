console.log('this event active');

//Global variables

const CART_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const itemsCart = document.getElementById('itemsCart');
const footer = document.getElementById('footer');
const templateCart = document.getElementById("templateTable").content;
const fragment = document.createDocumentFragment();
const templateTableSecond = document.getElementById("templateTableSecond").content;
const fromToInfoProduct = document.getElementById("fromToInfoProduct");
const streethome = document.getElementById('street-home');
const numberhome = document.getElementById('number-home');
const sqrhome = document.getElementById('sqr-home');
const validationstreet = document.getElementById('validation-street');
const validationnumber = document.getElementById('validation-number');
const validationsqr = document.getElementById('validation-sqr');
const creditcart = document.getElementById('credit-cart');
const wiretransfer = document.getElementById('wire-transfer');
const validationpay = document.getElementById('validation-pay');
const goldradio = document.getElementById('goldradio');
const premiumradio = document.getElementById('premiumradio');
const standardradio = document.getElementById('standardradio');
const containerPrice = document.getElementById('containerPrice');
const buySuccess = document.getElementById('buySuccess');
const exampleModal = document.getElementById("exampleModal");
const map = [];
let number = {};


//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID


const showCart = () => {
   
    itemsCart.innerHTML = ''
    presentCartArray.articles.forEach(product => {
        
        // templateCart.querySelector('input').setAttribute('id', product.id)
        templateCart.querySelector('img').setAttribute('src', product.image)
        templateCart.querySelectorAll('td')[0].textContent = product.name
        // templateCart.querySelectorAll('td')[1].dataset.id = product.id
        templateCart.querySelectorAll('td')[1].textContent = product.currency + " " + product.unitCost
        templateCart.querySelector('input').dataset.id = product.id
        templateCart.querySelector('input').setAttribute('value', product.count) 
        // templateCart.querySelector('.btn-success').dataset.id = product.id
        // templateCart.querySelector('.btn-danger').dataset.id = product.id
        templateCart.querySelectorAll('b')[0].textContent =  product.currency
        templateCart.querySelectorAll('b')[1].dataset.id = product.id
        templateCart.querySelectorAll('b')[1].textContent =  1 * product.unitCost
        templateCart.querySelectorAll('button')[1].id = product.id

        const clone = templateCart.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCart.appendChild(fragment)

    // showFooter()

}

const showFooter = () => {
    footer.innerHTML = ''
    if((presentCartArray.articles.length || JSON.parse(localStorage.getItem('data')).length) === 0){
        footer.innerHTML= `
        <th scope="row" colspan="5">Carrito vacio, Agregue sus productos</th>
        `
    }

}


function cat(){

    const init = presentCartArray.articles[0]
    const numberObject = document.querySelectorAll('input')[0].value;
    document.getElementById("totalCost").innerHTML = init.unitCost * numberObject 
        
}

function getProductInfo(){
    
    let arrayCartProduct = localStorage.getItem("data");
    
    if(arrayCartProduct == null){
        localStorage.setItem('data', '[]')
    }

    arrayCartProduct = JSON.parse(arrayCartProduct);
    
    if(arrayCartProduct != null){
    arrayCartProduct.forEach(comeMap => {
    //templateTableSecond.querySelector('input').setAttribute('id', comeMap.id)
    templateTableSecond.querySelector('img').setAttribute('src', comeMap.images[0])
    templateTableSecond.querySelectorAll('td')[0].textContent =comeMap.name
    templateTableSecond.querySelectorAll('td')[1].textContent = comeMap.currency + " " + comeMap.cost
    templateTableSecond.querySelector('input').setAttribute('value', 1)
    templateTableSecond.querySelector('input').dataset.id = comeMap.id 
    // templateTableSecond.querySelector('.btn-success').dataset.id = comeMap.id
    // templateTableSecond.querySelector('.btn-danger').dataset.id = comeMap.id
    templateTableSecond.querySelectorAll('b')[0].textContent =  comeMap.currency
    templateTableSecond.querySelectorAll('b')[0].setAttribute('id', 'typeOfMoneyTwo')
    templateTableSecond.querySelectorAll('b')[1].dataset.id = comeMap.id
    templateTableSecond.querySelectorAll('b')[1].textContent =  1 * comeMap.cost
    templateTableSecond.querySelectorAll('button')[1].id = comeMap.id

    const clone = templateTableSecond.cloneNode(true)
    fragment.appendChild(clone)

    itemsCart.appendChild(fragment)
    })}
}

function carValidation(){

    let checkTotal = false;
    
    streethome.value != '' ? (validationstreet.className = 'valid-feedback') && (validationstreet.textContent = "Esta correcto") && (streethome.className = 'form-control is-valid') : (validationstreet.className = 'invalid-feedback') && (validationstreet.textContent = "Ingresa una calle") && (streethome.className = 'form-control is-invalid') && (checkTotal = true);
    numberhome.value != '' ? (validationnumber.className = 'valid-feedback') && (validationnumber.textContent = "Esta correcto") && (numberhome.className = 'form-control is-valid') : (validationnumber.className = 'invalid-feedback') && (validationnumber.textContent = "Ingresa un numero") && (numberhome.className = 'form-control is-invalid') && (checkTotal = true);
    streethome.value != '' ? (validationsqr.className = 'valid-feedback') && (validationsqr.textContent = "Esta correcto") && (sqrhome.className = 'form-control is-valid') : (validationsqr.className = 'invalid-feedback') && (validationsqr.textContent = "Ingresa una esquina") && (sqrhome.className = 'form-control is-invalid') && (checkTotal = true);
    creditcart.checked || wiretransfer.checked ? (validationpay.className = 'text-success') && (validationpay.textContent = "Forma de pago seleccionada correctamente") : (validationpay.className = 'text-danger') && (validationpay.textContent = "Debe seleccionar forma de pago") && (checkTotal = true);
    checkTotal ? alert("Hay campos obligatorios vacios") : (document.getElementById('buySuccess').className = 'alert alert-success') && (document.getElementById('buySuccess').querySelector('strong').textContent = "Has comprado con exito!")

}

function calcPercent(){
    let totalCostTwo = document.querySelectorAll('b#totalCostTwo');
    let typeOfMoneyTwo = document.querySelectorAll('b#typeOfMoneyTwo');
    let typeOfMoney = document.querySelectorAll('b#typeOfMoney');
    let totalCost = document.querySelectorAll('b#totalCost');
    let sum = 0;

    for (let index = 0; index < totalCostTwo.length; index++) {
        const element = totalCostTwo[index];
        const typeElement = typeOfMoneyTwo[index];

        typeElement.textContent == 'UYU' ? sum += (parseInt(element.textContent))/41 : sum += (parseInt(element.textContent))/1;

    }

    for (let index = 0; index < totalCost.length; index++) {
        const element = totalCost[index];
        const typeElement = totalCost[index];
        
        typeElement.textContent == 'UYU' ? sum += (parseInt(element.textContent))/41 : sum += (parseInt(element.textContent))/1;

    }
    //console.log(sum);

    goldradio.checked ? containerPrice.querySelectorAll('p')[3].textContent = 'USD ' + Math.round(0.15*sum) : NaN;
    premiumradio.checked ? containerPrice.querySelectorAll('p')[3].textContent = 'USD ' + Math.round(0.07*sum) : NaN;
    standardradio.checked ? containerPrice.querySelectorAll('p')[3].textContent = 'USD ' + Math.round(0.05*sum) : NaN;
    
    // containerPrice.querySelectorAll('p')[1].textContent = 'USD ' + Math.round(sum)
}

function calcSubtotal(){
    let totalCostTwo = document.querySelectorAll('b#totalCostTwo');
    let typeOfMoneyTwo = document.querySelectorAll('b#typeOfMoneyTwo');
    let typeOfMoney = document.querySelectorAll('b#typeOfMoney');
    let totalCost = document.querySelectorAll('b#totalCost');
    let sum = 0;

    for (let index = 0; index < totalCostTwo.length; index++) {
        const element = totalCostTwo[index];
        const typeElement = typeOfMoneyTwo[index];

        typeElement.textContent == 'UYU' ? sum += (parseInt(element.textContent))/41 : sum += (parseInt(element.textContent))/1;

    }

    for (let index = 0; index < totalCost.length; index++) {
        const element = totalCost[index];
        const typeElement = typeOfMoney[index];
        
        typeElement.textContent == 'UYU' ? sum += (parseInt(element.textContent))/41 : sum += (parseInt(element.textContent))/1;

    }

    containerPrice.querySelectorAll('p')[1].textContent = 'USD ' + Math.round(sum)

}


function calcTotal(){
    // const typeOfMoney = document.getElementById('typeOfMoney');
    // const typeOfMoneyTwo = document.getElementById('typeOfMoneyTwo');
    const totalProduct = parseInt(containerPrice.querySelectorAll('p')[1].textContent.slice(4));
    const totalPercent = parseInt(containerPrice.querySelectorAll('p')[3].textContent.slice(4));


    // const totalCost = typeOfMoney.textContent == 'UYU' ? (parseInt(document.getElementById('totalCost').textContent))/2 : (parseInt(document.getElementById('totalCost').textContent))/1;
    // const totalCostTwo = typeOfMoneyTwo.textContent == 'UYU' ? (parseInt(document.getElementById('totalCostTwo').textContent))/2 : (parseInt(document.getElementById('totalCostTwo').textContent))/1;
    
    containerPrice.querySelectorAll('p')[4].textContent = 'USD ' + Math.round(totalProduct + totalPercent)
    

}

function disableBox(){

    if(wiretransfer.checked){
        exampleModal.querySelectorAll('input')[1].disabled = true
        exampleModal.querySelectorAll('input')[2].disabled = true
        exampleModal.querySelectorAll('input')[3].disabled = true
        exampleModal.querySelectorAll('input')[5].disabled = false
    } else if(creditcart.checked){
        exampleModal.querySelectorAll('input')[1].disabled = false
        exampleModal.querySelectorAll('input')[2].disabled = false
        exampleModal.querySelectorAll('input')[3].disabled = false
        exampleModal.querySelectorAll('input')[5].disabled = true
    }
}


const catchCart = e => {

    let arrayCartProduct = localStorage.getItem("data");
    
    arrayCartProduct = JSON.parse(arrayCartProduct);

    for (let index = 0; index < arrayCartProduct.length; index++) {
        const element = arrayCartProduct[index];

        if(document.querySelectorAll('b#totalCostTwo')[index].dataset.id == e.target.dataset.id){

            document.querySelectorAll('b#totalCostTwo')[index].textContent = parseInt(document.querySelectorAll('td#unit-cost-two')[index].textContent.slice(4)) * e.target.value;
        }

    
    }

}

const catchTrash = e => {
    console.log(e.target.parentElement);
    let arrayCartProduct = localStorage.getItem("data");
    // let userArticle = presentCartArray.articles
    // let arrayTrashTwo = document.querySelectorAll(".btn.btn-danger.bi-trash.rounded-3.two");
    // let arrayTrashOne = document.querySelectorAll(".btn.btn-danger.bi-trash.rounded-3.one");
    
    arrayCartProduct = JSON.parse(arrayCartProduct);
    //console.log(userArticle.indexOf(0))


    const newArray = arrayCartProduct.filter(item => item.id != e.target.id);

    localStorage.setItem('data' ,JSON.stringify(newArray));

    // document.querySelectorAll('.btn.btn-danger.bi-trash.rounded-3').addEventListener("click", function(){
    //     e.target.parentElement == "";
    // })


}

//Event listener

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_USER).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentCartArray = resultObj.data
            showCart();
            getProductInfo();
            calcSubtotal();
            calcPercent();
            calcTotal();
            showFooter();
        }
    });

    myFunction();

    allowEntry();

});

document.addEventListener("input", function(e){
    calcPercent();
    calcSubtotal();
    calcTotal();
})

exampleModal.addEventListener("click", function(e){
    disableBox();
});

itemsCart.addEventListener('click', function(e){
    catchCart(e);
    catchTrash(e);
})
