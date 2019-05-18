//
// ─── ELEMENTS ───────────────────────────────────────────────────────────────────
//
const slider = document.querySelector(".slider");
const sliderDisplay = document.querySelector(".slider__display");
const sliderImages = document.querySelector(".slider__display__image-container");

//thumbnail images array
const sliderThumbnailImages = document.querySelectorAll("#sliderThumbnailImages");
const sliderThumbnailImage = document.querySelectorAll("#sliderThumbnailImages img");

//buttons
const sliderBtnPrev = document.querySelector("#sliderBtnPrev");
const sliderBtnnext = document.querySelector("#sliderBtnnext");

//
// ─── VERIABLES ──────────────────────────────────────────────────────────────────
//
let slided = 0;



//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

if (sliderImages) {

    const urlGiver = () =>{
        const Urls = [];

        sliderThumbnailImage.forEach(elem => {
            Urls.push(elem.src);
        });

        // const imageShowcaseArray = [];

        for (let i = 0; i < Urls.length; i++) {
            const imageShowcase = document.createElement('div');
            imageShowcase.classList.add('slider__display__image-container__image');

            imageShowcase.style.backgroundImage = `${Urls[i]}`;
            sliderImages.appendChild(imageShowcase);
            console.log(Urls[i])        
        }

    }

    urlGiver();










    const sliderImagesArray = document.querySelectorAll(".slider__display__image-container__image");


    const resizeImages = () => {
        sliderImagesArray.forEach(elem => {
            elem.style.width = `${slider.offsetWidth}px`;
        });
    };

    window.addEventListener("resize", () => {
        resizeImages();
    });


    // const differentEelements = (array, element) =>{
         

    //         const others = [...array];
    //         const notselected = others.filter(el => el != element);
    //         // console.log(notselected);
            
            
    //         notselected.forEach(elem => {
    //             let diffArray
    //             elem.classList.remove('highlighted-Thumbnail');
    //         });
    // }

 
    sliderThumbnailImage[0].classList.add('highlighted-Thumbnail');
    for (let i = 0; i < sliderThumbnailImage.length; i++) {
        sliderThumbnailImage[i].addEventListener('click', () =>{
            sliderImages.style.transform = `translateX(-${sliderImages.offsetWidth / sliderImagesArray.length * i}px`;
            sliderThumbnailImage[i].classList.add('highlighted-Thumbnail');
            slided = i;

            const others = [...sliderThumbnailImage];
            const notselected = others.filter(el => el != sliderThumbnailImage[i]);
            // console.log(notselected);
            
            
            notselected.forEach(elem => {
                elem.classList.remove('highlighted-Thumbnail');
            });
        })
        
    }
 


    sliderBtnnext.addEventListener("click", () => {
        if (slided == sliderImagesArray.length - 1) {
            sliderImages.style.transform = "translateX(-0px)";
            slided = 0;
            sliderThumbnailImage[0].classList.add('highlighted-Thumbnail');
            sliderThumbnailImage[sliderThumbnailImage.length-1].classList.remove('highlighted-Thumbnail');
        } else {
            slided += 1;
            sliderThumbnailImage[slided].classList.add('highlighted-Thumbnail');
            sliderThumbnailImage[slided-1].classList.remove('highlighted-Thumbnail');
            sliderImages.style.transform = `translateX(-${sliderImages.offsetWidth / sliderImagesArray.length * slided}px`;
        }
    });

    sliderBtnPrev.addEventListener("click", () => {
        if (slided == 0) {
            sliderImages.style.transform = `translateX(0)px`;
            slided = 0;
        } else {
            slided -= 1;
            sliderThumbnailImage[slided].classList.add('highlighted-Thumbnail');
            sliderThumbnailImage[slided+1].classList.remove('highlighted-Thumbnail');
            sliderImages.style.transform = `translateX(-${sliderImages.offsetWidth / sliderImagesArray.length * slided}px`;
        }
    });
}
