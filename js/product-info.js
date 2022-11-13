console.log('this event active');

//Global variables

let listExample = document.getElementById('listProduct')
const INF_PRODUCT = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE
const COMM_PRODUCT = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE
let commentsProductArray = [];
const btnAddCart = document.getElementById('btnAddCart');
const newArray = [];

// document.getElementsByClassName('fa fa-star')[1].classList.add('checked')  DEBO USAR ESTO

// console.log(ratingStars)


//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID


// function setProductID(id) {
//     localStorage.setItem("catID", id);
//     window.location = "product-info.html"
// }


function showProductsList() {

    let htmlContentToAppend = "";
    let itemProduct = presentProductArray;

    htmlContentToAppend += `
    <div id="infoOfProduct" class="col">
        <div class="d-flex justify-content-between mx-5 mt-4">
            <h1 class="mb-1">${itemProduct.name}</h1>
            <button type="button" class="btn btn-primary" id="btnAddCart">Agregar al carrito</button>
        </div>
            <hr class="my-4">
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Precio:</h4>
                </div>
                <p class="mb-1">${itemProduct.currency} ${itemProduct.cost}</p>
            </div>
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Descripcion:</h4>
                </div>
            <p class="mb-1">${itemProduct.description}</p>
        </div>
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Categoria:</h4>
                </div>
            <p class="mb-1">${itemProduct.category}</p>
        </div>
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Cantidad de vendidos:</h4>
                </div>
            <p class="mb-1">${itemProduct.soldCount}</p>
        </div>    
    </div>
    <div class="col mt-4">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="">Imagenes ilustrativas:</h4>
        </div>
        <div id="carouselExampleInterval" class="carousel carousel-dark slide w-75 p-3 mx-auto" data-bs-ride="carousel">
        <div class="carousel-inner">
        `
        for(let i = 0; i < presentProductArray.images.length; i++){
            let productImages = presentProductArray.images[i];

            if(productImages == presentProductArray.images[0]){
                htmlContentToAppend+= `
            <div class="carousel-item active" data-bs-interval="10000">
                <img src="${productImages}" class="mx-auto d-block w-75 rounded-3" alt="First slide">
            </div>
            `
            } else { 
                htmlContentToAppend+=`
                <div class="carousel-item">
                    <img src="${productImages}" class="mx-auto d-block w-75 rounded-3" alt="Third slide">
                </div>`
            }

        }

        htmlContentToAppend +=`
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        <div class="col mt-4 mb-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Comentarios:</h4>
                </div>
        </div>    
    </div>
    `

    document.getElementById("info-product-container").innerHTML = htmlContentToAppend;

}


function showCommentsList() {

    let htmlCommentsToAppend = "";
    for (let i = 0; i < commentsProductArray.length; i++) {
        let comment = commentsProductArray[i];

        htmlCommentsToAppend += `  
            <div class="list-group-item">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${comment.user} </h4>
                            <p class="text-muted">- ${comment.dateTime}</p>
                            <div class="col mx-4" id="${comment.dateTime}">
                            </div>
                        </div>
                        <p class="text-muted mb-1">${comment.description}</p>
                    </div>
                </div>
            </div>
            `

        document.getElementById("comments-container").innerHTML = htmlCommentsToAppend;

    }

    qualify(commentsProductArray);
}

// let counter;

function qualify(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        makeQualifyElement(element.score, element.dateTime)

    }
};

function makeQualifyElement(numberScore, oClock) {
    let division = document.createElement('div');

    for (let i = 0; i < 5; i++) {

        let span = document.createElement('span');
        span.className = (i < numberScore ? 'fa fa-star checked' : 'fa fa-star');
        division.appendChild(span);

        // document.getElementById(oClock).appendChild(division)
    }

    document.getElementById(oClock).appendChild(division)
    console.log(division)


}


function showRelatedProducts() {

    let relatedProductsToAppend = "";

    relatedProductsToAppend +=`
    <div class="col mt-4">
    <div class="d-flex w-100 justify-content-between">
        <h1 class="">Productos relacionados</h1>
    </div>
    <hr class="my-4">
    <div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
    `
    for (let index = 0; index < presentProductArray.relatedProducts.length; index++) {
        const element = presentProductArray.relatedProducts[index];
        
    
    relatedProductsToAppend+=`
        <div onclick="setProductID(${element.id})" class="card mx-2 cursor-active">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body text-center mt-3 cursor-active">
                <h5 class="card-title">${element.name}</h5>
            </div>
        </div>
    `
    }

    relatedProductsToAppend+=`
    </div>
    </div>

    `

    document.getElementById("related-products").innerHTML = relatedProductsToAppend;


}


function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function changeButton(){
    document.getElementById('btnAddCart').classList.replace("btn-primary", "btn-success")
    document.getElementById('btnAddCart').innerHTML = "Agregado ✓"
}

// function setArrayProduct(array){

//     localStorage.setItem("arrayProductInfo",JSON.stringify(array));

// }

function getAndconcatArray(array){
    
    const new_data = array;
    
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }

    const id_number = (JSON.parse(localStorage.getItem('data'))).forEach(element => console.log(element.id))

    console.log(id_number)

    const old_data = JSON.parse(localStorage.getItem('data'));
    
    old_data.push(new_data);


    localStorage.setItem('data', JSON.stringify(old_data));

    console.log(new_data);
    console.log(old_data);

}

//Event listener

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(INF_PRODUCT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentProductArray = resultObj.data
            showProductsList();
            showRelatedProducts();
            
            document.getElementById('btnAddCart').addEventListener("click", function(){
                
                getAndconcatArray(presentProductArray);
                //setArrayProduct(presentProductArray);
                changeButton();

            })
        }
    });

    getJSONData(COMM_PRODUCT).then(function (resultComments) {
        if (resultComments.status === "ok") {
            commentsProductArray = resultComments.data
            console.log(commentsProductArray);
            showCommentsList()

        }
    });


    myFunction();

    allowEntry();

    showProductsList();

});




// for (let i = 0; i < presentProductArray.relatedProducts.length; i++) {
//     let relation = presentProductArray.relatedProducts[i];

//     relatedProductsToAppend += `
//     <div class="carousel-item active">
//     <div class="card h-100" style="width: 18rem;">
//             <img src="${relation.image}" class="card-img-top" alt="${relation.name}">
//         <div class="card-body">
//             <h4 class="card-title">${relation.name}</h4>
//         </div>
//     </div>
//     </div>
//     `
// }