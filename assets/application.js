


// Filtering

// const filterForm = document.querySelector('#filterForm');
const filterFormBtn = document.querySelector('#filterFormBtn')

if(filterFormBtn != null) {
    const checkBoxes = document.querySelectorAll('input[name="type"]')
    let url = window.location.href.slice(0, -3);
    let checkedType;

    checkBoxes.forEach((checkBox, i) => {
        
        checkBox.addEventListener('change', e => {
            if(e.target.checked) {
                checkedType = e.target.value
                console.log(checkedType);
            }
        })
    })

    filterFormBtn.addEventListener('click', e => {
        e.preventDefault()
        
        let checked = []

        checkBoxes.forEach(checkbox => {
            checked.push(checkbox.value.toLowerCase())
        })
        console.log(url);

        filterFromBtn.innerHTML = 'disabled'

        // https://hypevintage-aalborg.myshopify.com/collections/types?q=Accessories
        const newUrl = `${url}types?q=${checked[0]}`
 
    })

  
}
