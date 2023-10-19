/*Denna funktionen hämtar datan i våran json fil och
returnar hela arrayen. Jag har även lagt det i try/catch
block eftersom om det skulle ske ett fel när man läser datan
så kommer vi direkt hoppa till catch där vi skriver ut felmeddelandet
och kör inte klart hela try blocket om det blir fel*/
async function getFoodData() {
  try {
    const response = await fetch("./food.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Det har hänt något fel!");
    console.log(error);
  }
}
/*Här sparar vi våran data i en variabel. Vi kan använda await utanför
en async funktion eftersom vi har lagt till type:"module" i våran
script tag i html. Detta gör så att den väntar innan den fått ett
svar från våran funktion innan den körs. 

Om vi vill använda datan är det bara att manipulera foodData som är en
array*/
const foodData = await getFoodData();

//simple function for reseting the filters, using simple location.reload when "clicked"(Daniel)
const resetFilter = document.getElementById("reset-filter");
resetFilter.addEventListener("click", () => {
  window.location.replace(window.location.href);
});
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  location.reload();
});

//Javascript för att minska headern --Johan
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("meny").style.fontSize = "4rem";
    document.getElementById("logo").style.height = "120px";
    document.getElementById("logo").style.width = "110px";
    document.getElementById("logo").style.top = "0.5rem";
    document.getElementById("head_container").style.padding = "11rem";
    document.querySelector(".aside-menu-container").style.paddingTop = "11rem";
    document.querySelector(".aside-menu-container").style.width = "16rem";
    document.getElementById("price-filter").style.fontSize = "15px";
    document.getElementById("reset-filter").style.fontSize = "25px";
    document.getElementById("reset-filter").style.width = "190px";
    document.querySelector(".version-aside-container").style.paddingTop =
      "10rem";

    document.querySelector(".footer").style.padding = "0.4rem";
    document.querySelector(".footer").style.opacity = "0.7";
    document.getElementById("price-filter-mobile").style.top = "15rem";
    document.getElementById("reset-button").style.top = "11rem";
    document.getElementById("hide-button").style.top = "6.5rem";
    document.getElementById("social-click-out").style.top = "7rem";
  } else {
    document.getElementById("meny").style.fontSize = "7rem";
    document.getElementById("logo").style.top = "1.2rem";
    document.getElementById("logo").style.width = "150px";
    document.getElementById("logo").style.height = "170px";
    document.getElementById("head_container").style.padding = "16rem";
    document.querySelector(".aside-menu-container").style.paddingTop =
      "15.5rem";
    document.querySelector(".aside-menu-container").style.width = "20rem";
    document.getElementById("price-filter").style.fontSize = "17px";
    document.getElementById("reset-filter").style.fontSize = "27px";
    document.getElementById("reset-filter").style.width = "300px";
    document.querySelector(".version-aside-container").style.paddingTop =
      "15rem";
    document.getElementById("price-filter-mobile").style.top = "20rem";
    document.getElementById("reset-button").style.top = "16rem";

    document.querySelector(".footer").style.padding = "0.7rem";
    document.querySelector(".footer").style.opacity = "0.9";
    document.getElementById("hide-button").style.top = "11.5rem";
    document.getElementById("social-click-out").style.top = "12rem";
  }
}

//funktion för att sortera matdatan efter pris --Alma
function sortDishesByPrice(low) {
  foodData.sort((a, b) => {
    //sort metod på foodData array som sorterar elementen med en jämförelsefunktion
    const priceA = parseFloat(a.price.replace(" kr", ""));
    const priceB = parseFloat(b.price.replace(" kr", ""));

    if (low) {
      //om low är sant, sorteras priset från lägre till högre
      return priceA - priceB;
    } else {
      // om low är falskt, sorteras priser från högre till lägre
      return priceB - priceA;
    }
  });
}

const gridContainer = document.querySelector(".grid-container"); //hämtar html-element och lagrar i variabeln gridContainer

async function createBoxes() {
  const foodData = await getFoodData(); // Hämta matdata från JSON-filen

  // Loopa igenom varje maträtt och skapa ett card för varje rätt
  foodData.forEach((data) => {
    createDishBox(data);
  });
}

function updateBoxes(data) {
  //funktion för att uppdatera boxarna av maträttsdata
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild); //rensa bort tidigare maträttsboxar
  }

  data.forEach((item) => {
    const box = createDishBox(item);
    gridContainer.appendChild(box);
  });
}
// Anropa funktionen för att skapa boxar när sidan laddas
createBoxes();

const priceFilterSelect = document.getElementById("price-filter");

