document.addEventListener("DOMContentLoaded", function() {      // evento disparado com o carregar de todos os elementos da página (excluindo término da renderização de imagens/vídeos)
    const buttons = document.querySelectorAll("[data-tab-button]");     // seleção de todos os elementos com o atributo 'data-tab-button'
    const accordionQuestions = document.querySelectorAll("[data-faq-question]");

    buttons.forEach(b => {
        b.addEventListener("click", function({ target }) {
            const showLists = document.querySelectorAll("[data-tab-id]");

            showLists.forEach(showList => {
                if (
                    showList.dataset.tabId === target.dataset.tabButton
                    && !showList.classList.contains("shows__list--is-active")
                ) {
                    updateElement("shows__list");
                    updateElement("shows__tabs__button");
                }

                function updateElement(elementClassName) {
                    const modifierClass = `${elementClassName}--is-active`;

                    document.querySelector(`.${modifierClass}`).classList.remove(modifierClass);

                    switch (elementClassName) {
                        case "shows__list":
                            showList.classList.add(modifierClass);
                            break;
                        case "shows__tabs__button":
                            target.classList.add(modifierClass);
                            break;
                        default:
                            throw new Error("Value must be either 'shows__list' or 'shows__tabs__button'");
                    }
                }
            })
        })
    })

    accordionQuestions.forEach(q => q.addEventListener("click", toggleAccordion));

    function toggleAccordion(event) {
        event.target.parentNode.classList.toggle("faq__questions__item--is-open");
    }
})