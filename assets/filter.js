const filterPage = document.querySelector('#filterContainer');

if(filterPage != null) {
    const filterTitles = document.querySelectorAll('.filter-title-container');

    filterTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            if(title.classList.contains('active-filter-title')) {
                title.classList.remove('active-filter-title')
            } else {
                title.classList.add('active-filter-title')
            }
        })
    })

}