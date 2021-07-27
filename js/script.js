//initiate the array of pokemon protected from global  access
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //add new pokemon instance to array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  //show all pokemon currently in array
  function getAll() {
    return pokemonList;
  }
  //create a modal card for each pokemon instance
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let row = $('.row');

      let card = $(
        '<div class="card" style="width:250px; text-align:center;"></div>'
      );
      let image = $(
        '<img class="mx-auto" alt="Card image" style="width:50%" />'
      );
      image.attr('src', pokemon.imageUrlFront);
      let cardBody = $('<div class="card-body"></div>');
      let cardTitle = $('<h4 class=\'card-title\' >' + pokemon.name + '</h4>');
      let seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      //Append items to each card
      row.append(card);
      card.append(image);
      card.append(cardBody);
      cardBody.append(cardTitle);
      cardBody.append(seeProfile);
      //add event listener to open modal
      seeProfile.on('click', function() {
        showDetails(pokemon);
      });
    });
  }
  //access the API and return pokemon name and url for more info
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  //access pokemon url from api and return requested data
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function(i) {
          item.types.push(' ' + i.type.name);
        });
        item.ability = [];
        details.abilities.forEach(function(i) {
          item.ability.push(' ' + i.ability.name);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  /*---------------MODAL--------------------------------------*/

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    //clear existing content of the modal
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $('<h1>' + item.name + '</h1>');
    // // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    // //creating element for height in modal content
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    // //creating element for weight in modal content
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');
    // //creating element for type in modal content
    let typesElement = $('<p>' + 'Types : ' + item.types + '</p>');
    // //creating element for type in modal content
    let abilityElement = $('<p>' + 'Abilities : ' + item.ability + '</p>');

    //append each item per instance
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilityElement);
  }
  /*-------------END MODAL-----------------------------------------*/

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
