const db = firebase.database();
const shoppingListRef = db.ref('shoppingList');

// Fetch existing items
shoppingListRef.on('value', (snapshot) => {
    const items = snapshot.val();
    const shoppingList = document.getElementById('shopping-list');
    shoppingList.innerHTML = '';
    for (const key in items) {
        const item = items[key];
        const li = document.createElement('li');
        li.textContent = item.name;
        li.setAttribute('data-key', key);
        li.addEventListener('click', () => {
            shoppingListRef.child(key).remove();
        });
        shoppingList.appendChild(li);
    }
});

// Add new item
document.getElementById('add-button').addEventListener('click', () => {
    const input = document.getElementById('item-input');
    shoppingListRef.push({
        name: input.value
    });
    input.value = '';
});