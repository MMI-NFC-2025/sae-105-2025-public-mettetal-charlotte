const toggle = document.querySelector('.menu-btn');
const nav = document.querySelector('.menu');
const logo = document.querySelector('.header__logo');
const page = document.body;

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        const isClosed = !isOpen;

        toggle.setAttribute('aria-expanded', String(isClosed));
        nav.hidden = isOpen;
        if (logo) logo.classList.toggle('header__logo--extend', isClosed);
        page.classList.toggle('u-noscroll', isClosed);
    });
}

// Carrousel simple pour la page artiste
function initCarousel(root) {
    const track = root.querySelector('.carousel__track');
    const slides = Array.from(root.querySelectorAll('.carousel__slide'));
    const prevBtn = root.querySelector('.carousel__btn--prev');
    const nextBtn = root.querySelector('.carousel__btn--next');
    const dotsWrap = root.querySelector('.carousel__dots');
    if (!track || slides.length === 0) return;
    let index = 0;

    // construire les dots
    slides.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.className = 'carousel__dot';
        btn.setAttribute('role','tab');
        btn.setAttribute('aria-selected', i===0 ? 'true' : 'false');
        btn.dataset.index = i;
        btn.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(btn);
    });

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        const dots = dotsWrap.querySelectorAll('.carousel__dot');
        dots.forEach((d,i)=> d.setAttribute('aria-selected', String(i===index)));
    }

    function goTo(i){
        index = (i + slides.length) % slides.length;
        update();
    }

    if (prevBtn) prevBtn.addEventListener('click', ()=> goTo(index-1));
    if (nextBtn) nextBtn.addEventListener('click', ()=> goTo(index+1));

    // support clavier: flèches gauche/droite quand focus dans le carrousel
    root.addEventListener('keydown', (e)=>{
        if (e.key === 'ArrowLeft') { goTo(index-1); }
        if (e.key === 'ArrowRight') { goTo(index+1); }
    });

    // initial
    update();
}

document.addEventListener('DOMContentLoaded', ()=>{
    const car = document.querySelector('.carousel');
    if (car) initCarousel(car);
});
