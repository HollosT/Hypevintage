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

const updatePopup = (data) => {

    if(document.querySelector('#responseMessage')) {
        document.querySelector('#responseMessage').innerHTML = ''
    }
    
    let order;
    let item;

    const responseContainer = document.querySelector('#responseContainer')

    if(data.status && data.description) {
        // 
        item = data
        order = 'failure'
    } else {
        item = data.items[0]
        order = 'success'

    }
    const markup = drawCard(item, order);
    responseContainer.insertAdjacentHTML('afterbegin', markup)

}

// Draw response card 
const drawCard = async (item, order) => {
    let title;
    let body;
    switch(order) {
        case('success'): 
            title = `${item.quantity} ${item.title}`
            body = 'Successfully added to the cart!'
        break
        case('failure'):
            title = `Oops something went wrong with!`
            body = item.description
    }


    const markup = `
        <div class="row" id="responseMessage">
            <h3>${title}</h3>
            <p>${body}</p>
            <section id="productRecommendation" class="row-content-justify-center my-5">
                <div class="text-center"><h1>You may also like this</h1></div>
                <div id="product_recommendation_body">
                    ${relevantData}
                </div>
            </section>
        </div>
    `
    return markup
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

// Add to cart on a product page

const productContainer = document.querySelector('#productContainer');

if(productContainer != null) {
    const addBtn = document.querySelector('#addToCartBtn');

    addBtn.addEventListener('click', e => {
        e.preventDefault()
        const variant = document.querySelector('#productSelectProductPage').value;
        const quantity = document.querySelector('#quantityProductPage').value;



        const formData = {
            'items': [
                {
                    'id': variant,
                    'quantity': quantity
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
        .then(data => {
            updateCart();
            openPopup(data)
        })
        .catch((err) => {
            console.error('Error: ' + err);
        })
        
    })



    const openPopup = (data) => {
        const productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
        const bodyContainer = document.querySelector('#contentContainer');
        bodyContainer.innerHTML = '';
        let order;
        let item;

        if(data.status && data.description) {
            item = data
            order = 'failure'
        } else {
            item = data.items[0]
            order = 'success'
    
        }

        let title;
        let body;
        switch(order) {
            case('success'): 
                title = `${item.quantity} ${item.title}`
                body = 'Successfully added to the cart!'
            break
            case('failure'):
                title = `Oops something went wrong with!`
                body = item.description
        }
        
        const markup = `
        <div class="col-12 col-md-6" >
            <h2>${title}</h2>
            <p>${body}</p>
        </div>
        `

        bodyContainer.insertAdjacentHTML('afterbegin', markup)

        productModal.show();
        
    }

}