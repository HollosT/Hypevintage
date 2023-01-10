
const productPage = document.querySelector('#productPgae');

if(productPage != null) {
    const qualityCondition = document.querySelector('.product-quality-p');
    const quality = document.querySelector('.quality-bar-filled');
    const rating = quality.dataset.quality.slice(0, 1);
 
    quality.style.width = `${+rating * 22}%`;

    switch (rating) {
        case '1':
            qualityCondition.innerHTML = 'Normal vintage condition with wear'
        break;
        case '2':
            qualityCondition.innerHTML = 'Good vintage condition'
        break;
        case '3':
            qualityCondition.innerHTML = 'Very good vintage condition'
        break;
        case '4':
            qualityCondition.innerHTML = 'New condition'
        break;
    
        default:
            break;
    }


    const productSubImg = document.querySelector('.product-sub-image');
    const productMainImg = document.querySelector('.product-main-img');
    const imgContainer = document.querySelector('.product-image-container')

    // 
    productSubImg.addEventListener('click', (e) => {
        
        // Set the sub image
        productSubImg.classList.add('grow-image')

        // Set the main image
        productMainImg.classList.add('product-sub-image')
        productMainImg.classList.remove('product-main-img')

        
        setTimeout(() => {
            productSubImg.classList.remove('product-sub-image')
            productSubImg.classList.remove('grow-image')
            productSubImg.classList.add('product-main-img')
            

            addEventHandlerToMainImage()
        }, 250)

       
    })

    const addEventHandlerToMainImage = () => {

        productMainImg.addEventListener('click', (e) => {
            
            // Set the sub image
            productMainImg.classList.add('grow-image')

            // Set the main image
            productSubImg.classList.add('product-sub-image')
            productSubImg.classList.remove('product-main-img')

            
            setTimeout(() => {
                productMainImg.classList.remove('product-sub-image')
                productMainImg.classList.remove('grow-image')
                productMainImg.classList.add('product-main-img')
                
            }, 250)
        })
    }



}