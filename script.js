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
  location.reload();
});

//Javascript för att minska headern --Johan
window.onscroll = function() {scrollFunction()};

function scrollFunction(){
    
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        document.getElementById("meny").style.fontSize ="4rem";
        document.getElementById("logo").style.width ="110px";
        document.getElementById("head_container").style.padding ="11rem";
    }
    else{
        document.getElementById("meny").style.fontSize ="8rem";
        document.getElementById("logo").style.width ="225px";
        document.getElementById("head_container").style.padding ="18rem";
    }
}

//funktion för att sortera matdatan efter pris --Alma
function sortDishesByPrice(low) { 
  foodData.sort((a,b) => { //sort metod på foodData array som sorterar elementen med en jämförelsefunktion
    const priceA = parseFloat(a.price.replace(" kr", "")); 
    const priceB = parseFloat(b.price.replace(" kr", ""));
    
    if(low) { //om low är sant, sorteras priset från lägre till högre
      return priceA - priceB;
    }else { // om low är falskt, sorteras priser från högre till lägre
      return priceB - priceA;
    }
  });
}

const gridContainer = document.querySelector(".grid-container"); //hämtar html-element och lagrar i variabeln gridContainer

async function createBoxes() {
  const foodData = await getFoodData(); // Hämta matdata från JSON-filen

  // Loopa igenom varje maträtt och skapa ett card för varje rätt
  foodData.forEach((data) => {
    const box = document.createElement("div"); //vit box
    box.className = "white-card";

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

    gridContainer.appendChild(box); //elementen läggs till i gridContainer  
  });
}

 function updateBoxes(data) { //funktion för att uppdatera boxarna av maträttsdata
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

priceFilterSelect.addEventListener("change", () => { //lyssnar på ändring som användaren gör på sortera knapp
  const selectOption = priceFilterSelect.value;

  if(selectOption === "low") { //beroende på val av användaren, anropas sortDishesByPrice funktionen med antingen sant eller falskt.
    sortDishesByPrice(true);
  }else if(selectOption === "high") {
    sortDishesByPrice(false);
  }
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  updateBoxes(foodData); //anropar funktion för att uppdatera maträttsboxarna 
  });
 
// Funktion för att skapa maträttsbox
function createDishBox(data) {
  const box = document.createElement("div");
  box.className = "white-card";

  const img = document.createElement("img");
  img.src = data.img;
  box.appendChild(img);

  const title = document.createElement("div");
  title.className = "dish-title";
  title.textContent = data.dish.swe;
  box.appendChild(title);

  const price = document.createElement("div");
  price.className = "dish-price";
  price.textContent = data.price;
  box.appendChild(price);

  const description = document.createElement("div");
  description.className = "dish-description";
  description.textContent = data.description.swe;
  box.appendChild(description);

  return box;
} 


