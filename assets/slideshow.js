const slideShow = document.querySelector('#slideShow');

if(slideShow != null) {
    const slides = document.querySelectorAll('.slide');
    const tabContainer = document.querySelector('.tab-title-container');


    // Setting the position of the images
    const goToSlide = function(curIndex) {
        slides.forEach((slide ,i ) => {
            slide.style.transform = `translateX(${100 * (i - curIndex)}%)`
        })
    }

    
    
    tabContainer.addEventListener('click', e => {
        console.log('hello');
        const clicked = e.target.closest('.tab');

        if(!clicked) return;
       
        goToSlide(+clicked.dataset.tab)
    })
    
    const init = () => {
        goToSlide(0)
    };

    init();

}