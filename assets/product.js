
const productPage = document.querySelector('#productPgae');

if(productPage != null) {
    const qualityCondition = document.querySelector('.product-quality-p');
    const quality = document.querySelector('.quality-bar-filled');
    const rating = quality.dataset.quality.slice(0, 1);
 
    quality.style.width = `${+rating * 19}%`;

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

}