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

//Byta språk
document.getElementById("byta").addEventListener("click",() =>{
  document.getElementById("byta").innerHTML = foodData[0].dish.en;

  if(document.querySelector("aside").classList.contains("swe")){
    /**Kollar efter id och byter sedan texten från langData beroende på om aside elementet har klassen swe eller eng */
    document.getElementById("reset-filter").textContent = langData["eng"].title;
    document.getElementById("low-to-high").textContent = langData["eng"].low_to_high;
    document.getElementById("high-to-low").textContent = langData["eng"].high_to_low;
    document.getElementById("price").textContent = langData["eng"].price;

    document.getElementById("category").textContent = langData["eng"].category;
    document.getElementById("label_vego").innerHTML = langData["eng"].vego;
    document.getElementById("label_chicken").textContent = langData["eng"].chicken;

    document.getElementById("label_pork").textContent = langData["eng"].pork;
    document.getElementById("label_beef").textContent = langData["eng"].meat;
    document.getElementById("label_fish").textContent = langData["eng"].fish;

    document.getElementById("allergy_id").innerHTML = langData["eng"].allergy;
    document.getElementById("label_gluten").textContent = langData["eng"].gluten;
    document.getElementById("label_lactose").textContent = langData["eng"].lactose;

    document.querySelector("aside").classList.remove("swe");
    document.querySelector("aside").classList.add("eng");

  }else if(document.querySelector("aside").classList.contains("eng")){

    document.getElementById("reset-filter").textContent = langData["swe"].title;
    document.getElementById("low-to-high").textContent = langData["swe"].low_to_high;
    document.getElementById("high-to-low").textContent = langData["swe"].high_to_low;
    document.getElementById("price").textContent = langData["swe"].price;

    document.getElementById("category").textContent = langData["swe"].category;
    document.getElementById("label_vego").textContent = langData["swe"].vego;
    document.getElementById("label_chicken").textContent = langData["swe"].chicken;

    document.getElementById("label_pork").textContent = langData["swe"].pork;
    document.getElementById("label_beef").textContent = langData["swe"].meat;
    document.getElementById("label_fish").textContent = langData["swe"].fish;

    document.getElementById("allergy_id").textContent = langData["swe"].allergy;
    document.getElementById("label_gluten").textContent = langData["swe"].gluten;
    document.getElementById("label_lactose").textContent = langData["swe"].lactose;

    document.querySelector("aside").classList.remove("eng");
    document.querySelector("aside").classList.add("swe");
  }
})
const langData ={
  "eng":{
    "title": "Reset filter",
    "low_to_high": "Low To High",
    "high_to_low": "High to Low",
    "price": "Price",
    "category":"Category",
    "vego": "Vegetarien",
    "chicken" : "Chicken",
    "pork": "Pork",
    "meat": "Beef",
    "fish": "Fish", 
    "allergy": "Allergy",
    "gluten": "Glutenfree",
    "lactose": "Lactosfree"
  },
  "swe":{
    "title": "Återställ filter",
    "low_to_high": "Lågt till Högt",
    "high_to_low": "Högt till lågt",
    "price": "Pris",
    "category": "Kategorier",
    "vego": "Vegetariskt",
    "chicken" : "Kyckling",
    "pork": "Fläsk",
    "meat": "Biff",
    "fish": "Fisk",
    "allergy": "Allergier",
    "gluten": "Glutenfri",
    "lactose": "Laktosfri"
  }
}


