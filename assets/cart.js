// Cart
//Open cart
const header = document.querySelector('#header');

if(header != null ) {
    const cartIcon = document.querySelector('#cartIcon');
    const cart = document.querySelector('#cart');
    //  const mobileNavBarHeight =mobileNavBar.getBoundingClientRect().height;


     cartIcon.addEventListener('click', (e) => {
        console.log('hello');
         if(cart.classList.contains('open-cart')) {
            // hamburgerMenu.style.marginTop = `0px`
            cart.classList.remove('open-cart')
            //  document.body.classList.remove('stop-scroll')
         } else {
            // hamburgerMenu.style.marginTop = `${mobileNavBarHeight}px`
            cart.classList.add('open-cart')
            //  document.body.classList.add('stop-scroll')            
         }
     })

 }



const productInfoAnchors = document.querySelectorAll('#productInfoAnchor');


if(productInfoAnchors.length > 0) {
    productInfoAnchors.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
           const url = '/products/' + item.getAttribute('product-handle') + '.js';
           fetch(url)
           .then(res => res.json())
           .then(data => {
            console.log(data);
            addtoCart(data)
            // document.getElementById("productInfoImg").src = data.images[0];
            // document.getElementById("productInfoTitle").innerHTML = data.title;
            // document.getElementById("productInfoPrice").innerHTML = item.getAttribute('product-price');
            // document.getElementById("productInfoDescription").innerHTML = data.description;

            // const variants = data.variants;
            // const variantSelect = document.getElementById('modalItemID')

            // variantSelect.innerHTML = '';

            // variants.forEach(function(variant, index) {
            //     variantSelect.options[variantSelect.options.length] = new Option(variant.option1, variant.id)
            // })


           });
        })
    })

    const addtoCart = (product) => {
        const formData = {
            'items': [
                {
                    'id': product.variants[0].id,
                    'quantity': 1
                }
            ]
        };
        console.log(formData);
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

}

// Update cart
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
})

const updateCart = async () => {
    fetch('/cart.js')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        // Update shopping icon
        const items = data.items.map(item => item.quantity)
        const sum = items.reduce((acc, value) => {
            return acc + value;
        }, 0)

        document.querySelector('#numberOfCartItems').innerHTML = sum;

        // draw shopping cart
        drawProducts(data.items)
    })
    .catch(err => {
        console.log(err);
    })
}


const drawProducts = (products) => {
    products.forEach(product => drawProductHtml(product))
}

const drawProductHtml = (product) => {
    return 
    `
    `
}





// Add to cart on a product page

// const productContainer = document.querySelector('#productContainer');

// if(productContainer != null) {
//     const addBtn = document.querySelector('#addToCartBtn');

//     addBtn.addEventListener('click', e => {
//         e.preventDefault()
//         const variant = document.querySelector('#productSelectProductPage').value;
//         const quantity = document.querySelector('#quantityProductPage').value;



//         const formData = {
//             'items': [
//                 {
//                     'id': variant,
//                     'quantity': quantity
//                 }
//             ]
//         };
        
//         fetch('/cart/add.js', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then((resp) => { 
//             return resp.json();
//         })
//         .then(data => {
//             updateCart();
//             openPopup(data)
//         })
//         .catch((err) => {
//             console.error('Error: ' + err);
//         })
        
//     })



//     const openPopup = (data) => {
//         const productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
//         const bodyContainer = document.querySelector('#contentContainer');
//         bodyContainer.innerHTML = '';
//         let order;
//         let item;

//         if(data.status && data.description) {
//             item = data
//             order = 'failure'
//         } else {
//             item = data.items[0]
//             order = 'success'
    
//         }

//         let title;
//         let body;
//         switch(order) {
//             case('success'): 
//                 title = `${item.quantity} ${item.title}`
//                 body = 'Successfully added to the cart!'
//             break
//             case('failure'):
//                 title = `Oops something went wrong with!`
//                 body = item.description
//         }
        
//         const markup = `
//         <div class="col-12 col-md-6" >
//             <h2>${title}</h2>
//             <p>${body}</p>
//         </div>
//         `

//         bodyContainer.insertAdjacentHTML('afterbegin', markup)

//         productModal.show();
        
//     }

// }