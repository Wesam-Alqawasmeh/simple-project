"use strict";

const D = document;
const main = D.querySelector("main");

/**
 * Will render the cards.
 * @param {array} people people array will use to render the cards.
 */
const generateCards = (people) => {
  //adding cards logic
  const [cardsContainer] = D.getElementsByClassName("cards-container");
  people.map((person, index) => {
    let card = D.createElement("div");
    card.className = "card";
    cardsContainer.appendChild(card);

    //card image
    if (!person.image) {
      let avatar = D.createElement("span");
      avatar.className = "avatar";
      avatar.innerText = `${person.fname[0]}${person.lname[0]}`;
      card.appendChild(avatar);
    } else {
      let image = D.createElement("img");
      image.src = person.image;
      card.appendChild(image);
    }

    //card body
    let cardBody = D.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    //heading
    let heading = D.createElement("h3");
    heading.innerText = `${person.fname} ${person.lname}`;
    cardBody.appendChild(heading);

    //content
    let category = D.createElement("span");
    category.innerText = person.category;
    cardBody.appendChild(category);

    card.onclick = () => {
      generateModal(person, index);

      let modal = D.getElementById(`modal${index}`);
      modal.style.display = "block";

      let closeButton = D.getElementById(`close${index}`);
      closeButton.onclick = () => {
        modal.style.display = "none";
        main.removeChild(modal);
      };
    };
  });
};

/**
 * render simple modal for each person
 * @param {object} person
 * @param {number} index
 */
const generateModal = (person, index) => {
  let modal = D.createElement("div");
  modal.className = "modal";
  modal.id = `modal${index}`;
  main.appendChild(modal);

  let modalContent = D.createElement("div");
  modalContent.className = "modal-content";
  modal.appendChild(modalContent);

  let closeButton = D.createElement("span");
  closeButton.className = "close";
  closeButton.id = `close${index}`;
  closeButton.innerHTML = "&times;";
  modalContent.appendChild(closeButton);

  let content = D.createElement("p");
  content.innerText = `you are viewing ${person.fname} ${person.lname} short profile, this feature will be added soon. Thanks!`;
  modalContent.appendChild(content);
};

/**
 * Will generate the categories.
 * @param {array} categories state categories.
 * @param {Function} applyFilter function to filter the data.
 */
const generateCategories = ({ categories }, applyFilter) => {
  const [categoriesContainer] = D.getElementsByClassName("categories");

  //render categories
  categories.map((categoryName) => {
    let category = D.createElement("span");
    category.className = "category";
    category.innerText = categoryName;
    categoriesContainer.appendChild(category);

    category.onclick = () => applyFilter(category.innerText);
  });

  //button to remove filter
  let removeFilter = D.createElement("span");
  removeFilter.className = "category";
  removeFilter.innerText = "Clear filters";
  removeFilter.style.backgroundColor = "red";
  removeFilter.style.color = "white";
  categoriesContainer.appendChild(removeFilter);
  removeFilter.onclick = () => applyFilter(removeFilter.innerText);
};

export { generateCards, generateCategories };
