//initiate the array of pokemon protected from global  access
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		pokemonList.push(pokemon);
	}
	function getAll() {
		return pokemonList;
	}
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listPokemon = document.createElement('li');
		let button = document.createElement('button');					//create button for each pokemon
		button.innerText = pokemon.name;
		button.classList.add('button-class');		//add class 'button-class'
		listPokemon.appendChild(button); 								
		pokemonList.appendChild(listPokemon);
		
		button.addEventListener('click', function(event) {	//add 'click' listener to button
				showDetails(pokemon);
		})	
	}
	function addListenerToButton(button, pokemon) {
		button.addEventListener('click', function(pokemon) {		//call function showDetails when button is clicked
			pokemonRepository.showDetails(button.innerText);
		})
	}

	function loadList() {
	  return fetch(apiUrl).then(function (response) {
	    return response.json();
	  }).then(function (json) {
	    json.results.forEach(function (item) {
	      let pokemon = {
	        name: item.name,
	        detailsUrl: item.url
	      };
	      add(pokemon);
	    });
	  }).catch(function (e) {
	    console.error(e);
	  })
	}
	function loadDetails(item) {
	    let url = item.detailsUrl;
	    return fetch(url).then(function (response) {
	      return response.json();
	    }).then(function (details) {
	      // Now we add the details to the item
	      item.imageUrl = details.sprites.front_default;
	      item.height = details.height;
	      item.types = details.types;
	    }).catch(function (e) {
	      console.error(e);
	    });
	  }
	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
	}
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		addListenerToButton: addListenerToButton,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


