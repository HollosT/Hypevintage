// Cart
const productInfoAnchors = document.querySelectorAll('#productInfoAnchor');
let productModal;


if(document.getElementById('productInfoModal') != null) {
    productModal = new bootstrap.Modal(document.getElementById('productInfoModal'), {});
    
}
if(productInfoAnchors.length > 0) {
    productInfoAnchors.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
           const url = '/products/' + item.getAttribute('product-handle') + '.js';
           fetch(url)
           .then(res => res.json())
           .then(data => {
            document.getElementById("productInfoImg").src = data.images[0];
            document.getElementById("productInfoTitle").innerHTML = data.title;
            document.getElementById("productInfoPrice").innerHTML = item.getAttribute('product-price');
            document.getElementById("productInfoDescription").innerHTML = data.description;

            const variants = data.variants;
            const variantSelect = document.getElementById('modalItemID')

            variantSelect.innerHTML = '';

            variants.forEach(function(variant, index) {

                variantSelect.options[variantSelect.options.length] = new Option(variant.option1, variant.id)
                
            })
            productModal.show();


           });
        })
    })
}



const modalAddToCartForm = document.querySelector("#addToCartForm");

if(modalAddToCartForm != null) {  
    if( modalAddToCartForm != null ) {
        modalAddToCartForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            
            let formData = {
                'items': [
                    {
                        'id': document.getElementById("modalItemID").value,
                        'quantity': document.getElementById('modalItemQuantity').value
                    }
                ]
            };
            
            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then((resp) => { 
                return resp.json();
            })
            .then((data) => {
                updateCart();
                updatePopup(data);
                
            })
            .catch((err) => {
                console.error('Error: ' + err);
            })
        });
    }
}

// Update card
let currentPopupContainer;
const updatePopup = (data) => {
    console.log(data.items);
    let order;
    let item;

    const popupBodyContainer = document.querySelector('#popupContainer')
    currentPopupContainer = popupBodyContainer;
    popupBodyContainer.innerHTML = ''

    if(data.status && data.description) {
        // 
        item = data
        order = 'failure'
    } else {
        item = data.items[0]
        order = 'success'

    }
    const markup = drawCard(item, order);
    popupBodyContainer.insertAdjacentHTML('afterbegin', markup)
    addHandlerToContinueShoppingBtn();
}

// Draw response card 
const drawCard = (item, order) => {
    let title;
    let body;
    let btnCaption;
    switch(order) {
        case('success'): 
            title = `${item.quantity} ${item.title}`
            body = 'Successfully added to the cart!'
            btnCaption = 'Continue shopping'
        break
        case('failure'):
            title = `Oops something went wrong with!`
            body = item.description
            btnCaption = 'Go back'
    }

    return `
        <div class="row" id="responseContainer">
            <div class="col-12 col-md-6">
            <h3>${title}</h3>
            <p>${body}</p>
            <div class="container d-flex justify-content-between align-items-center">
                <a href="/cart" class="btn btn-success col-auto">See cart</a>
                <button class="btn btn-success col-auto" id="continueShoppingBtn">${btnCaption}</button>
            </div>
            </div>
        </div>
    `
}

const addHandlerToContinueShoppingBtn = () => {

    const popupMainContainer = document.querySelector('#popupMainContainer')
    const popupBodyContainer = document.querySelector('#popupContainer')
    const contineShoppingBtn = document.querySelector('#continueShoppingBtn');
    contineShoppingBtn.addEventListener('click', e => {
        console.log(currentPopupContainer);
        popupBodyContainer.innerHTML = ''
        popupMainContainer.innerHTML = currentPopupContainer
    })

}


// Update cart
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
})

const updateCart = () => {
    fetch('/cart.js')
    .then(res => res.json())
    .then(data => {
        document.querySelector('#numberOfCartItems').innerHTML = data.items.length
    })
    .catch(err => {
        console.log(err);
    })
}