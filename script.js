
/*Jag skapade en funktion som fetchar alla måltider som finns i menyn och returnar
en array med alla måltider. Sen kallar jag på den nedanför här. Kolla i consolen och se
hur outputen vi får ser ut. Har även lagt in det i en try/catch, så om det skulle 
uppstå ett fel när vi fetchar våran json fil eller när vi kör våran response.json()
så kommer den direkt hoppa till catch och visa upp ett felmeddelande istället
för att fortsätta*/

async function getMeals() {
    try {
        const response = await fetch("./food.json");
        const data = await response.json();
        console.log(data.meals);
        return data.meals
    } catch (error) {
        console.log("There has been an error");
        console.log(error);
    }
};

getMeals();