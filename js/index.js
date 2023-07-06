const monsterContainer = document.getElementById('monster-container');
const createMonsterForm = document.getElementById('create-monster');
const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');

let currentPage = 1;

function renderMonsterCard(monster) {
  const card = document.createElement('div');
  card.classList.add('card');
  const name = document.createElement('h3');
  name.textContent = monster.name;
  const age = document.createElement('p');
  age.textContent = `Age: ${monster.age}`;
  const description = document.createElement('p');
  description.textContent = `Description: ${monster.description}`;

  card.appendChild(name);
  card.appendChild(age);
  card.appendChild(description);

  monsterContainer.appendChild(card);
}

function fetchMonsters() {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(monsters => {
      monsters.forEach(monster => renderMonsterCard(monster));
    });
}

function clearMonsters() {
  monsterContainer.innerHTML = '';
}

function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const descriptionInput = document.getElementById('description');

  const newMonster = {
    name: nameInput.value,
    age: parseFloat(ageInput.value),
    description: descriptionInput.value,
  };

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newMonster),
  })
    .then(response => response.json())
    .then(monster => {
      renderMonsterCard(monster);
      createMonsterForm.reset();
    });
}

function handleBackClick() {
  if (currentPage > 1) {
    currentPage--;
    clearMonsters();
    fetchMonsters();
  }
}

function handleForwardClick() {
  currentPage++;
  clearMonsters();
  fetchMonsters();
}

createMonsterForm.addEventListener('submit', handleFormSubmit);
backBtn.addEventListener('click', handleBackClick);
forwardBtn.addEventListener('click', handleForwardClick);

fetchMonsters();
