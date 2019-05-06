const glide_1 = new Glide("#medium-card-container-1", {
    type: "slider",
    gap: "30",
    perView: 5,
    startAt: 1,
    hoverpause: true,
    autoplay: 4000,
    dragThreshold: 20,
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



const glide_2 = new Glide("#medium-card-container-2", {
    type: "slider",
    gap: "30",
    perView: 5,
    startAt: 1,
    hoverpause: true,
    autoplay: 4000,
    dragThreshold: 20,
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
