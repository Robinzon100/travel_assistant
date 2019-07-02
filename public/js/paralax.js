const paralaxElement = document.querySelectorAll(".scroll-paralax");

window.addEventListener("scroll", e => {
    for (let i = 0; i < paralaxElement.length; i++) {
        if (paralaxElement[0].getBoundingClientRect().top <= 1000) {
            let rate = paralaxElement[i].dataset.rate;
            var pos = window.pageYOffset * rate;
            paralaxElement[i].style.transform = "translate3d(0px," + pos + "px, 0px)";
        }
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 630) {
        paralaxElement.forEach(e => {
            e.dataset.rate = 0; 
        });
    }
});
