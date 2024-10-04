const body = document.body;
const boutonsPopUp = document.querySelectorAll("button[data-popup-id]");
const popUp = document.querySelectorAll(".popup");
const popUpInfo = document.querySelectorAll(".popup-info");
const menuDesktop = document.querySelector(".ordinateur");
const windowHeight = window.innerHeight;
let topLimit = windowHeight * 0.1;


// P O P   U P   P R O J E T S

boutonsPopUp.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        const popupId = bouton.getAttribute("data-popup-id");
        const popup = document.querySelector(`.popup[data-popup-id="${popupId}"]`);
        popup.classList.remove("none");
        body.classList.add("noscroll");
        menuDesktop.classList.add("active-nav-desktop")
        topLimit = -1;

        setTimeout(() => {
            popup.classList.add("apparition");
        }, 10);
    });
});

popUp.forEach((popup) => {
    const blocPopup = popup.querySelector(".bloc-popup");
    const closeButton = popup.querySelector(".close"); 

    // Fermer la popup en cliquant en dehors du bloc de contenu
    popup.addEventListener("click", () => {
        popup.classList.remove("apparition");
        body.classList.remove("noscroll");
        topLimit = windowHeight * 0.1;

        setTimeout(() => {
            popup.classList.add("none");
        }, 200);
    });

    // Empêche la fermeture de la popup si on clique à l'intérieur du bloc popup
    blocPopup.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        popup.classList.remove("apparition");
        body.classList.remove("noscroll");
        topLimit = windowHeight * 0.1;

        setTimeout(() => {
            popup.classList.add("none");
        }, 200);
    });
});

// P O P   U P   F O R M A T I O N S

const h4Element = document.querySelectorAll("h4[data-popup-experiences-id]");
const popUpFormations = document.querySelectorAll(".plus-info");

//Ouverture PopUp
h4Element.forEach((h4) => {
    h4.addEventListener("click", (event) => {
        event.stopPropagation();
        const popupIdExperiences = h4.getAttribute("data-popup-experiences-id");
        const popupexperience = document.querySelector(`.plus-info[data-popup-experiences-id="${popupIdExperiences}"]`);
        popupexperience.classList.remove("none"); 
        setTimeout(() => {
            popupexperience.classList.add("apparition");
        }, 100);
    });
});

//Empêche la fermeture de la popup si on clique à l'intérieur du bloc popup
popUpFormations.forEach((popup) => {
    popup.addEventListener("click", (event) => {
        event.stopPropagation();
    })
}),

//Fermeture PopUp
body.addEventListener("click", () => { 
    const popups = document.querySelectorAll(".plus-info");
    popups.forEach((popup) => {
        popup.classList.remove("apparition");
        setTimeout(() => {
            popup.classList.add("none");
        }, 200);
    });
});

// Carrousel venant de Waqas Bajwa --> https://codepen.io/devbajwa/pen/rNELYyw

class Carousel {
  constructor(element) {
    this.element = element;
    this.images = Array.from(element.querySelectorAll("img"));
    this.currentIndex = 0;
    this.totalImages = this.images.length;

    this.createNavButtons();
    this.showImage(this.currentIndex);
  }

  createNavButtons() {
    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.className = "carousel-button prev";
    prevButton.addEventListener("click", () => this.showPrevious());

    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.className = "carousel-button next";
    nextButton.addEventListener("click", () => this.showNext());

    // Append buttons to the carousel container instead of the parent node
    this.element.appendChild(prevButton);
    this.element.appendChild(nextButton);
  }

  showImage(index) {
    this.images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
      if (i === index) {
        this.showTitle(img);
      }
    });
  }

  showTitle(img) {
    const title = img.getAttribute("alt");
    let span = img.nextElementSibling;

    // Check if the span already exists adjacent to the image
    if (!span || span.tagName.toLowerCase() !== "span") {
      // Create a new span element
      span = document.createElement("span");
      // Insert the span adjacent to the image
      img.insertAdjacentElement("afterend", span);
      span.textContent = title;
      span.classList.add("img-title", "active");
    } else {
      span.textContent = title; // Update text content
      span.classList.add("active"); // Make sure it's active
    }
  }

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.showImage(this.currentIndex);
  }

  showPrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.showImage(this.currentIndex);
  }
}

// Usage
const carousels = document.querySelectorAll(".carousel-images");
carousels.forEach(carouselElement => {
  new Carousel(carouselElement);
});


// Menu Burger venant de Oleg Sysolyatin --> https://codepen.io/osysolyatin/pen/BaOZqog

let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.nav');
let menuItem = document.querySelectorAll('.nav__link');
let li = document.querySelectorAll(".nav li");

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active-nav');
	menu.classList.toggle('active-nav');
})


menuItem.forEach (function(menuItem) {
  menuItem.addEventListener('click',function(){
          menuBtn.classList.toggle('active-nav');
          menu.classList.toggle('active-nav');
  })
})

li.forEach (function(li) {
  li.addEventListener('click',function(){
        menuBtn.classList.toggle('active-nav');
        menu.classList.toggle('active-nav');
  })
})



let hasScrolled = false;
window.addEventListener('scroll', function() {
 // Si l'utilisateur n'a pas encore scrollé
    if (!hasScrolled) {
        console.log("cc")
        // Marquer que le scroll a déjà été déclenché pour éviter des actions répétées
        hasScrolled = true;
    }

    else{
        setTimeout(() => {
            menuDesktop.classList.add("active-nav-desktop")
        }, 100);
    }
})

let isInTopZone = false;
window.addEventListener('mousemove', function(event) {
    
    if (event.clientY <= topLimit) {
        if (!isInTopZone) {
            console.log("La souris est dans la zone des 10% supérieurs.");
            isInTopZone = true;
            menuDesktop.classList.remove("active-nav-desktop")
        }
    } else {
        if (isInTopZone) {
            console.log("La souris est sortie de la zone des 10% supérieurs.");
            isInTopZone = false;
        }
    }
});