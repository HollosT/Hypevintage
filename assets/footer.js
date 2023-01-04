const footerArrows = document.querySelectorAll('.footer-arrow');

if(footerArrows.length > 0) {

    const footerSections = document.querySelectorAll('.footer-collapse');

    footerArrows.forEach(arrow => {
        arrow.addEventListener('click', e => {
            const i = e.target.dataset.footer;
            const state = e.target.dataset.open;
            
            let activeSection;

            footerSections.forEach(section => {
                if(section.dataset.footer === i) {
                    activeSection = section
                }
            });

            console.log(i, state, activeSection);

            if(state === 'true') {
                activeSection.classList.add('hide')
                arrow.classList.add('active-arrow')
                arrow.dataset.open = 'false'
            } else if (state === 'false') {
                activeSection.classList.remove('hide')
                arrow.classList.remove('active-arrow')
                arrow.dataset.open = 'true'
            }

        })
    })
}