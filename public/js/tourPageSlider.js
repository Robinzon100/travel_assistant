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
                elem.classList.remove('highlighted-Thumbnail');
            });

            
            elem.classList.add('highlighted-Thumbnail');
            tourHero.style.backgroundImage = `url("${showcaseImageUrl}")`;
        })        
    }
}