//initiate the array of pokemon protected from global  access
let pokemonRepository = (function() {
	let pokemonList = [];
	pokemonList[0] = {name:'Pikachu', height:0.4, type:['electric']};
	pokemonList[1] = {name:'Charizard', height:1.7, type:['fire', 'flying']};
	pokemonList[2] = {name:'Vileplume', height:1.2, type:['grass', 'poison']};

	function add(pokemon) { pokemonList.push(pokemon);}
	function getAll() {return pokemonList}

	return {
		add: add,
		getAll: getAll
	}
})();

/*display each pokemon in the array including their height. If height > 1.5, 
add special note of how big it is*/
document.write('<br>');
pokemonRepository.getAll().forEach(function(pokemon) {
	if (pokemon.height > 1.5) {document.write('<p>'+pokemon.name+' (height: '+pokemon.height+' m) '+'- Wow, thats BIG!<p>')}
	else {document.write('<p>'+pokemon.name+' (height: '+pokemon.height+' m) <p>');}
})



