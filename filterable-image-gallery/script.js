//Select all filter buttons and filterable cards
const fillterButtons = document.querySelectorAll(".fillter_buttons button");
const fillterableCards = document.querySelectorAll(".fillterable_cards .card");

//Define the filterCards function

const filterCards = e => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  //Iterate over each filterable card
  fillterableCards.forEach((card) => {
    //Add 'hide' class to hide the card initially
    card.classList.add("hide");
    //Check if the card matchesthe selected filter or "all" is selected
    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    }
  });
};

// Add click event listener to each fillter button

fillterButtons.forEach( button => {
  button.addEventListener("click", filterCards);
});
