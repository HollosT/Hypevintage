const mobileCategory = document.querySelector('#mobileCategory');

if(mobileCategory != null) {
    const container = document.querySelector('.mobile-categories-container');
    const subCategories = document.querySelectorAll('.sub-category')
    const mainCategories = document.querySelectorAll('.main-category');
    const backIcons = document.querySelectorAll('.category-icon')
    const categories = document.querySelectorAll('.category');
    let isOpen;
    
    container.addEventListener('click', (e) => {

        const clicked = e.target.closest('.main-category')
        if (!clicked) return ;
        const i = +clicked.dataset.link - 1;
    
        const active = subCategories[i];
        const backActive = backIcons[i];
        const activeCategory = categories[i];
    
       if(isOpen) {
           
          reset(activeCategory)
           
           isOpen = false;
       } else {
            backActive.classList.remove('hide');
            clicked.classList.add('active-main');
            categories.forEach(cat => cat.classList.remove('reset-category'))
            activeCategory.classList.add('active-category');
            active.classList.remove('hide');

            isOpen = true;
       }
       console.log(isOpen);
    })
   
    
    const reset = (activeCategory) => {
        subCategories.forEach(sub => sub.classList.add('hide'));
        categories.forEach(cat => cat.classList.remove('active-category'));
        backIcons.forEach(icon => icon.classList.add('hide'));
        activeCategory.classList.add('reset-category')
        mainCategories.forEach(main => main.classList.remove('active-main'));
    }
}