const paralaxElement = document.querySelectorAll('.scroll-paralax');


window.addEventListener('scroll', (e) => {     
    for (let i = 0; i < paralaxElement.length; i++) {
        let rate  = paralaxElement[i].dataset.rate;
        var pos = window.pageYOffset * rate;
        paralaxElement[i].style.transform = 'translate3d(0px,'+pos+'px, 0px)';
    }
});