priceFilterSelect.addEventListener("change", () => {
  //lyssnar på ändring som användaren gör på sortera knapp
  const selectOption = priceFilterSelect.value;

  if (selectOption === "low") {
    //beroende på val av användaren, anropas sortDishesByPrice funktionen med antingen sant eller falskt.
    sortDishesByPrice(true);
  } else if (selectOption === "high") {
    sortDishesByPrice(false);
  }
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  updateBoxes(foodData); //anropar funktion för att uppdatera maträttsboxarna
});

// Skapade ett till price-filter för mobil versionen //Daniel
const priceFilterSelectMobile = document.getElementById("price-filter-mobile");
priceFilterSelectMobile.addEventListener("change", () => {
  const selectOption = priceFilterSelectMobile.value;

  if (selectOption === "low-mobile") {
    sortDishesByPrice(true);
  } else if (selectOption === "high-mobile") {
    sortDishesByPrice(false);
  }
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  updateBoxes(foodData);
});

// Funktion för att skapa maträttsbox
function createDishBox(data) {
  const box = document.createElement("div"); //vit box
    box.className = "white-card";

    //Kollar om måltiden inehåller gluten och lägger isåfall
    //till detta i id
    if (data.gluten === false && data.lactose === false) {
      box.id = "glutenfree" + "lactosefree" + data.category + "-card";
    } else if (data.gluten === false) {
      box.id = "glutenfree" + data.category + "-card";
    } else if (data.lactose === false) {
      box.id = "lactosefree" + data.category + "-card";
    } else {
      box.id = data.category + "-card";
    }

    const img = document.createElement("img"); //bild
    img.src = data.img;
    box.appendChild(img);

    const title = document.createElement("div"); //titel
    title.className = "dish-title";
    title.textContent = data.dish.swe;
    box.appendChild(title);

    const price = document.createElement("div"); //pris
    price.className = "dish-price";
    price.textContent = data.price;
    box.appendChild(price);

    const description = document.createElement("div"); //beskrivning
    description.className = "dish-description";
    description.textContent = data.description.swe;
    box.appendChild(description);

    if (data.gluten === false) {
      const glutenFree = document.createElement("p");
      glutenFree.className = "gluten-free";
      glutenFree.textContent = "Glutenfri";
      box.appendChild(glutenFree);
    }

    if (data.lactose === false) {
      const lactoseFree = document.createElement("p");
      lactoseFree.className = "lactose-free";
      lactoseFree.textContent = "Laktosfri";
      box.appendChild(lactoseFree);
    }

    gridContainer.appendChild(box); //elementen läggs till i gridContainer
  
    return box;
}

 
//Byta språk
document.getElementById("byta").addEventListener("click", () => {
  document.getElementById("byta").innerHTML = foodData[0].dish.en;

  if (document.querySelector("aside").classList.contains("swe")) {
    /**Kollar efter id och byter sedan texten från langData beroende på om aside elementet har klassen swe eller eng */
    document.getElementById("reset-filter").textContent = langData["eng"].title;
    document.getElementById("low-to-high").textContent =
      langData["eng"].low_to_high;
    document.getElementById("high-to-low").textContent =
      langData["eng"].high_to_low;
    document.getElementById("price").textContent = langData["eng"].price;

    document.getElementById("category").textContent = langData["eng"].category;
    document.getElementById("label_vego").innerHTML = langData["eng"].vego;
    document.getElementById("label_chicken").textContent =
      langData["eng"].chicken;

    document.getElementById("label_pork").textContent = langData["eng"].pork;
    document.getElementById("label_beef").textContent = langData["eng"].meat;
    document.getElementById("label_fish").textContent = langData["eng"].fish;

    document.getElementById("allergy_id").innerHTML = langData["eng"].allergy;
    document.getElementById("label_gluten").textContent =
      langData["eng"].gluten;
    document.getElementById("label_lactose").textContent =
      langData["eng"].lactose;

    document.getElementById("byta").textContent = "Change to Swedish";
    document.querySelector("aside").classList.remove("swe");
    document.querySelector("aside").classList.add("eng");
  } else if (document.querySelector("aside").classList.contains("eng")) {
    document.getElementById("reset-filter").textContent = langData["swe"].title;
    document.getElementById("low-to-high").textContent =
      langData["swe"].low_to_high;
    document.getElementById("high-to-low").textContent =
      langData["swe"].high_to_low;
    document.getElementById("price").textContent = langData["swe"].price;

    document.getElementById("category").textContent = langData["swe"].category;
    document.getElementById("label_vego").textContent = langData["swe"].vego;
    document.getElementById("label_chicken").textContent =
      langData["swe"].chicken;

    document.getElementById("label_pork").textContent = langData["swe"].pork;
    document.getElementById("label_beef").textContent = langData["swe"].meat;
    document.getElementById("label_fish").textContent = langData["swe"].fish;

    document.getElementById("allergy_id").textContent = langData["swe"].allergy;
    document.getElementById("label_gluten").textContent =
      langData["swe"].gluten;
    document.getElementById("label_lactose").textContent =
      langData["swe"].lactose;

    document.getElementById("byta").textContent = "Byt till Engelska";
    document.querySelector("aside").classList.remove("eng");
    document.querySelector("aside").classList.add("swe");
  }
});

