import { generateCards, generateCategories } from "./assets/utils.js";

const state = {
  categories: ["Category 1", "Category 2", "Category 3"],
  filter: null,
  filteredPeople: [],
  people: [],
  status: "empty",
};

const [cardsContainer] = document.getElementsByClassName("cards-container");
//Load before fetch
cardsContainer.innerHTML = "<h2>Loading...</h2>";

//fetch data
state.people = await fetch(
  "https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22Category%201%22,%20%22Category%202%22,%22Category%203%22]&pretty=true"
)
  .then((data) => data.json())
  .then((people) => {
    cardsContainer.innerHTML = "";
    return people;
  })
  .catch((error) => {
    cardsContainer.innerHTML = "<h2>Failed to fetch</h2>";
    cardsContainer.style.color = "red";
    console.log(error.message);
  });

// filtration logic
const applyFilter = (category) => {
  cardsContainer.innerHTML = ""; //remove old cards

  state.filteredPeople = state.people.filter(
    (person) => person.category === category
  );

  if (category !== "Clear filters") {
    state.filter = category;
    generateCards(state.filteredPeople);
  } else {
    state.filter = null;
    generateCards(state.people);
  }
};

generateCards(state.people); //render people cards
generateCategories(state, applyFilter); //render categories
