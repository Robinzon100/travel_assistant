//
// ─── ELEMENTS ───────────────────────────────────────────────────────────────────
//
//slider
let slider = document.querySelector(".slider");
const sliderDisplay = document.querySelector(".slider__display");
const sliderImages = document.querySelector(
    ".slider__display__image-container"
);
const sliderImagesArray = document.querySelectorAll(
    ".slider__display__image-container__image"
);

//thumbnail images array
const sliderThumbnailImages = document.querySelectorAll(
    "#sliderThumbnailImages"
);

//buttons
const sliderBtnPrev = document.querySelector("#sliderBtnPrev");
const sliderBtnnext = document.querySelector("#sliderBtnnext");

//
// ─── VERIABLES ──────────────────────────────────────────────────────────────────
//

const getDistance = () => {
    
    return distance;
};
let slided = 0;

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

if (sliderImages) {
    const resizeImages = () => {
        sliderImagesArray.forEach(elem => {
            elem.style.width = `${slider.offsetWidth}px`;
        });
    };

    window.addEventListener("resize", () => {
        resizeImages();
    });

    // window.setInterval(function () {
    //     resizeImages();
    //     getDistance();
    //     // console.log(getDistance());
    // }, 1000);

  

    sliderBtnnext.addEventListener("click", () => {
        if (slided == sliderImagesArray.length - 1) {
            sliderImages.style.transform = "translateX(-0px)";
            slided = 0;
        } else {
            slided += 1;
            sliderImages.style.transform = `translateX(-${sliderImages.offsetWidth / sliderImagesArray.length * slided}px`;
        }
    });

    sliderBtnPrev.addEventListener("click", () => {
        if (slided == 0) {
            sliderImages.style.transform = `translateX(0)px`;
            slided = 0;
        } else {
            slided -= 1;
            sliderImages.style.transform = `translateX(-${sliderImages.offsetWidth / sliderImagesArray.length * slided}px`;
        }
    });
}
