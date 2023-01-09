const slideShow = document.querySelector('#slideShow');

if(slideShow != null) {
  const tabContainer = document.querySelector('.tab-title-container')
  const slideContainer = document.querySelectorAll('.slide-container');
  const tabs = document.querySelectorAll('.tab');
  const activeBackground = document.querySelector('.active-slide');


  tabContainer.addEventListener('click', e => {
    const clicked = e.target.closest('.tab');

    if(!clicked) return;

    const slideId = clicked.dataset.slide;
 
    const distance = (tabs[0].getBoundingClientRect().left - tabs[2].getBoundingClientRect().left) / 2;
   
    switch (slideId) {
      case "1":
        activeBackground.style.transform = `translateX(${distance}px)`
      break;
      case "2":
        activeBackground.style.transform = `translateX(0px)`
      break;
      case "3":
        activeBackground.style.transform = `translateX(${-distance}px)`
      break;
    
      default:
        break;
    }

    


    tabs.forEach(tab => tab.classList.remove('active-tab'))
    clicked.classList.add('active-tab')
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


}