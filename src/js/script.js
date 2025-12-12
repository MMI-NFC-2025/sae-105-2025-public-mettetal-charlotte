const toogle = document.querySelector('.menu-btn');
const nav = document.querySelector('.menu');
const logo = document.querySelector('.header__logo');
const page = document.body

if (toogle && nav){
    toogle.addEventListener('click', () => {
        const isOpen = toogle.ariaExpanded ==="true" ;
        const isClosed = !isOpen;

        toogle.ariaExpanded = isClosed;
        nav.hidden = isOpen;
        logo.classList.toogle("header__logo--extend", isClosed);
        page.classList.toogle("u-noscroll", isClosed);
}