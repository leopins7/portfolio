const body = document.body;
const boutonsPopUp = document.querySelectorAll("button[data-popup-id]");
const popUp = document.querySelectorAll(".popup");
const popUpInfo = document.querySelectorAll(".popup-info");
const menuDesktop = document.querySelector(".ordinateur");
const windowHeight = window.innerHeight;
const nav = document.querySelector("nav");
let topLimit = windowHeight * 0.1;



// P O P   U P   P R O J E T S

//Ouverture popup
boutonsPopUp.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        const popupId = bouton.getAttribute("data-popup-id");
        const popup = document.querySelector(`.popup[data-popup-id="${popupId}"]`);
        popup.classList.remove("none");
        nav.classList.add("none")
        body.classList.add("noscroll");
        topLimit = -1;

        setTimeout(() => {
            popup.classList.add("apparition");
        }, 10);
    });
});

//Fermeture popup
popUp.forEach((popup) => {
    const blocPopup = popup.querySelector(".bloc-popup");
    const closeButton = popup.querySelector(".close"); 

    // Fermer la popup en cliquant en dehors du bloc de contenu
    popup.addEventListener("click", () => {
        popup.classList.remove("apparition");
        nav.classList.remove("none");
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
        nav.classList.remove("none");
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
    popUpFormations.forEach((popup) => {
        popup.classList.remove("apparition");
        setTimeout(() => {
            popup.classList.add("none");
        }, 200);
    });
});

const closeButton = document.querySelectorAll(".close");
closeButton.forEach((button) =>{
    button.addEventListener("click", () =>{
        popUpFormations.forEach((popup) => {
        popup.classList.remove("apparition");
        setTimeout(() => {
            popup.classList.add("none");
        }, 200);
    });
    })
})

// C A R R O U S E L
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

// N A V B A R

window.addEventListener("scroll", () => {
    if (window.scrollY === 0){
        menuDesktop.classList.remove("active-nav-desktop")
    } else {
        menuDesktop.classList.add("active-nav-desktop")
    }
});

let isInTopZone = false;
window.addEventListener('mousemove', function(event) {
    
    if (event.clientY <= topLimit) {
        if (!isInTopZone) {
            isInTopZone = true;
            menuDesktop.classList.remove("active-nav-desktop")
        }
    } else {
        if (isInTopZone) {
            isInTopZone = false;
        }
    }
});

// T A G S   S É L E C T I O N

const selectElement = document.getElementById("tags");
const uxui = document.querySelectorAll(".uxui");
const developpement = document.querySelectorAll(".developpement");
const graphisme = document.querySelectorAll(".graphisme");
const autre = document.querySelectorAll(".autre");
const divProjet = document.querySelectorAll(".section-projet");


function rowReverse(){
    divProjet.forEach((div) => {
        div.classList.remove("row-reverse");
    });

    let i = 0;
    divProjet.forEach((div) => {
        const computedStyle = window.getComputedStyle(div);
        if (computedStyle.display === "flex") { 
            i++;
            if (i % 2 === 0) {
                div.classList.add("row-reverse");
            }
        }
    });
}
rowReverse()

if (document.title === "Mes projets - PINSON Léo développeur web"){
    selectElement.addEventListener("change", (event) => {
        let tag = event.target.value;
        developpement.forEach((developpement) => { developpement.style.display = "none"; });
        uxui.forEach((uxui) => { uxui.style.display = "none"; });
        graphisme.forEach((graphisme) => { graphisme.style.display = "none"; });
        autre.forEach((autre) => { autre.style.display = "none"; });

        if (tag === "developpement") {
            developpement.forEach((developpement) => {
                developpement.style.display = "flex";
            });
        } else if (tag === "uxui") {
            uxui.forEach((uxui) => {
                uxui.style.display = "flex";
            });
        } else if (tag === "graphisme") {
            graphisme.forEach((graphisme) => {
                graphisme.style.display = "flex";
            });
        } else if (tag === "autre") {
            autre.forEach((autre) => {
                autre.style.display = "flex";
            });
        } else if (tag === "tous") {
            developpement.forEach((developpement) => {
                developpement.style.display = "flex";
            });
            uxui.forEach((uxui) => {
                uxui.style.display = "flex";
            });
            graphisme.forEach((graphisme) => {
                graphisme.style.display = "flex";
            });
            autre.forEach((autre) => {
                autre.style.display = "flex";
            });
        }
        rowReverse();
    });
}

// p i g e o n

const cards = [
  { start: "Le Coca-Cola était à l'origine", end: "un médicament contre les maux de tête." },
  { start: "Les escargots peuvent dormir pendant", end: "trois ans d'affilée." },
  { start: "La langue d'une baleine bleue pèse", end: "autant qu’un éléphant." },
  { start: "Le mot 'robot' vient du", end: "tchèque et signifie 'travail forcé'." },
  { start: "Il est illégal de posséder", end: "une seule grenouille en Australie occidentale." },
  { start: "Les papillons goûtent avec", end: "leurs pieds." },
  { start: "En Suisse, il est interdit de", end: "posséder un cochon d'Inde seul." },
  { start: "Le plus grand désert du monde est", end: "l’Antarctique." },
  { start: "La Tour Eiffel peut grandir de", end: "15 cm en été." },
  { start: "Le cœur d'une crevette est", end: "dans sa tête." },
  { start: "Les vaches ont", end: "des meilleurs amis et sont stressées quand elles sont séparées." },
  { start: "Le fruit le plus cultivé au monde est", end: "la banane." },
  { start: "Les carottes étaient à l’origine", end: "violettes." },
  { start: "Le jour où il pleut le plus sur Terre est", end: "le 4 juillet." },
  { start: "Les koalas ont", end: "des empreintes digitales presque humaines." },
  { start: "La Terre est plus proche du soleil en", end: "janvier qu’en juillet." },
  { start: "Les requins existent depuis", end: "avant les arbres." },
  { start: "Une crevette-mante peut", end: "casser une vitre d’aquarium." },
  { start: "Napoléon avait", end: "une peur bleue des chats." },
  { start: "Il est possible de faire du pop-corn avec", end: "des grains de sable chauffés." }
];

let currentIndex = 0;

function nextCard() {
  currentIndex = (currentIndex + 1) % cards.length;
  document.getElementById("start-pigeon").textContent = cards[currentIndex].start;
  document.getElementById("end-pigeon").textContent = cards[currentIndex].end;
}

// Initialisation
window.onload = () => {
  document.getElementById("start-pigeon").textContent = cards[0].start;
  document.getElementById("end-pigeon").textContent = cards[0].end;
};

