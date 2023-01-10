const termSections = document.querySelectorAll('.term-section');

if(termSections.length > 0) {
    const containers = document.querySelectorAll('.term-title');
    const answers = document.querySelectorAll('.term-content');
    const arrows = document.querySelectorAll('.term-arrow');
    const titles = document.querySelectorAll('.return-delivery-title')

    containers.forEach(title => {
        title.addEventListener('click', (e) => {
            const clicked = e.target.closest('.term-question')
            if (!clicked) return ;
            const id = clicked.dataset.term
            
            if(clicked.dataset.open === 'false') {
                open(id)
                clicked.dataset.open = 'true'
            } else if(clicked.dataset.open === 'true') {
                close(clicked)
                clicked.dataset.open = 'false'

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

                arrow.classList.add('active-arrow');
                
            } else {
   

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