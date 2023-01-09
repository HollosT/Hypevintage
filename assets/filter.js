const filterPage = document.querySelector('#filterContainer');



if(filterPage != null) {
    const filterTitles = document.querySelectorAll('.filter-title-container');
    const activeFiltersNumber = document.querySelector('.active-filters-number');
    const filterBtn = document.querySelector('#filterBtn');
    filterTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            getActiveFilters();
            if(title.classList.contains('active-filter-title')) {
                title.classList.remove('active-filter-title')
            } else {
                title.classList.add('active-filter-title')
            }
        })
    })

    // // Get the active filters number
    document.addEventListener('DOMContentLoaded', () => {
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