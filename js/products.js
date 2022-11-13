console.log('this event active');

const searchElement = document.getElementById('searchTag')

let listExample = document.getElementById('listProduct')

const DIF_PRODUCT = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE 
// const searchString = document.getElementById('searchTag')

// function walkArray(dataArray) {
//     // For iterates over the elements of the array (dataArray == json.products)
//     for (const i of dataArray) {
//         // my variable i iterates and prints the elements of the array
//         listExample.innerHTML += ` 
//         <div onclick="setCatID(${i.id})" class="list-group-item list-group-item-action cursor-active">
//             <div class="row">
//                 <div class="col-3">
//                     <img src="${i.image}" alt="${i.description}" class="img-thumbnail">
//                 </div>
//                 <div class="col">
//                     <div class="d-flex w-100 justify-content-between">
//                         <h4 class="mb-1">${i.name}</h4>
//                         <small class="text-muted">${i.soldCount} artículos</small>
//                     </div>
//                     <p class="mb-1">${i.description}</p>
//                 </div>
//             </div>
//         </div>
//         `
//         //`<img src="${i.image}" ><p> Precio: ${i.currency + i.cost} <br> ${i.name} <br> Descripcion: ${i.description} <br> Vendidos: ${i.soldCount} </p><br>`; // Se concatena cada párrafo de la manera que queremos mostrarlo al innerHTML del contenedor
//     }
// }


// fetch('https://japceibal.github.io/emercado-api/cats_products/101.json').then( // fetch mekes us a promise, that brings information
//     function (response) {
//         return response.json(); //.then makes us a promise, that tranforms into json format
//     })
//     .then(function (json) {
//         walkArray(json.products); //retunr information of API (array in this case)
// })


function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID



const ORDER_ASC_BY_COST = "XY";
const ORDER_DESC_BY_COST = "YX";
const ORDER_BY_PROD_SOLD = "Sold";
let presentProductArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
// let searchGo = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            return ( a.cost < b.cost ? -1:1)
        });

    }else if (criteria === ORDER_DESC_BY_COST){

        result = array.sort(function(a, b) {
            return ( a.cost > b.cost ? -1:1)
        });

    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            return ( aCount > bCount ? -1:1)
        });
    }

    return result;
}

function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < presentProductArray.length; i++){
        let itemProduct = presentProductArray[i];


        if (((minCost == undefined) || (minCost != undefined && parseInt(itemProduct.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(itemProduct.cost) <= maxCost)) &&
            ((searchElement.value.toLowerCase() === undefined) || (itemProduct.name.toLowerCase().indexOf(searchElement.value.toLowerCase()) != -1))){

            htmlContentToAppend += `
            <div onclick="setProductID(${itemProduct.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${itemProduct.image}" alt="${itemProduct.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${itemProduct.name} - ${itemProduct.currency} ${itemProduct.cost}</h4>
                            <small class="text-muted">${itemProduct.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${itemProduct.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        presentProductArray = productsArray;
    }

    presentProductArray = sortProducts(currentSortCriteria, presentProductArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(DIF_PRODUCT).then(function(resultObj){
        if (resultObj.status === "ok"){
            presentProductArray = resultObj.data.products
            showProductsList()
            //sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por producto.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });

    document.getElementById('searchTag').addEventListener("keyup", function(){

        searchElement.value.toLowerCase();
        

        showProductsList()
    });

    myFunction();
    
    allowEntry();

});



// function searchingItem(){
//     const text = searchString.value

//     for(let walk of currentCategoriesArray){
//         let showName = currentCategoriesArray[walk].name
        
//         if(showName.indexOf(text) != -1){
//             console.log("te encontre")
//         } 
//     }

// }