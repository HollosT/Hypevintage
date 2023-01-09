const termSections = document.querySelectorAll('.term-section');

if(termSections.length > 0) {
    const containers = document.querySelectorAll('.term-title');
    const answers = document.querySelectorAll('.term-content');
    const arrows = document.querySelectorAll('.term-arrow');
    const titles = document.querySelectorAll('.return-delivery-title')

    containers.forEach(title => {
        title.addEventListener('click', (e) => {
            const clicked = e.target.closest('.term-arrow')
            if (!clicked) return ;
            const id = clicked.dataset.term
            
            if(clicked.dataset.open === 'false') {
                open(id)
    
            } else if(clicked.dataset.open === 'true') {
                close(clicked)
            }
        })
    })

    const open = (id) => {

        titles.forEach(title => {
            if(title.dataset.term === id) {
                title.style.fontWeight = '800'
            } else {
                title.style.fontWeight = '400'


            }

        })


        answers.forEach(answer => {
            if(answer.dataset.term === id) {
                answer.classList.remove('hide')
            } else {
                answer.classList.add('hide')
            }
        });

        arrows.forEach(arrow => {
            if(arrow.dataset.term === id) {
                // arrow.innerHTML = 'expand_less'
                arrow.classList.add('active-arrow');
                arrow.dataset.open = 'true'
            } else {
                arrow.dataset.open = 'false'
                // arrow.innerHTML = 'expand_more'

                arrow.classList.remove('active-arrow')

            }
        });
        
    }

    const close = (clicked) => {
        arrows.forEach(arrow => arrow.classList.remove('active-arrow'));
        arrows.forEach(arrow => arrow.innerHTML = 'expand_less');
        titles.forEach(title => title.style.fontWeight = '400');
        clicked.dataset.open = 'false'
        answers.forEach(answer => answer.classList.add('hide'))
    }
}