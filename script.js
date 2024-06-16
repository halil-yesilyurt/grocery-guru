const formItem = document.querySelector('.form-item');
const inputItem = document.querySelector('.item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('.filter');

function addItem(e) {
  e.preventDefault();
  const itemValue = inputItem.value;

  if (itemValue === '') {
    alert('Please enter an item');
    return;
  }
  addItemToDom(itemValue);
  addItemToStorage(itemValue);
  controlPage();

  inputItem.value = '';
}

// Add items to DOM
function addItemToDom(item) {
  // Create list element
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('delete-item btn-item');
  li.appendChild(button);

  itemList.appendChild(li);
}

// Add items to local storage
function addItemToStorage(item) {
  let storageItem;

  if (localStorage.getItem('items') === null) {
    storageItem = [];
  } else {
    storageItem = JSON.parse(localStorage.getItem('items'));
  }

  storageItem.push(item);

  // convert to string and set to local storage
  localStorage.setItem('items', JSON.stringify(storageItem));
}

// Create button
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Create icon
function createIcon(classes) {
  const icon = document.createElement('icon');
  icon.className = classes;
  return icon;
}

// Remove items
function removeItem(e) {
  const parentEl = e.target.parentElement;
  if (parentEl.classList.contains('delete-item') && confirm('Do you want to delete this item?')) {
    parentEl.parentElement.remove();
    controlPage();
  }
}

// Clear all items
function clearAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  controlPage();
}

// Check page
function controlPage() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}

// Filter items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const itemEl = item.firstChild.textContent.toLowerCase();
    item.style.display = `${itemEl.indexOf(text) !== -1 ? 'flex' : 'none'}`;
  });
}

formItem.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);
controlPage();
