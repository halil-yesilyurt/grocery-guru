const formItem = document.querySelector('.form-item');
const inputItem = document.querySelector('.item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('.filter');
const formBtn = formItem.querySelector('.btn');
let isEdit = false;

function addItem(e) {
  e.preventDefault();
  const itemValue = inputItem.value;

  if (itemValue === '') {
    alert('Please enter an item');
    return;
  }

  // check if edit mode
  if (isEdit) {
    const itemEdit = itemList.querySelector('.edit');

    removeItemFromStorage(itemEdit.textContent);
    itemEdit.classList.remove('edit');
    itemEdit.remove();
    isEdit = false;
  }

  addItemToDom(itemValue);
  addItemToStorage(itemValue);
  controlPage();

  inputItem.value = '';
}

// Display local storage items
function displayItems() {
  const storageItem = getItemFromStorage();
  storageItem.forEach((item) => {
    addItemToDom(item);
  });
  controlPage();
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
  const storageItem = getItemFromStorage(item);

  storageItem.push(item);

  // convert to string and set to local storage
  localStorage.setItem('items', JSON.stringify(storageItem));
}

// Get items from local storage
function getItemFromStorage() {
  let storageItem;

  if (localStorage.getItem('items') === null) {
    storageItem = [];
  } else {
    storageItem = JSON.parse(localStorage.getItem('items'));
  }

  return storageItem;
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

// Element handler
function onClickItem(e) {
  const parentEl = e.target.parentElement;
  if (parentEl.classList.contains('delete-item')) {
    removeItem(parentEl.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEdit = true;

  // Bring item into input
  inputItem.value = item.textContent;

  // Remove edit mode from rest of the items
  itemList.querySelectorAll('li').forEach((item) => item.classList.remove('edit'));
  item.classList.add('edit');

  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.classList.add('edit');

}

// Remove items
function removeItem(item) {
  if (confirm('Do you want to delete this item?')) {
    item.remove();

    removeItemFromStorage(item.textContent);

    controlPage();
  }
}

// Remove items from local storage
function removeItemFromStorage(item) {
  let storageItem = getItemFromStorage();
  storageItem = storageItem.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(storageItem));
}

// Clear all items
function clearAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // localStorage.clear()
  localStorage.removeItem('items');
  controlPage();
}

// Check page
function controlPage() {
  inputItem.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.classList.remove('edit');
  isEdit = false;
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
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

controlPage();
