const glide_1 = new Glide("#medium-card-container-tours", {
    type: "glide",
    gap: "30",
    perView: 4,
    startAt: 1,
    // hoverpause: true,
    // autoplay: 20000,
    // dragThreshold: 20,
    touchRatio: 1,
    perTouch: false,
    breakpoints: { 
        1400: {
            perView: 4
        }, 
        1024: {
            perView: 2
        },
        600: {
            perView: 1
        }
    }
});

glide_1.update({
    hoverpause: true
});

glide_1.mount();



const glide_2 = new Glide("#medium-card-container-expeditions", {
    type: "glide",
    gap: "30",
    perView: 4,
    startAt: 1,
    // hoverpause: true,
    // autoplay: 20000,
    // dragThreshold: 20,
    touchRatio: 1,
    perTouch: false,
    breakpoints: {
        1400: {
            perView: 4
        },
        1024: {
            perView: 2
        },
        600: {
            perView: 1
        }
    }
});

glide_2.update({
    hoverpause: true
});

glide_2.mount();




const glide_specials = new Glide("#large-card-container-specialOffers", {
    type: "glide",
    gap: "30",
    perView: 2,
    startAt: 1,
    // hoverpause: true,
    // autoplay: 20000,
    // dragThreshold: 20,
    touchRatio: 1,
    perTouch: false,
    breakpoints: {
        1024: {
            perView: 1
        }
    }
});

glide_specials.update({
    hoverpause: true
});

glide_specials.mount();
