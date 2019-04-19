let card = document.querySelector('.card-small');

let cardImage = document.querySelectorAll('.card-small__image');
let cardText = document.querySelectorAll('.card-small__text');

let visitBtn = document.querySelector('.card-small__text__button');
let visitBtnHidden = document.querySelectorAll('.card-small__text__overlay-button');

let toggled = false; 
 
for(let i = 0; i < cardImage.length; i++ ){
	cardImage[i].addEventListener('click',  () =>{
		// if(!toggled){
			cardText[i].classList.toggle('js-text-disappear');
			visitBtnHidden[i].classList.add('js-active-button');
		console.log(visitBtnHidden[i].classList);
			cardImage[i].style.transform ='scale(2.07)';
			
			
			const otherCardImagesArray = [...cardImage];
			const otherCardImages = otherCardImagesArray.filter(img => img != otherCardImagesArray[i]);
			console.log(otherCardImages);
			
			for(let j = 0; j < otherCardImages.length; j++ ){
				console.log(otherCardImages[j]);
				otherCardImages[j].style.transform ='scale(1)'; 
				otherCardImages[j].nextElementSibling.classList.remove('js-text-disappear');
				otherCardImages[j].previousElementSibling.classList.remove('js-active-button');
				// visitBtnHidden[i].classList.toggle('js-active-button');
			}
		

			
			
			// toggled = false;
// 		}else{
// 			otherCardImages[j].nextElementSibling.classList.remove('js-text-disappear');
// 			console.log("here");
// 			// otherCardImages[j].previousElementSibling.classList.toggle('js-active-button');
// 			visitBtnHidden[i].classList.toggle('js-active-button');
// 			cardImage[i].style.transform ='scale(1)';
// 			toggled = true;
			
// 		}
	})
}

// document.body.addEventistener('click', () =>{
// 		for(let i = 0; i < cardImage.length; i++ ){
// 				cardText[i].classList.toggle('js-text-disappear');
// 				visitBtnHidden[i].classList.toggle('js-active-button');
// 				cardImage[i].style.transform ='scale(1)';
// 				toggled = false;
// 	}
// })

// visitBtn.addEventListener('click', () =>{
// 	cardImage.removeEventListener('click',cardAnim());
// 	card.style.overflow = "initial";
// 	cardImage.style.postions = "fixed";
// 	cardImage.style.width = "100vw";
// 	cardImage.style.height = "20vh";
	
	
// })
 

	
