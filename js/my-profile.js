//Global variables
const firstName = document.getElementById('first-name');
const validationFirstName = document.getElementById('validation-first-name');
const firstSurname = document.getElementById('first-surname');
const validationFirstSurname = document.getElementById('validation-first-surname');
const movilPhone = document.getElementById('movil-phone');
const validationMovilPhone = document.getElementById('validation-movil-phone');
const btnSave = document.getElementById('btn-save');
const email = document.getElementById('email');
const yourEmail = localStorage.getItem('userName');
const inputImgProfile = document.getElementById('inputImgProfile');
const alertSuccess = document.getElementById('alert-success');
let arrayObj = [];


//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID


function profileValidation(){

    let checkTotal = false;
    
    firstName.value != '' ? (validationFirstName.className = 'valid-feedback') && (validationFirstName.textContent = "Esta correcto") && (firstName.className = 'form-control is-valid') : (validationFirstName.className = 'invalid-feedback') && (validationFirstName.textContent = "Ingresa su nombre") && (firstName.className = 'form-control is-invalid') && (checkTotal = true);
    firstSurname.value != '' ? (validationFirstSurname.className = 'valid-feedback') && (validationFirstSurname.textContent = "Esta correcto") && (firstSurname.className = 'form-control is-valid') : (validationFirstSurname.className = 'invalid-feedback') && (validationFirstSurname.textContent = "Ingrese su apellido") && (firstSurname.className = 'form-control is-invalid') && (checkTotal = true);
    //movilPhone.value != '' ? (validationMovilPhone.className = 'valid-feedback') && (validationMovilPhone.textContent = "Esta correcto") && (movilPhone.className = 'form-control is-valid') : (validationMovilPhone.className = 'invalid-feedback') && (validationMovilPhone.textContent = "Ingrese su telefono de contacto") && (movilPhone.className = 'form-control is-invalid') && (checkTotal = true);
    checkTotal ? alert("Hay campos obligatorios vacios") : localStorage.setItem("saveInfoProfile", JSON.stringify(itemCraft()));
    if(checkTotal == false){
        showAlert();    
    }

}

function initFeedback(){

    firstName.value != '' ? (validationFirstName.className = 'valid-feedback') && (validationFirstName.textContent = "Esta correcto") && (firstName.className = 'form-control is-valid') : (validationFirstName.className = 'invalid-feedback') && (validationFirstName.textContent = "Ingresa su nombre") && (firstName.className = 'form-control is-invalid') && (checkTotal = true);
    firstSurname.value != '' ? (validationFirstSurname.className = 'valid-feedback') && (validationFirstSurname.textContent = "Esta correcto") && (firstSurname.className = 'form-control is-valid') : (validationFirstSurname.className = 'invalid-feedback') && (validationFirstSurname.textContent = "Ingrese su apellido") && (firstSurname.className = 'form-control is-invalid') && (checkTotal = true);
    //movilPhone.value != '' ? (validationMovilPhone.className = 'valid-feedback') && (validationMovilPhone.textContent = "Esta correcto") && (movilPhone.className = 'form-control is-valid') : (validationMovilPhone.className = 'invalid-feedback') && (validationMovilPhone.textContent = "Ingrese su telefono de contacto") && (movilPhone.className = 'form-control is-invalid') && (checkTotal = true);

}

function showEmail(){
    
    email.value = yourEmail

}


function itemCraft(){

    let item ={
        firstName : firstName.value,
        secondName : document.getElementById("second-name").value,
        firstSurname : firstSurname.value,
        secondSurname: document.getElementById("second-surname").value,
        email: email.value,
        movilPhone: movilPhone.value,
    }

    arrayObj.push(item);

    return item;

}

const hiddenAlert = () => {
    alertSuccess.className = 'alert alert-success fade'
}

const showAlert = () => {
    const checkArray = JSON.parse(localStorage.getItem("saveInfoProfile"))

    if(checkArray != '[]'){
        alertSuccess.className = 'alert alert-success'
        setTimeout(hiddenAlert, 2500);
    }
}

myFunction();

allowEntry();

showEmail();


//Event listener

btnSave.addEventListener("click", function(e){
    
    profileValidation();
  
})

window.addEventListener("input", function(e){

    initFeedback();
})

document.getElementById('inputImgProfile').addEventListener("change", function(){

    console.log(this.files)
    const reader = new FileReader();

    reader.addEventListener("load", ()=>{
        localStorage.setItem("insta-img", reader.result);
    })

    reader.readAsDataURL(this.files[0]);

})

document.getElementById('inputImgProfile').addEventListener("input", ()=>{
    const instaImg = localStorage.getItem("insta-img");
    //console.log(instaImg)

    if(instaImg){
        document.getElementById('imgProfile').setAttribute("src", instaImg);
    }

})