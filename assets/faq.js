const faqSection = document.querySelector('#faqSection');

if(faqSection != null) {
    const container = document.querySelector('.faq-container');
    const answers = document.querySelectorAll('.answer');
    const arrows = document.querySelectorAll('.arrow');
    const questions = document.querySelectorAll('.question');
    const faqs = document.querySelectorAll('.faq')

    container.addEventListener('click', (e) => {
        const clicked = e.target.closest('.question')
        if (!clicked) return ;
        const id = clicked.dataset.faq
        
        if(clicked.dataset.open === 'false') {
            open(id)
            clicked.dataset.open = 'true'
        } else if(clicked.dataset.open === 'true') {
            close(clicked)
            clicked.dataset.open = 'false'

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
    
                arrow.classList.add('active-arrow');
             
            } else {
      

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