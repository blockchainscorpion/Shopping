// Collating all of the variables & Resources needed for the functionality of the form. This will make it easier to access them within multiple functions:
// Create a function & button (itemsPurchased) that saves a list of the items purchased to a document/folder, and each month adds the items and their total price to an ipfs file.
const form = document.getElementById('item-form'); // querySelector() would also work perfectly well.
const input = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const button = document.getElementById('button'); // Add a feature to make the button dynamic when mouseover and click events happen.
const clearButton = document.getElementById('clear');
const filter = document.getElementById('filter');
const formBtn = form.querySelector('button');
let isEditMode = false;

// Functions

// Display the previously saved items on initial page load
const displayItems = () => {
  const itemsFromStorage = getItemFromStorage(); // Get the items from the local storage

  itemsFromStorage.forEach((item) => addItemToDOM(item)); // Add any items from storage to the DOM

  checkUI(); // Check if the list is empty or not
};

// What to do when user click's submit/add item
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

// Add items to the DOM (page)
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

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

// A separate function to create a button element - This makes it easier to reuse in other places. ↓

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};
// Add items to local storage so they can be accessed in future sessions
const addItemToStorage = (item) => {
  // Adding list items to the storage
  let itemsFromStorage = getItemFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert it to a JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// Retreive previous session items from local storage
const getItemFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = Object.values(JSON.parse(localStorage.getItem('items')));
  }

  return itemsFromStorage;
};

// (line 91): // Needs to be explicitly converted from an object to an array, otherwise gives an error saying : "script.js:16 Uncaught TypeError: itemsFromStorage.forEach is not a function at HTMLDocument.displayItems (script.js:16:20)"

// What happens when the user clicks on the delete button for an individual item
const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

// A function to enable editing the items

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((item) => item.classList.remove('edit-mode')); // Ensures that only one item is in edit mode at a time

  item.classList.add('edit-mode'); // Interacting directly with the css file to implement color changes onClick.

  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';

  formBtn.style.backgroundColor = 'green';

  input.value = item.textContent;
};

// A separate function to delete a button element - Using event delegation ↓
const removeItem = (item) => {
  if (confirm('Are You Sure???')) {
    // Remove item from DOM / page
    item.remove();

    // Remove the item from local storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemFromStorage();

  console.log(itemsFromStorage);

  // Filter out the item that needs to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Create a new array and set to local storage data, overwriting the previous data
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// Clear All items button function
const clearAll = () => {
  // itemList.innerHTML = '';

  // Other method:
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from local storage
  // localStorage.clear(); // Removes ALL items from local storage. It works in this instance, but becareful in other instances where i may want to keep certain info in local storage.

  // Removes the specific list items from local storage
  localStorage.removeItem('items');

  checkUI();
};

// Make the filter form functional:
const filterItems = (e) => {
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
};

// Making the page more dynamic by hiding certain features when the list is unpopulated

const checkUI = () => {
  const items = itemList.querySelectorAll('li'); // If left in the global scope, it is unchangable and unaffected by this function because i've set it as a constant variable.
  // console.log(items);
  if (items.length === 0) {
    clearButton.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    filter.style.display = 'block';
  }
};

// Initialize app - A neater alternative to having the event listeners in the global scope.

const init = () => {
  // Event Listeners

  form.addEventListener('submit', onAddItemSubmit);

  itemList.addEventListener('click', onClickItem);

  clearButton.addEventListener('click', clearAll);

  filter.addEventListener('input', filterItems);

  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
};

init();
