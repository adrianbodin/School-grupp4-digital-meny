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
    document.getElementById("logo").style.width = "110px";
    document.getElementById("head_container").style.padding = "11rem";
    document.getElementById("aside-menu").style.paddingTop = "11rem";
    document.getElementById("aside-menu").style.width = "16rem";
    document.getElementById("price-filter").style.fontSize = "15px";
    document.getElementById("reset-filter").style.fontSize = "25px";
    document.getElementById("reset-filter").style.width = "190px";
    document.querySelector(".version-aside-container").style.paddingTop =
      "12rem";
  } else {
    document.getElementById("meny").style.fontSize = "8rem";
    document.getElementById("logo").style.width = "225px";
    document.getElementById("head_container").style.padding = "18rem";
    document.getElementById("aside-menu").style.paddingTop = "18rem";
    document.getElementById("aside-menu").style.width = "20rem";
    document.getElementById("price-filter").style.fontSize = "17px";
    document.getElementById("reset-filter").style.fontSize = "27px";
    document.getElementById("reset-filter").style.width = "300px";
    document.querySelector(".version-aside-container").style.paddingTop =
      "20rem";
  }
}

console.log(foodData);

const slider = document.querySelector(".carousel-wrapper");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.classList.add("action");
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("action");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("action");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});
