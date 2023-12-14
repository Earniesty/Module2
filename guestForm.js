//Thanachanok Banjongjinda 65130500025
import { createGuestList } from "./data/guestdata.js";
// import { GuestManagement } from './lib/GuestManagement.js'
// const {addNewGuest, getAllGuests, removeGuest, searchGuests} = new GuestManagement()
// const createGuestList = require("./data/guestdata.js");

const guestList = createGuestList();
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList;

  // 1. register event for searching and adding
  function registerEventHandling() {
    const filterInput = document.getElementById("search-input");
    filterInput.addEventListener("keyup", (event) => {
      event.preventDefault();
      searchGuest(event);
    });

    const filterAdd = document.getElementById("add-guest-btn");
    filterAdd.addEventListener("click", (e) => {
      e.preventDefault();
      addGuest();
    });
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const displayArea = document.getElementById("display-area");
    let divNew = document.createElement("div");
    let span1 = document.createElement("span");
    // span1.textContent = `${guestItem.firstName} ${guestItem.lastName}`
    span1.innerHTML = guestItem.firstname + " " + guestItem.lastname;

    let span2 = document.createElement("span");
    span2.setAttribute("class", "remove-icon");
    span2.setAttribute("id", `${guestItem.firstName}-${guestItem.lastName}`);
    span2.style.cursor = "pointer";
    span2.style.color = "red";
    span2.textContent = "[X]";
    span2.addEventListener('click' , removeGuest)

    displayArea.appendChild(divNew);
    divNew.appendChild(span1);
    divNew.appendChild(span2);
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const displayArea = document.getElementById("display-area");
    displayArea.textContent = "";
    guestResult.forEach((element) => {
      displayGuest(element);
    });
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    const filterInput = document.getElementById("search-input");
    const filterGuest = guests.searchGuests(filterInput.value);
    displayGuests(filterGuest);
  }

  // 5. Function to add a new guest
  function addGuest() {
    const firstnameInput = document.getElementById("firstname-input");
    const lastnameInput = document.getElementById("lastname-input");
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    if (firstname === " " || lastname === " ") {
      firstname = undefined;
      lastname = undefined
    }
    guests.addNewGuest(firstname, lastname);
    const newGuest = { firstname, lastname };
    firstnameInput.value = "";
    lastnameInput.value = "";
    displayGuest(newGuest);
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    // const eventId = event.target.id
    // const splitName = eventId.split('-')
    // const fname = splitName[0]
    // const lname = splitName[1]
    // const deleteGuest =  {firstname: fname, lastname: lname}
    // guests.removeGuest(deleteGuest)
    // const removeDiv = event.target.parentElement // event.target == span , event.target.parentElement == div
    // removeDiv.remove()

    const displayArea = document.getElementById('display-area')
    //const searchInput = document.getElementById('search-input').value
    displayArea.replaceChildren()
    guests.removeGuest({
      firstname: event.target.parentElement.children[0].textContent.split(' ')[0], 
      lastname: event.target.parentElement.children[0].textContent.split(' ')[1]
    })
    //displayGuests(guests.getAllGuests())
    displayGuests(guests.searchGuests(document.getElementById('search-input').value))
  }
  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest,
  };
}

// module.exports = guestForm;
export { guestForm };
const { registerEventHandling, displayGuests } = guestForm();
registerEventHandling();
displayGuests(guestList.getAllGuests());
