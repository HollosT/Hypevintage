const slideShow = document.querySelector('#slideShow');

if(slideShow != null) {
  const tabContainer = document.querySelector('.tab-title-container')
  const slideContainer = document.querySelectorAll('.slide-container');
  const tabs = document.querySelectorAll('.tab');
  const activeBackground = document.querySelector('.tab-active-background');


  tabContainer.addEventListener('click', e => {
    const clicked = e.target.closest('.tab');

    if(!clicked) return;

    const slideId = clicked.dataset.slide;
    // const tabLeft = clicked.getBoundingClientRect().left;
    // // const tabTop = clicked.getBoundingClientRect().y;

    // const bgLeft = activeBackground.getBoundingClientRect().left;
    // // const bgTop = activeBackground.getBoundingClientRect().y;

  


    // activeBackground.style.transform = `translateX(${tabLeft - bgLeft}px)`


    tabs.forEach(tab => tab.classList.remove('active-slide'))
    clicked.classList.add('active-slide')
    setSliders(slideId)
  }) 

  const setSliders = (id) => {
    const title = document.querySelector('.slider-title')
    switch (id) {
        case '1':
            title.innerHTML = 'Did you know? <span>#Sustainability</span>'
        break;
        case '2':
            title.innerHTML = 'Did you know? <span>#BenefitsOfSecondHand</span>'
        break;
        case '3':
            title.innerHTML = 'Did you know? <span>#OurCleaningProcess</span>'
        break;
    
        default:
            break;
    }

    slideContainer.forEach(slide => {
        if(slide.dataset.slide != id) {
            slide.classList.add('hide')
        } else if (slide.dataset.slide === id) {
            slide.classList.remove('hide')
        }
    })
  }


  const initSlide = () => {
    setSliders(1)
  }

  initSlide()
}