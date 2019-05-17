const tourHero = document.querySelector(".tour_hero");
const showcaseImagesArray = document.querySelectorAll(".tour_hero__showcase-images__image");

if (tourHero) {
    for (let i = 0; i < showcaseImagesArray.length; i++) {
        const elem = showcaseImagesArray[i];
        const firstelemUrl = showcaseImagesArray[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
        
        
        // showcaseImagesArray[0].style.border = "8px solid black";
        tourHero.style.backgroundImage = `url("${firstelemUrl}")`;

        elem.addEventListener('click', () =>{
            const showcaseImageUrl = elem.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            const otherImages = [...showcaseImagesArray];
            const notselectedImages = otherImages.filter(el => el != elem);
            
            notselectedImages.forEach(elem => {
                elem.style.border = "none";
                elem.style.boxShadow = "none";
            });

            
            elem.style.border = "2px solid #21E6C1";
            elem.style.boxShadow = "4px -4px 20px #21E6C1";
            tourHero.style.backgroundImage = `url("${showcaseImageUrl}")`;
        })        
    }
}