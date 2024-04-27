// Collating all of the variables & Resources needed for the functionality of the form. This will make it easier to access them within multiple functions:

const form = document.getElementById('item-form'); // querySelector() would also work perfectly well.
const input = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const button = document.querySelector('button'); // Add a feature to make the button dynamic when mouseover and click events happen.

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
  console.log(li);
};

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Event Listeners

form.addEventListener('submit', addItem);

// button.addEventListener('click', createButton);

// input.addEventListener("click", onInput);

// itemist.addEventListener("click", onInteraction);

// button.addEventListener("click", onClick);
