document.addEventListener("DOMContentLoaded", function() {      // evento disparado com o carregar de todos os elementos da página (excluindo término da renderização de imagens/vídeos)
    const buttons = document.querySelectorAll("[data-tab-button]");     // seleção de todos os elementos com o atributo 'data-tab-button'
    const accordionQuestions = document.querySelectorAll("[data-faq-question]");

    const heroSection = document.querySelector(".hero");
    const heroSectionHeight = heroSection.clientHeight;

    window.addEventListener("scroll", () => {
        if (scrollY < heroSection.clientHeight)     // essa lógica invertida, ao invés de checar se scrollY é maior que heroSection.clientHeight, é mais performática, pois a maioria da página está abaixo do hero e haveria mais código rodando desnecessariamente se a lógica fosse reversa
            hideHeaderElements();
        else
            revealHeaderElements();
    })

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

    function hideHeaderElements() {
        const header = document.querySelector(".header");
        
        !header.classList.contains("header--is-hidden") && header.classList.add("header--is-hidden");
    }

    function revealHeaderElements() {
        const header = document.querySelector(".header");
        
        header.classList.contains("header--is-hidden") && header.classList.remove("header--is-hidden");
    }
})