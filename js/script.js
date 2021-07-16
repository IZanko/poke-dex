//initiate the array of pokemon protected from global  access
let pokemonRepository = (function () {
	let pokemonList = [];
	pokemonList[0] = { name: "Pikachu", height: 0.4, type: ["electric"] };
	pokemonList[1] = { name: "Charizard", height: 1.7, type: ["fire", "flying"] };
	pokemonList[2] = { name: "Vileplume",height: 1.2,type: ["grass", "poison"] };

	function add(pokemon) {
		pokemonList.push(pokemon);
	}
	function getAll() {
		return pokemonList;
	}
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button'); //add class pokemon-button
		pokemonList.appendChild(listItem);
		listItem.appendChild(button);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
	};
})();


document.write("<br>");
pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);	//create a list item and button for each pokemon on list
});
