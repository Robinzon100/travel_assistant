//
// ─── ELEMENTS ───────────────────────────────────────────────────────────────────
//
const slider = document.querySelector(".slider");
const sliderDisplay = document.querySelector(".slider__display");
const sliderImages = document.querySelector(".slider__display__image-container");

//thumbnail images array
const sliderThumbnailImages = document.querySelectorAll("#sliderThumbnailImages");
const sliderThumbnailImage = document.querySelectorAll("#sliderThumbnailImages div");

//buttons
const sliderBtnPrev = document.querySelector("#sliderBtnPrev");
const sliderBtnnext = document.querySelector("#sliderBtnnext");

//
// ─── //!VERIABLES ──────────────────────────────────────────────────────────────────
//
let slided = 0;


 





if (sliderImages) {


    //? takes the urls in the thubnail <div> and gives the showcase <div>s AND creats the elements with urls
    const urlGiver = () =>{
        const Urls = [];

        sliderThumbnailImage.forEach(elem => {
            Urls.push(elem.style.backgroundImage.slice(4, -1).replace(/"/g, ""));
        });

        for (let i = 0; i < Urls.length; i++) {
            const imageShowcase = document.createElement('div');

            imageShowcase.classList.add('slider__display__image-container__image');
            imageShowcase.style.backgroundImage = `url("${Urls[i]}")`;
            sliderImages.appendChild(imageShowcase); 
        }

    }

    urlGiver();




    
    //? after creating the element we can get them all (becouse we gave them a classname)
    const sliderImagesArray = document.querySelectorAll(".slider__display__image-container__image");

    //?resizes the image <div> on each resize 
    const resizeImages = () => {
        sliderImagesArray.forEach(elem => {
            elem.style.width = `${slider.offsetWidth}px`;
        });
    };

    window.addEventListener("resize", () => {
        resizeImages();
    });



    //! helper function that gets the diferent array that doesnt contain the element(that is given in the second argument)
    const differentEelements = (array, element) =>{
            const others = [...array];
            const notselected = others.filter(el => el != element);
            return notselected;
    }

 
    //? adds the highlited class to the first thumnail image
    sliderThumbnailImage[0].classList.add('highlighted-Thumbnail');
    
    //? transfroms the main showcase container div TRANSFORMX VALUE appropriatly 
    for (let i = 0; i < sliderThumbnailImage.length; i++) {
        sliderThumbnailImage[i].addEventListener('click', () =>{
            sliderImages.style.transform = `translateX(-${sliderImages.offsetWidth / sliderImagesArray.length * i}px`;
            sliderThumbnailImage[i].classList.add('highlighted-Thumbnail');
            slided = i;

            differentEelements(sliderThumbnailImage, sliderThumbnailImage[i]).forEach(elem => {
                elem.classList.remove('highlighted-Thumbnail');
            });
        })
        
    }
 

    //? NEXT BUTTON event listener
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


    //? PREV BUTTON event listener
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
