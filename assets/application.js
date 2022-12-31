
// Sorting
if(document.getElementById('sort_by') != null) {
    document.querySelector('#sort_by').addEventListener('change', function(e) {
        const url = new URL(window.location.href)
    
        url.searchParams.set('sort_by', e.currentTarget.value);
    
        window.location = url.href
    })

}


// Filtering
const filterFormBtn = document.querySelector('#filterFormBtn')

if(filterFormBtn != null) {
    const typeInputs = document.querySelectorAll('input[name="type"]')
    const tagInputs = document.querySelectorAll('input[name="tag"]')

    let url;
    let type;
    let tags = []; 

    const getType = () => {
        typeInputs.forEach((typeInp, i) => {
            typeInp.addEventListener('change', e => {
                type = e.target.value
            })
        })
    }

    const getTags = () => {
        tagInputs.forEach(tagInp => {
            if(tagInp.checked) {
                tags.push(tagInp.value.toLowerCase())
            }
        })

    }

    const prepareTagsQuery = () => {
        if(tags.length === 1) {
            url += tags[0]
        } else {
            tags.forEach((tag, i) => {
                url += tag + '+'

                if(tags.length -1 === i) {
                    url += tag
                }
            })
        }
    }

    filterFormBtn.addEventListener('click', e => {
        e.preventDefault()
        url = window.location.href.slice(0, -3);
        getTags();
        getType();
        
        if(tags.length > 0) {
            url += 'all/'
            prepareTagsQuery()
        }
        
        console.log(url);


        window.location.href = url;
    })
}

//Hamburger Menu 
const hamburgerIcon = document.querySelector('#hamburgerIcon');

if(hamburgerIcon != null ) {
    const hamburgerMenu = document.querySelector('#hamburgerMenu');
    const mobileNavBar = document.querySelector('.mobile-nav');
     const mobileNavBarHeight =mobileNavBar.getBoundingClientRect().height;


     hamburgerIcon.addEventListener('click', (e) => {
         if(hamburgerMenu.classList.contains('opened')) {
            // hamburgerMenu.style.marginTop = `0px`
            hamburgerMenu.classList.remove('opened')
            //  document.body.classList.remove('stop-scroll')
         } else {
            // hamburgerMenu.style.marginTop = `${mobileNavBarHeight}px`
            hamburgerMenu.classList.add('opened')
            //  document.body.classList.add('stop-scroll')            
         }
     })

 }

