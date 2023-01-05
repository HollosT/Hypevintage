const collectionPage = document.querySelector('#collectionPage');

if(collectionPage != null) {
    const filterBtn = document.querySelector('#filterBtn');
    const filterContainer = document.querySelector('.filter')
    const filterCloseBtn = document.querySelector('#filterCloseBtn');

    filterBtn.addEventListener('click', () => {
        
        filterContainer.classList.remove('close-filter')
        filterContainer.classList.add('open-filter')
    })
    
    filterCloseBtn.addEventListener('click', () => {
        filterContainer.classList.add('close-filter')
        filterContainer.classList.remove('open-filter')

    })
}