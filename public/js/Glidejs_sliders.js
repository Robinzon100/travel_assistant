const glide = new Glide(".glide", {
    type: "carousel",
    perView: 5,
    startAt: 1,
    breakpoints: {
        1024: {
            perView: 2
        },
        600: {
            perView: 1
        }
    }
});
  
glide.mount();
