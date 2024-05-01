// Collating all of the variables & Resources needed for the functionality of the form. This will make it easier to access them within multiple functions:
// Create a function & button (itemsPurchased) that saves a list of the items purchased to a document/folder, and each month adds the items and their total price to an ipfs file.
const form = document.getElementById('item-form'); // querySelector() would also work perfectly well.
const input = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const button = document.getElementById('button'); // Add a feature to make the button dynamic when mouseover and click events happen.
const clearButton = document.getElementById('clear');
const filter = document.getElementById('filter');

// Functions

// Display the previously saved items on initial page load
const displayItems = () => {
  const itemsFromStorage = getItemFromStorage(); // Get the items from the local storage

  itemsFromStorage.forEach((item) => addItemToDOM(item)); // Add any items from storage to the DOM

  checkUI(); // Check if the list is empty or not
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = input.value; // Defining that the user input value = a new item.

  // Validate input
  if (newItem === '') {
    alert('Add An item');
    return;
  }

  // Adding list items to the page as an individual element
  addItemToDOM(newItem);
  // Adding list items to the local storage (never add sensitive details to local storage)
  addItemToStorage(newItem);

  // Clear input
  checkUI();
  input.value = '';
};

const addItemToDOM = (item) => {
  // Turned the add item functionality into a separate function, which is called in the initial function
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  // Adding list items to the page
  itemList.appendChild(li);
};

// A separate function to create a button element - This makes it easier to reuse in other places. ↓

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// A separate function to create a button element - This makes it easier to reuse in other places. ↓

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

const addItemToStorage = (item) => {
  // Adding list items to the storage
  const itemsFromStorage = getItemFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert it to a JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
};

// A separate function to delete a button element - Using event delegation ↓
function removeItem(e) {
  // console.log(e.target.parentElement.classList);
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are You Sure?') === true) {
      e.target.parentElement.parentElement.remove(); // THis goes to the paret element of remove-item (the actual list item, then delets that)

      checkUI();
    }
  }
}

// Clear All items button function
function clearAll() {
  // itemList.innerHTML = '';

  // Other method:
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// Make the filter form functional:
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const key = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(key) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Making the page more dynamic by hiding certain features when the list is unpopulated

function checkUI() {
  const items = itemList.querySelectorAll('li'); // If left in the global scope, it is unchangable and unaffected by this function because i've set it as a constant variable.
  // console.log(items);
  if (items.length === 0) {
    clearButton.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    filter.style.display = 'block';
  }
}

// Initialize app - A neater alternative to having the event listeners in the global scope.

const init = () => {
  // Event Listeners

  form.addEventListener('submit', onAddItemSubmit);

  itemList.addEventListener('click', removeItem);

  clearButton.addEventListener('click', clearAll);

  filter.addEventListener('input', filterItems);

  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();

  // filterItems();

  // items.addEventListener('click', checkUI);

  // button.addEventListener('click', createButton);

  // input.addEventListener("click", onInput);

  // button.addEventListener("click", onClick);
};

init();
