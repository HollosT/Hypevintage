const slideShow = document.querySelector('#slideShow');

if(slideShow != null) {
    const slides = document.querySelectorAll('.slide');
    const tabContainer = document.querySelector('.tab-title-container');
    const tabs = document.querySelectorAll('.tab')

    // Setting the position of the images
    const goToSlide = function(curIndex) {
        tabs.forEach(tab => tab.classList.remove('active-slide'))
        tabs[curIndex].classList.add('active-slide')
       
        slides.forEach((slide ,i ) => {
            slide.style.transform = `translateX(${100 * (i - curIndex)}%)`
        })
    }

    
    tabContainer.addEventListener('click', e => {
        const clicked = e.target.closest('.tab');

        if(!clicked) return;


        const curIndex = +clicked.dataset.tab - 1;
        goToSlide(curIndex)
    })
    
    const init = () => {
        
        goToSlide(0)
    };

    init();

}