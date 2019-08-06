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
const parallaxImage = document.querySelectorAll('.parallaxImage')


let offset = 0.3;
let yPost = 0;
let windowsCenter = window.innerHeight / 2;

// window.addEventListener('resize', () => {
//     let windowsCenter = window.innerHeight / 2;
//     let elementWidth = elem.getBoundingClientRect().width;
//     let elementHeight = elem.getBoundingClientRect().height;
// })



if (parallaxElement || animatePralaxImage) {


    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(animatePralaxElement)
        window.requestAnimationFrame(animatePralaxImage)
    });


    window.addEventListener('load', () => {
        animatePralaxElement();
        animatePralaxImage();
    });

    const animatePralaxElement = () => {
        parallaxElement.forEach(elem => {
            let offset = elem.dataset.rate;
            let elementRect = elem.getBoundingClientRect();
            let elementCenter = elementRect.top + (elementRect.height / 2);
            let distFromElementCenter = elementCenter - windowsCenter;
            let elemntY = yPost + (distFromElementCenter * offset)

            elem.style.transform = `translate3d(0, ${elemntY}px, 0)`;
        })
    };



    const animatePralaxImage = () => {
        parallaxImage.forEach(elem => {
            let offset = elem.dataset.rate;
            let imageRect = elem.getBoundingClientRect();
            let elementCenter = imageRect.top + (imageRect.height / 2);
            let distFromElementCenter = elementCenter - windowsCenter;
            let imageY = yPost + (distFromElementCenter * offset)

            // console.log(imageY);
            

            elem.style.backgroundPosition = `0% ${imageY}%`;

            // console.log(`elementCenter is ${elementCenter}` + '\n'
            //     + `distFromElementCenter ${distFromElementCenter}` + '\n'
            //     + `Y ${Y}`);

            // requestAnimationFrame(animatePralaxImage)
        })
    };
}


