//Variables
const addTag = document.getElementById("sendBtn");
const txtTag = document.getElementById("item")
const arrayTag = document.getElementById("add-your-comment");


let arrayObj = [];


//Funciones

function itemCraft(description, user, dateTime, score){

    let item ={
        score : score,
        description : description,
        user : user,
        dateTime: dateTime,
    }

    arrayObj.push(item);

    return item;

}

function saveArray(){

    localStorage.setItem('txtArray', JSON.stringify(arrayObj));
    printArray();

}

function printArray(){
    
    arrayTag.innerHTML = '';

    arrayObj = JSON.parse(localStorage.getItem('txtArray'))

    console.log(arrayObj)

    if(arrayObj === null){
        arrayObj = [];
    } else {

        arrayObj.forEach(element => {
            arrayTag.innerHTML += `
            <div class="list-group-item">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${element.user} </h4>
                            <p class="text-muted">- ${element.dateTime}</p>
                            <div class="col mx-4" id="${element.dateTime}">
                            </div>
                        </div>
                        <p class="text-muted mb-1">${element.description}</p>
                    </div>
                </div>
            </div> 
            `
        });

        qualify(arrayObj);
    }
}

// function removeLocalSt(){
//     localStorage.removeItem('txtArray');
//     printArray();
// }

function alertEmpty(){

    // const itemEmpty = document.getElementById('item').value;
    const scoreEmpty = document.getElementById('formControlSelect').value;
    // const alertItem = document.getElementById('item-empty');
    const alertScore = document.getElementById('score-empty');
    // let showAlertItem = "";
    // let showAlertScore = "";
    // let dontEntry = false;

    // if(itemEmpty === ''){
    //     showAlertItem = "Escriba un comentario"
    //     dontEntry = true
    // };

    // if(scoreEmpty === ''){
    //     showAlertScore = "Escriba un comentario"
    //     dontEntry = true
    // };

    // if(dontEntry){
    //     alertItem.innerHTML= showAlertItem;
    //     alertScore.innerHTML= showAlertScore;
    // } else {
         
    //     saveArray();
    //     document.getElementById('item').value = '';
        
    // };

    if(scoreEmpty == ''){
        alertScore.innerHTML = "Selecione un valor"
    } else {
        alertScore.innerHTML = ''
        saveArray();
    }
};

function makeDate(){
    let today = new Date();

    let todaySelect = today.getDate() +"-"+ (today.getMonth()+1) +"-"+ today.getYear() +" "+ today.getHours() + ":" + today.getMinutes() +":"+ today.getSeconds();
    console.log(todaySelect)
}

//EventListener

addTag.addEventListener("click", function(){

    // arrayTag.innerHTML = "";
    // removeLocalSt();
    
    let scoreSelect = document.getElementById('formControlSelect').value;

    // let today = new Date();
    // let todaySelect = today.toLocaleString();
    // console.log(todaySelect);
    let today = new Date();

    let todaySelect = today.getDate() +"-"+ (today.getMonth()+1) +"-"+ today.getFullYear() +" "+ today.getHours() + ":" + today.getMinutes() +":"+ today.getSeconds();
    console.log(todaySelect)

    let userSelect = localStorage.getItem('text');
    console.log(userSelect);

    let itSelect = document.getElementById('item').value;

    itemCraft(itSelect, userSelect, todaySelect, scoreSelect);

    // saveArray();
    alertEmpty();

})


document.addEventListener('DOMContentLoaded', printArray());