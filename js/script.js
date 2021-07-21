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
		let pokemonName = pokemon.name;
		button.innerText = pokemonName.toUpperCase(pokemonName);
		button.classList.add('button-class');		//add class 'button-class
		listPokemon.appendChild(button); 								
		pokemonList.appendChild(listPokemon);
		
		button.addEventListener('click', () => {
		  showDetails(pokemon);
		});

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
			showModal(pokemon.name, ('Height: '+pokemon.height), pokemon.imageUrl);
		});
	}

	/*---------------MODAL--------------------------------------*/

	  let modalContainer = document.querySelector('#modal-container');
	  function showModal(title, text, src) {
	    modalContainer.innerHTML = '';
	    let modal = document.createElement('div');
	    modal.classList.add('modal');

	    let closeButtonElement = document.createElement('button');
	    closeButtonElement.classList.add('modal-close');
	    closeButtonElement.innerText = 'Close';
	    closeButtonElement.addEventListener('click', hideModal);

	    let titleElement = document.createElement('h1');
	    let pokemonName = title;
	    titleElement.innerText = pokemonName.toUpperCase(pokemonName);

	    let contentElement = document.createElement('p');
	    contentElement.innerText = text;

	    let imageContainer = document.createElement('div')
	    imageContainer.classList.add('image-container');
	    let pokemonImage = document.createElement('img');
	    pokemonImage.src = src;

	    modal.appendChild(closeButtonElement);
	    modal.appendChild(titleElement);
	    modal.appendChild(contentElement);
	    imageContainer.appendChild(pokemonImage);
	    modal.appendChild(imageContainer);
	    modalContainer.appendChild(modal);


	    modalContainer.classList.add('is-visible');
	  }

	  function hideModal() {
	    modalContainer.classList.remove('is-visible');
	  }

	  window.addEventListener('keydown', (e) => {
	    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
	      hideModal();  
	    }
	  });
	  modalContainer.addEventListener('click', (e) => {
	    // Since this is also triggered when clicking INSIDE the modal
	    // We only want to close if the user clicks directly on the overlay
	    let target = e.target;
	    if (target === modalContainer) {
	      hideModal();
	    }
	  });




	/*-------------END MODAL-----------------------------------------*/


	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
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


