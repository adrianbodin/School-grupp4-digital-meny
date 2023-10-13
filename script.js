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

console.log(foodData)


