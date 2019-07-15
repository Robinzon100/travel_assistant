//
// ─── ELEMENTS ───────────────────────────────────────────────────────────────────
//
//DROP-DWON
const hamburger = document.querySelector('.ham');
const menu = document.querySelector('#menu-js');

//NAVIGATION-CHANGE
let navigation = document.querySelector('.navigation');


// 
// ─── DROPDOWN FUNCTIONS ─────────────────────────────────────────────────────────
//
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('droped');
});

//
// ─── NAVIGATION CHANGE ON SCROLL ────────────────────────────────────────────────
//
window.addEventListener('scroll', (e) => {
    const animatedElement = document.querySelectorAll('.scroll');

    for (let i = 0; i < animatedElement.length; i++) {
        //get the atributes
        let animClass = animatedElement[i].getAttribute('anim-class');
        let animPos = animatedElement[i].getAttribute('anim-pos');
        
        //get th windows position
        let scrollDistance = window.pageYOffset;

        //chenge class on scroll
        if (scrollDistance > 500) {
            navigation.classList.add("navigation-drop-shadow");
        }else{
            navigation.classList.remove("navigation-drop-shadow");            
        }

    }
});

