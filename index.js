// Variable declarations
const text = document.getElementById("text");
const list = document.getElementById("list");
const search = document.getElementById("search");
const checkbox = document.getElementById("checkbox");
const quoteText = document.getElementById("demo");
text.value = "";
search.value = "";
let data = [];

const dailyTaskQuotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The secret of getting ahead is getting started. - Mark Twain",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "Procrastination makes easy things hard and hard things harder. - Mason Cooley",
  "Believe you can, and you're halfway there. - Theodore Roosevelt",
  "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The more I want to get something done, the less I call it work. - Richard Bach",
  "Don't count the days; make the days count. - Muhammad Ali",
  "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
  "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "Dream big and dare to fail. - Norman Vaughan",
];
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * dailyTaskQuotes.length);
  return dailyTaskQuotes[randomIndex];
}

/**
 * Function to retrieve saved data from localStorage and display it on page load.
 */
function main() {
  quoteText.textContent = getRandomQuote();
  const savedData = JSON.parse(localStorage.getItem("saveData"));
  if (savedData) {
    data = savedData;
    displayData(data);
  }
}

// Defining which method to call on page load
window.onload = main;

/**
 * Event listener to handle keypress events on the 'text' input field.
 * Calls the SearchButton function when the Enter key is pressed.
 */
text.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    SearchButton();
  }
});

/**
 * Event listener to handle input events on the 'search' input field.
 * Filters the data based on the search term and updates the display.
 *
 * @param {InputEvent} val - The input event object.
 */
search.addEventListener("input", function (val) {
  const searchTerm = val.target.value.toLowerCase();
  const searchData = data.filter((item) =>
    item.text.toLowerCase().includes(searchTerm)
  );
  displayData(searchData);
});

/**
 * Function executed on click of the search button.
 * Adds a new task to the 'data' array, stores it, and updates the display.
 */
function SearchButton() {
  let txtValue = text.value;
  if (txtValue) {
    let task = {
      isChecked: false,
      text: txtValue,
    };
    data.push(task);
    storeData();
    displayData(data);
  } else {
    alert("Please enter a task before adding.");
  }
}

/**
 * Function to display data on the user interface.
 * Clears the 'list' element and populates it with tasks from the 'data' array.
 *
 * @param {Object[]} data - The array of tasks to be displayed.
 */
function displayData(data) {
  list.innerHTML = "";
  if (data.length > 0) {
    data.forEach((item, index) => {
      const checklistID = `checklist${index}`;
      list.innerHTML += `
        <div id="${checklistID}" class="checklist" onclick="isDivChecked('${checklistID}')">
          <input type="checkbox" id="checkbox${index}" ${
        item.isChecked ? "checked" : ""
      } onclick="itemChecked(${index}, event)">
          <span id="textPosition" class=${
            item.isChecked ? "textDecoration" : ""
          }>${item.text}</span>
          <img class="imgSize" src="images/delete.png" alt="Delete" onclick="itemDelete(${index}, event)">
        </div>
      `;
    });
  } else {
    list.innerHTML = `<p class="noElementText">Add task</p>`;
  }
  text.value = "";
}

/**
 * Function to check or uncheck an item in the list by clicking on div.
 *
 * @param {number} index - The index of the item to be checked or unchecked.
 */
function isDivChecked(checklistID) {
  const index = parseInt(checklistID.replace("checklist", ""));
  const clickedElement = document.getElementById(checklistID);

  if (clickedElement.firstElementChild.attributes.getNamedItem("checked")) {
    data[index].isChecked = false;
  } else {
    data[index].isChecked = true;
  }
  storeData();
  displayData(data);
}

/**
 * Function to check or uncheck an item in the list.
 *
 * @param {number} index - The index of the item to be checked or unchecked.
 * @param {InputEvent} val - Capturing event to prevent event bubbling
 */
function itemChecked(index, event) {
  event.stopPropagation();
  if (!data[index].isChecked) {
    data[index].isChecked = true;
  } else {
    data[index].isChecked = false;
  }
  storeData();
  displayData(data);
}

/**
 * Function to delete an item from the list.
 *
 * @param {number} index - The index of the item to be deleted.
 * @param {InputEvent} val - Capturing event to prevent event bubbling
 */
function itemDelete(index, event) {
  event.stopPropagation();
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (isConfirmed) {
    data.splice(index, 1);
    storeData();
    displayData(data);
  }
}

/**
 * Function to store data in local storage.
 */
function storeData() {
  localStorage.setItem("saveData", JSON.stringify(data));
}
