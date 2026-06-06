//Demo Data for Products
const products = [
    { id: 1, name: "Product 1", price: 10.99, image: "images/tulip.jpg" },
    { id: 2, name: "Product 2", price: 15.99, image: "images/sofia.jpg" },
    { id: 3, name: "Product 3", price: 20.99, image: "images/hoahong.jpg" },
    { id: 4, name: "Product 4", price: 25.99, image: "images/linhlan.jpg" },
    { id: 5, name: "Product 5", price: 30.99, image: "images/hoacamtruong.jpg" },
];

//Duyệt mảng
products.forEach(product => {
    document.querySelector('#products .row').innerHTML += `<div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)} VND</p>
                    <a href="#" class="btn btn-primary">Buy</a>
                </div>
            </div>i        
    `;
});

let btnBuys = document.querySelectorAll("#products .row a");
btnBuys.forEach((btnBuy) => {
    btnBuy.addEventListener('click',function(){
        //Get name and price
        let name = this.parentElement.querySelector(".card-title").innerText;
        let price = this.parentElement.querySelector(".card-text").innerText;
        //Create new row
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${name}</td><td>${price}</td><td>1</td>`;
        //Add to card table
        document.querySelector("#carts tbody").appendChild(newRow);
    })
});


