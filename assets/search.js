if(header != null ) {
    const mobileNavBar = document.querySelector('#header')
    const mobileNavBarHeight = mobileNavBar.getBoundingClientRect().height;
    const searchBtn = document.querySelector('.search-icon-contaner')
    const searchIcon = document.querySelector('#SearchSVG');
    const searchInputField = document.querySelector('#searchInputField')
    const searchItemContainer = document.querySelector('#searchItemContainer')
    let timer;


    //Open cart
    const searchContainer = document.querySelector('#searchContainer');
    searchContainer.style.marginTop = `${mobileNavBarHeight}px`;
    
    searchBtn.addEventListener('click', (e) => {
        if(searchContainer.classList.contains('open-search')) {

            searchIcon.classList.add('inactive-search-icon')
            searchIcon.classList.remove('active-search-icon')

            searchContainer.classList.add('close-search')
            searchContainer.classList.remove('open-search')

        } else {
            searchIcon.classList.remove('inactive-search-icon')
            searchIcon.classList.add('active-search-icon')
  
            searchContainer.classList.remove('close-search')
            searchContainer.classList.add('open-search')
          
         }
    })

    // Init search after typing
    searchInputField.addEventListener('input', function(e) {
        clearTimeout(timer);

        if(searchInputField.value) {
            timer= setTimeout(fetchPredictiveSearch,  500)
        }

    })

    // Fetching results
    function fetchPredictiveSearch() {
        fetch(`/search/suggest.json?q=${searchInputField.value}&resources[type]=product`)
        .then(res => res.json())
        .then(data => {
            
            const products = data.resources.results.products;
            console.log(products);
            searchItemContainer.innerHTML = '';

            if(products.length > 0) {
                products.forEach(function(product, index) {
                    const length = String(product.price).length;
                    const price = Number(String(product.price).substring(0, length - 2))
    
                    searchItemContainer.innerHTML += 
                    ` 
                    <a href="${product.url}" class="cart-item py-500">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="cart-content-container">
                            <div class="cart-content">
                                <h4>${product.title}</h4>
                                <h5>${price}.00 DKK</h5>
                            </div>
                        </div>
                    </a>
                    `;
                })

            } else {
                searchItemContainer.innerHTML = `
                    <p class="py-500">Unfortunately, we couldn't find any matching products...</p>
                `
            }
    

            // searchInputField.insertAdjacentHTML('afterbegin', [...products])
            
        })
    }

}