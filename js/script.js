let pokemonList = [];
pokemonList[0] = {name:'Pikachu', height:0.4, type:['electric']};
pokemonList[1] = {name:'Charizard', height:1.7, type:['fire', 'flying']};
pokemonList[2] = {name:'Vileplume', height:1.2, type:['grass', 'poison']};

/*display each pokemon in the array including their height. If height > 1.5, 
add special note of how big it is*/
document.write('<br>');
for (var i = 0; i < pokemonList.length; i++) {
	if (pokemonList[i].height>1.5) {
		document.write(pokemonList[i].name+' (height: '+pokemonList[i].height+' m) '+'- Wow, thats BIG!'+'<br>');
	} else {
		document.write(pokemonList[i].name+' (height: '+pokemonList[i].height+' m) '+'<br>');
	}
}