const langData = {
  eng: {
    title: "Reset filter",
    low_to_high: "Low To High",
    high_to_low: "High to Low",
    price: "Price",
    category: "Category",
    vego: "Vegetarien",
    chicken: "Chicken",
    pork: "Pork",
    meat: "Beef",
    fish: "Fish",
    allergy: "Allergy",
    gluten: "Glutenfree",
    lactose: "Lactosfree",
  },
  swe: {
    title: "Återställ filter",
    low_to_high: "Lågt till Högt",
    high_to_low: "Högt till lågt",
    price: "Pris",
    category: "Kategorier",
    vego: "Vegetariskt",
    chicken: "Kyckling",
    pork: "Fläsk",
    meat: "Biff",
    fish: "Fisk",
    allergy: "Allergier",
    gluten: "Glutenfri",
    lactose: "Laktosfri",
  },
};

//I denna arrayen sparas våra aktiva filter som vi valt
let activeFilters = [];

//tar in alla checkboxes
const allCheckboxes = document.querySelectorAll(".checkboxes");

//Lägger en eventlistener för varje checkbox
allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (toggle) => {

    //Denna if satsen kickar in om vi väljer att "kryssa i" filtret
    if(toggle.target.checked){

      /*Om man trycker i vego kommer alla andra köttfilter filtreras bort*/
      if(toggle.target.id === "vego") {
        allCheckboxes.forEach(box => {
          if(box.id === "vego" | box.id === "gluten" | box.id === "lactose") {
            return
          } else {
            if(box.checked) {
              box.click();
            }
          }
        })
      }

      //Lägger till id på checkboxen(samma som kategorierna)
      activeFilters.push(toggle.target.id)
    } else {

        /*Annars(om vi "kryssar ur" boxen) filtrera vi bort
        den tryckta boxens id och lägger till den i en ny 
        array och byter sedan plats på den och den "vanliga"*/
      let newArray = activeFilters.filter((arrayItem) => {
        return arrayItem !== toggle.target.id;
      });
      activeFilters = newArray;
    }

    /*Kör denna funktionen efter vi lagt till eller tagit bort
    något ur våran array. Denna ska även skickas in en parameter
    av en array som vi gör här med våra aktiva filter*/
    displayFilteredMeals(activeFilters);
  });
});

//tar in en array av våra aktuella filter
function displayFilteredMeals(filters) {
  //Tar in alla våra divar med maträtterna
  const mealDivs = document.querySelectorAll(".white-card");

  /*Kollar om våran aktiva filter array är tom, om den är det
  så sätter vi display:flex på alla divar(gör den synliga)*/
  if (filters.length === 0) {
    mealDivs.forEach((meal) => {
      meal.style.display = "flex";
    });
  } else {
    mealDivs.forEach((div) => {
      /*Om den inte är tom loopar vi egenom alla divar och kollar
      om något sparat filter stämmer med den aktuella diven och 
      kommer tillbaka sann eller falskt beroende på  */
      const matchesAtLeastOneFilter = filters.some((filter) =>
        div.id.includes(filter)
      );
      /*Om den är true(stämmer överens med minst ett filter) så
      sätter vi den synlig(display:flex) annars sätter vi den 
      osynlig(display:none)*/
      if (matchesAtLeastOneFilter) {
        div.style.display = "flex";
      } else {
        div.style.display = "none";
      }
    });
  }
}
//Function för att gömma mobil version filtret
const btnHide = document.getElementById("btn-hide");
const asideContainer = document.querySelector(".version-aside-container");
const btnFilterText = document.getElementById("filter-drop");
let isHidden = false;

btnHide.addEventListener("click", () => {
  if (isHidden) {
    asideContainer.style.transform = "translateY(0rem)";
    btnHide.style.transform = "rotate(360deg)";
    // default vy
  } else {
    asideContainer.style.transform = "translateY(-25rem)";
    btnHide.style.transform = "rotate(180deg)";
  }
  isHidden = !isHidden; // om ishidden är false blir den true och om ishidden är true blir den false osv.
});

//Funktion för att gömma footern i alla lägen
let Hidden = false;
const btnSocials = document.getElementById("social-click-out");
btnSocials.addEventListener("click", () => {
  if (Hidden) {
    document.querySelector(".footer").style.transform = "translateX(0rem)";
    //default vy
  } else {
    document.querySelector(".footer").style.transform = "translateX(-220rem)";
  }
  Hidden = !Hidden; // om hidden är false blir den true och om hidden är true blir den false osv.
});
