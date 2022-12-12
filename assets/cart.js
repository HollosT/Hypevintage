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
            console.log(data);

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
            })
            .catch((err) => {
                console.error('Error: ' + err);
            })
        });
    }
}




// Update cart
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
})

const updateCart = () => {
    fetch('/cart.js')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.querySelector('#numberOfCartItems').innerHTML = data.items.length
    })
    .catch(err => {
        console.log(err);
    })
}