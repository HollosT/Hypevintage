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
    let prevSum = 0;



    const interactCart = [numberOfCartItems, cartIcon]
    //Open cart
    const cart = document.querySelector('#cart');
    cart.style.marginTop = `${mobileNavBarHeight}px`

  
    interactCart.forEach(int => int.addEventListener('click', (e) => {
        if(cart.classList.contains('open-cart')) {

        
            cart.classList.add('close-cart')
            
            cart.classList.remove('open-cart')
   
        } else {

    
            cart.classList.remove('close-cart')

            cart.classList.add('open-cart')
          
         }
    }))




     closeCartBtn.addEventListener('click', () => {
        cart.classList.add('close-cart')
        cart.classList.remove('open-cart')
     })
     
     
     
     const productInfoAnchors = document.querySelectorAll('#productInfoAnchor');
     
     

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
                        numberOfCartItems.classList.remove('change-cart-item')
                        updateCart();                    
                    })
                    .catch((err) => {
                        console.error('Error: ' + err);
                    })
                }
                
                
                
           
            
            // Update cart
            document.addEventListener('DOMContentLoaded', function() {
                numberOfCartItems.classList.remove('change-cart-item')
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
                        if( prevSum != sum) {
                            numberOfCartItems.classList.remove('change-cart-item')

                            numberOfCartItems.classList.add('change-cart-item')
                        }
                        
                        numberOfCartItems.innerHTML = sum;
                        prevSum = sum;
                        
                    }
                    
                    if(hasItem) {
                        // draw shopping cart
                        drawProducts(data.items)
                        
                        // draw prices
                        drawPrices(data)

                        drawCartTitle(hasItem)
                    } else if (hasItem === false) {
                        drawCartTitle(hasItem)
                        cartItemContainer.innerHTML = '';
                        priceContainer.innerHTML = '';
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
                const cartItems = products.map((product, i) => drawProductHtml(product, i));
                cartItemContainer.innerHTML = '';
                cartItems.forEach(item => {
                    cartItemContainer.insertAdjacentHTML('afterbegin', item)
                })
                addHandlerToRemoveBtn();
            }
            
            const drawProductHtml = (product, i) => {

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
                <article class="cart-item py-500" data-remove='${product.id}'>
                    <img src="${product.image}" alt="${product.title}">
                    <div class="cart-content-container">
                        <div class="cart-content">
                        <p class="brand">${product.product_type}</p>
                            <h4>${product.title}</h4>
                            ${variant != null ? variant :  ''}
                            <h5>${price}.00 DKK</h5>
                        </div>
                        <div class="cart-item-remove" data-remove='${product.id}'>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <path id="Path_58" data-name="Path 58" d="M0,0H20V20H0Z" fill="none"/>
                                <path id="Path_59" data-name="Path 59" d="M14,5.2h4V6.8H16.4V17.2a.8.8,0,0,1-.8.8H4.4a.8.8,0,0,1-.8-.8V6.8H2V5.2H6V2.8A.8.8,0,0,1,6.8,2h6.4a.8.8,0,0,1,.8.8Zm.8,1.6H5.2v9.6h9.6ZM7.6,9.2H9.2V14H7.6Zm3.2,0h1.6V14H10.8ZM7.6,3.6V5.2h4.8V3.6Z" fill="#9397a2"/>
                            </svg>
                            <p>Remove product</p>
                        </div>
                    </div>
                </article>
                `
            }

            const addHandlerToRemoveBtn = () => {
                cartItemContainer.addEventListener('click', e => {
                    const clicked = e.target.closest('.cart-item-remove');
                    if(!clicked) return;

                    const lineNumber = clicked.dataset.remove;
                
                    removeItem(lineNumber);
                    
                })
            }

            const removeItem = (lineNumber) => {
              
                document.querySelectorAll('.cart-item').forEach(item => {
                    if(item.dataset.remove === lineNumber) {
                        item.classList.add('remove-cart-item')
                    }
                })
                numberOfCartItems.classList.remove('change-cart-item')
                
                const formData = {
                        'id': lineNumber,
                        'quantity': 0
   
                };

                fetch('/cart/change.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(res => res.json())
                .then((data) => {
                    
                    updateCart();
                    
                })
                .catch((err) => {
                    console.error('Error: ' + err);
                })
            }
     

}