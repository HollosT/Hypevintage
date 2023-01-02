const mobileCategory = document.querySelector('#mobileCategory');

if(mobileCategory != null) {
    const container = document.querySelector('.mobile-categories-container');
    const subCategories = document.querySelectorAll('.sub-category')
    const mainCategories = document.querySelectorAll('.main-category');
    const backIcons = document.querySelectorAll('.category-icon')

    container.addEventListener('click', (e) => {
        const clicked = e.target.closest('.main-category')
        if (!clicked) return ;
        const i = +clicked.dataset.link - 1;

        const active = subCategories[i];
        const backActive = backIcons[i];

        resetCategory();

        backActive.classList.remove('hide');
        clicked.classList.add('active-main');
        active.classList.remove('hide');

        addCloseHandler(backActive);
  
    })

    const addCloseHandler = (active) => {
        active.addEventListener('click', () => {
            resetCategory();
        })
    }
    

    const resetCategory = () => {
        backIcons.forEach(icon => icon.classList.add('hide'));
        mainCategories.forEach(main => main.classList.remove('active-main'));
        subCategories.forEach(sub => sub.classList.add('hide'));
    }


}