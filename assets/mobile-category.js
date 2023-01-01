const mobileCategory = document.querySelector('#mobileCategory');

if(mobileCategory != null) {
    const container = document.querySelector('.mobile-categories-container');
    const subCategories = document.querySelectorAll('.sub-category')
    const mainCategories = document .querySelectorAll('.main-category');
    container.addEventListener('click', (e) => {
        e.preventDefault();

        const clicked = e.target.closest('.main-category')
        if (!clicked) return ;
        const i = +clicked.dataset.link - 1

        const active = subCategories[i]
        
        mainCategories.forEach(main => main.classList.remove('active-main'))
        clicked.classList.add('active-main')

        subCategories.forEach(sub => sub.classList.add('hide'))
        active.classList.remove('hide')
  
    })

}