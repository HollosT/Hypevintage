const faqSection = document.querySelector('#faqSection');

if(faqSection != null) {
    const container = document.querySelector('.faq-container');
    const answers = document.querySelectorAll('.answer');
    const arrows = document.querySelectorAll('.arrow');
    const faqs = document.querySelectorAll('.faq')

    container.addEventListener('click', (e) => {
        const clicked = e.target.closest('.arrow')
        if (!clicked) return ;
        const id = clicked.dataset.faq
        
        if(clicked.dataset.open === 'false') {
            open(id)

        } else if(clicked.dataset.open === 'true') {
            close(clicked)
        }
    })


    const open = (id) => {

        faqs.forEach(faq => {
            if(faq.dataset.faq === id) {
                faq.classList.add('faq-active');
            } else {
                faq.classList.remove('faq-active');

            }

        })


        answers.forEach(answer => {
            if(answer.dataset.faq === id) {
                answer.classList.remove('hide')
            } else {
                answer.classList.add('hide')
            }
        });

        arrows.forEach(arrow => {
            if(arrow.dataset.faq === id) {
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
        faqs.forEach(faq => faq.classList.remove('faq-active'));
        clicked.dataset.open = 'false'
        answers.forEach(answer => answer.classList.add('hide'))
    }
}