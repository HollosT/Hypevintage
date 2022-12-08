


// Filtering

// const filterForm = document.querySelector('#filterForm');
const filterFormBtn = document.querySelector('#filterFormBtn')

if(filterFormBtn != null) {
    const checkBoxes = document.querySelectorAll('input[name="type"]')
    let url = window.location.href.slice(0, -3);
    let checkedType;

    checkBoxes.forEach((checkBox, i) => {

        checkBox.addEventListener('change', e => {
            checkedType = e.target.value
        })
    })

    filterFormBtn.addEventListener('click', e => {
        e.preventDefault()
        
        let checked = []

        checkBoxes.forEach(checkbox => {
            checked.push(checkbox.value.toLowerCase())
        })
        console.log(url);

        filterFormBtn.innerHTML = 'disabled'

        // https://hypevintage-aalborg.myshopify.com/collections/types?q=Accessories
        const newUrl = `${url}types?q=${checkedType}`;
        
        window.location.href = newUrl;
    })

  
}
