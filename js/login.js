console.log('Active login')

const butTag = document.getElementById('loginBtn')
const emailString = document.getElementById('emailTag');
const passString = document.getElementById('passwordTag');
const warningString = document.getElementById('warnings');
const formString = document.getElementById('formTag');
const paragrphString = document.getElementById('warnings');
const emailPar = document.getElementById('emailParagraph');
const passPar = document.getElementById('passParagraph');

butTag.addEventListener("click", function (){
    
    let warningsE = "";
    let warningsP = "";
    const regularPhrase = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let comeIn = false

    if(!regularPhrase.test(emailString.value)){
        warningsE += 'Email incorrecto <br>'
        comeIn = true
    };

    if(passString.value.length <= 8){
        warningsP += 'Contrasena incorrecta <br>'
        comeIn = true
    };

    if(comeIn){
        emailPar.innerHTML = warningsE
        passPar.innerHTML = warningsP
    } else {
        if(emailString.value) localStorage.setItem('userName', emailString.value);
        window.location = "index.html"
    }
});


// butTag.addEventListener("click", function(){

//     if(emailString.value) localStorage.setItem("text", emailString.value);
    
// })

// butTag.addEventListener("click", function(){
//     window.location = "index.html"
// })


function myFunction() {
    const elementClean = document.getElementById("alertClean")
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID

document.addEventListener("DOMContentLoaded", myFunction()) //We apply function when the page loads


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// window.onload = function () {
//     google.accounts.id.initialize({
//       client_id: '239162348248-c16mnpoca1fqsgmq11pt59ebv6d6nnsl.apps.googleusercontent.com',
//       callback: handleCredentialResponse
//     });
//     google.accounts.id.prompt();
// };

// google.accounts.id.renderButton(
//     document.getElementById('butGoogle')
// )


