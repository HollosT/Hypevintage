// Cart

const header = document.querySelector('#header');

if(header != null ) {
    const cartItemContainer = document.querySelector('#cartItemContainer ');
    const priceContainer = document.querySelector('#priceContainer');
    const closeCartBtn = document.querySelector('#closeCartBtn');
    const numberOfCartItems = document.querySelector('#numberOfCartItems')
    const cartIcon = document.querySelector('#cartIcon');
    const cartTitle = document.querySelector('#cartTitle')
    const proceedChoppingCart = document.querySelector('#proceedChoppingCart')

    const mobileNavBar = document.querySelector('#header')
    const mobileNavBarHeight = mobileNavBar.getBoundingClientRect().height;
  

    const interactCart = [numberOfCartItems, cartIcon]
    //Open cart
    const cart = document.querySelector('#cart');
    cart.style.marginTop = `${mobileNavBarHeight}px`

    //  const mobileNavBarHeight =mobileNavBar.getBoundingClientRect().height;
    interactCart.forEach(int => int.addEventListener('click', (e) => {
        if(cart.classList.contains('open-cart')) {

            // hamburgerMenu.style.marginTop = `0px`
            cart.classList.add('close-cart')
            
            cart.classList.remove('open-cart')
            //  document.body.classList.remove('stop-scroll')
        } else {

            // hamburgerMenu.style.marginTop = `${mobileNavBarHeight}px`
            cart.classList.remove('close-cart')

            cart.classList.add('open-cart')
            //  document.body.classList.add('stop-scroll')            
         }
    }))




     closeCartBtn.addEventListener('click', () => {
        cart.classList.add('close-cart')
        cart.classList.remove('open-cart')
     })
     
     
     
     const productInfoAnchors = document.querySelectorAll('#productInfoAnchor');
     
     
     if(productInfoAnchors.length > 0) {
         productInfoAnchors.forEach(item => {
             item.addEventListener('click', event => {
                 event.preventDefault()
                 const url = '/products/' + item.getAttribute('product-handle') + '.js';
                 fetch(url)
                 .then(res => res.json())
                 .then(data => {

                     addtoCart(data)
 
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
                
                
                
           
            
            // Update cart
            document.addEventListener('DOMContentLoaded', function() {
                updateCart();
            })
            
            const updateCart = async () => {
                fetch('/cart.js')
                .then(res => res.json())
                .then(data => {

                    // Update shopping icon
                    let hasItem = false;

                    if(data.items.length > 0) {
                        hasItem = true
                        proceedChoppingCart.classList.remove('opacity')
                        numberOfCartItems.classList.remove('opacity');
                    } else {
                        hasItem = false
                        proceedChoppingCart.classList.add('opacity')

                        numberOfCartItems.classList.add('opacity');
                    }
                    
                    if(hasItem) {
                        const items = data.items.map(item => item.quantity)
                        const sum = items.reduce((acc, value) => {
                            return acc + value;
                        }, 0)
                        document.querySelector('#numberOfCartItems').innerHTML = sum;

                    }
                    
                    if(hasItem) {
                        // draw shopping cart
                        drawProducts(data.items)
                        
                        // draw prices
                        drawPrices(data)

                        drawCartTitle(hasItem)
                    } else if (hasItem === false) {
                        drawCartTitle(hasItem)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }

            const drawCartTitle = (status) => {
                if(status) {
                    cartTitle.innerHTML = 'Your selected items'
                } else if (status === false) {
                    cartTitle.innerHTML = "You haven't selected items yet"
                }
            }

            const drawPrices = (data) => {
                const length = String(data.total_price).length;
                const price = Number(String(data.total_price).substring(0, length - 2))
                priceContainer.innerHTML = '';
                const markup = `
                <div class="subtotal-container">
                    <div>
                        <p>Delivery price:</p>
                        <p>0.00 DKK</p>
                    </div>
                    <div>
                        <h6>Subtotal:</h6>
                        <p>${price}.00 DKK</p>
                    </div>
                    </div>
                    <div class="total-container">
                    <div>
                        <h5>Total price (incl. tax)</h5>
                        <p>${price}.00 DKK</p>
                    </div>
                    </div>
                </div>
                `;


                priceContainer.insertAdjacentHTML('afterbegin', markup)
            }
            
            
            const drawProducts = (products) => {
                const cartItems = products.map(product => drawProductHtml(product));
                cartItemContainer.innerHTML = '';
                cartItems.forEach(item => {
                    cartItemContainer.insertAdjacentHTML('afterbegin', item)
                })
                addHandlerToRemoveBtn();
            }
            
            const drawProductHtml = (product) => {
                const length = String(product.price).length;
                const price = Number(String(product.price).substring(0, length - 2))
                                
                const [color, size] = product.variant_options;
                let variant;
                if(color && size) {
                    variant = `
                    <p>Size: ${size} | Color: ${color}</p>
                    `
                }
                return `
                <article class="cart-item py-500">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="cart-content-container">
                        <div class="cart-content">
                        <p class="brand">${product.product_type}</p>
                            <h4>${product.title}</h4>
                            ${variant != null ? variant :  ''}
                            <h5>${price}.00 DKK</h5>
                        </div>
                        <p class="cart-item-remove" data-remove='${product.variant_id}'>&times;</p>
                    </div>
                </article>
                `
            }

            const addHandlerToRemoveBtn = () => {
                cartItemContainer.addEventListener('click', e => {
                    const clicked = e.target.closest('.cart-item-remove');
                    if(!clicked) return;

                    const variant = clicked.dataset.remove;
                    removeItem(variant);
                    
                })
            }

            const removeItem = (variant) => {
                
                const formData = {
                    'items': [
                        {
                            'id': variant,
                            'quantity': 0
                        }
                    ]
                };
                fetch('/cart/change.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(res => {
                    console.log(res.json());
                    return res.json();
                })
                .then((data) => {
                    updateCart();
                    
                })
                .catch((err) => {
                    console.error('Error: ' + err);
                })
            }
     
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