// Collating all of the variables & Resources needed for the functionality of the form. This will make it easier to access them within multiple functions:

const form = document.getElementById('item-form'); // querySelector() would also work perfectly well.
const input = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const button = document.querySelector('button'); // Add a feature to make the button dynamic when mouseover and click events happen.
const clearButton = document.getElementById('clear');
const filter = document.getElementsByClassName('filter');

// Functions

const addItem = (e) => {
  e.preventDefault();

  const newItem = input.value;

  // Validate input
  if (newItem.value === '') {
    alert('Please add item');
    return;
  }
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
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
    e.target.parentElement.parentElement.remove(); // THis goes to the paret element of remove-item (the actual list item, then delets that)
  }
}

// Clear All items button function
function clearAll() {
  itemList.innerHTML = '';

  // Other method:
  // while (itemList.firstChild) {
  //   itemList.removeChild(itemList.firstChild);
  // }
}

// Make Certain fields only appear when there is text / items in the list.

function listPopulated(e) {
  // onload(itemList === (item) ? filter.hide());
  onload(
    itemList === item
      ? (filter.style.display = 'none')
      : (filter.style.display = 'red')
  );
  // input.style.innerHTML.color = 'red';
}

// Event Listeners

form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem);

clearButton.addEventListener('click', clearAll);

filter.addEventListener('click', listPopulated);

// button.addEventListener('click', createButton);

// input.addEventListener("click", onInput);

// button.addEventListener("click", onClick);
