const collectionPage = document.querySelector('#collectionPage');

if(collectionPage != null) {
    const filterBtn = document.querySelector('#filterBtn');
    const filterContainer = document.querySelector('.filter')
    const filterCloseBtn = document.querySelector('#filterCloseBtn');
    const activeFiltersNumber = document.querySelector('.active-filters-number');

    filterBtn.addEventListener('click', () => {
        
        filterContainer.classList.remove('close-filter')
        filterContainer.classList.add('open-filter')
    })
    
    filterCloseBtn.addEventListener('click', () => {
        filterContainer.classList.add('close-filter')
        filterContainer.classList.remove('open-filter')
        getActiveFilters()
    })

    const getActiveFilters = () => {
        const activeFilters = document.querySelectorAll('.active-filters').length;
 
       if(activeFilters > 0) {
     
            activeFiltersNumber.innerHTML = activeFilters
            activeFiltersNumber.classList.remove('hide')
            filterBtn.classList.add('active-filterBtn')
            document.querySelector('.active-filters__clear').classList.remove('hide')

       } else if (activeFilters === 0) {
           activeFiltersNumber.classList.add('hide')
           filterBtn.classList.remove('active-filterBtn')
           document.querySelector('.active-filters__clear').classList.add('hide')
    
    
       }
    }
}