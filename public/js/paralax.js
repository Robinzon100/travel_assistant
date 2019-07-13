// const parallaxElement = document.querySelectorAll(".scroll-paralax");

// window.addEventListener("scroll", e => {
//     for (let i = 0; i < parallaxElement.length; i++) {
//         if (parallaxElement[0].getBoundingClientRect().top <= 1000) {
//             let rate = parallaxElement[i].dataset.rate;
//             var pos = window.pageYOffset * rate;
//             parallaxElement[i].style.transform = "translate3d(0px," + pos + "px, 0px)";
//         }
//     }
// });

// window.addEventListener("resize", () => {
//     if (window.innerWidth < 630) {
//         parallaxElement.forEach(e => {
//             e.dataset.rate = 0; 
//         });
//     }
// });



const parallaxElement = document.querySelectorAll('.parallaxElement')


let offset = 0.3;
let yPost = 0;
let windowsCenter = window.innerHeight / 2; 

// window.addEventListener('resize', () => {
//     let windowsCenter = window.innerHeight / 2;
//     let elementWidth = elem.getBoundingClientRect().width;
//     let elementHeight = elem.getBoundingClientRect().height;
// })


window.addEventListener('scroll', () => {
    window.requestAnimationFrame(animatePralax)
});



const animatePralax = () => {
    parallaxElement.forEach(elem => {
        let offset = elem.dataset.rate;
        let elementRect = elem.getBoundingClientRect();
        let elementCenter = elementRect.top + (elementRect.height / 2);
        let distFromElementCenter = elementCenter - windowsCenter;
        let Y = yPost + (distFromElementCenter * offset)

        elem.style.transform = `translate3d(0, ${Y}px, 0)`;

        // console.log(`elementCenter is ${elementCenter}` + '\n'
        //     + `distFromElementCenter ${distFromElementCenter}` + '\n'
        //     + `Y ${Y}`);

        // requestAnimationFrame(animatePralax)
    })

     

};

