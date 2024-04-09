const formItem = document.querySelector('.form-item');
const inputItem = document.querySelector('.item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();
  const itemValue = inputItem.value;

  if (itemValue === '') {
    alert('Please enter an item');
    return;
  }

  // Create list element
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(itemValue));

  const button = createButton('delete-item btn-item');
  li.appendChild(button);
  
  itemList.appendChild(li);

  inputItem.value = '';
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

formItem.addEventListener('submit', addItem);
