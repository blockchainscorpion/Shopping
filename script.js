// Collating all of the variables & Resources needed for the functionality of the form. This will make it easier to access them within multiple functions:
// Create a function & button (itemsPurchased) that saves a list of the items purchased to a document/folder, and each month adds the items and their total price to an ipfs file.
const form = document.getElementById('item-form'); // querySelector() would also work perfectly well.
const input = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const button = document.getElementById('button'); // Add a feature to make the button dynamic when mouseover and click events happen.
const clearButton = document.getElementById('clear');
const filter = document.getElementById('filter');

// Functions

const addItem = (e) => {
  e.preventDefault();

  const newItem = input.value;
  const li = document.createElement('li');
  const button = createButton('remove-item btn-link text-red');

  // Validate input
  if (newItem.value === '') {
    error('Add An item');
    return;
  } else {
    li.appendChild(document.createTextNode(newItem));

    li.appendChild(button);
    // Adding list items to the page
    itemList.appendChild(li);
  }

  checkUI();
  input.value = '';
  // console.log(li);
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

checkUI();

// Event Listeners

form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem);

clearButton.addEventListener('click', clearAll);

// items.addEventListener('click', checkUI);

// button.addEventListener('click', createButton);

// input.addEventListener("click", onInput);

// button.addEventListener("click", onClick);
