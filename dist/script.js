let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    t.push(e);
  }
  function i(t) {
    pokemonRepository.loadDetails(t).then(function() {
      !(function(t) {
        let e = $('.modal-body'),
          n = $('.modal-title');
        n.empty(), e.empty();
        let i = $('<h1>' + t.name + '</h1>'),
          o = $('<img class="modal-img" style="width:50%">');
        o.attr('src', t.imageUrlFront);
        let a = $('<img class="modal-img" style="width:50%">');
        a.attr('src', t.imageUrlBack);
        let l = $('<p>Height : ' + t.height + '</p>'),
          p = $('<p>Weight : ' + t.weight + '</p>'),
          r = $('<p>Types : ' + t.types + '</p>'),
          s = $('<p>Abilities : ' + t.ability + '</p>');
        n.append(i),
          e.append(o),
          e.append(a),
          e.append(l),
          e.append(p),
          e.append(r),
          e.append(s);
      })(t);
    });
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      pokemonRepository.loadDetails(t).then(function() {
        let e = $('.row'),
          n = $(
            '<div class="card" style="width:250px; text-align:center;"></div>'
          ),
          o = $('<img class="mx-auto" alt="Card image" style="width:50%" />');
        o.attr('src', t.imageUrlFront);
        let a = $('<div class="card-body"></div>'),
          l = $('<h4 class=\'card-title\' >' + t.name + '</h4>'),
          p = $(
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
          );
        e.append(n),
          n.append(o),
          n.append(a),
          a.append(l),
          a.append(p),
          p.on('click', function() {
            i(t);
          });
      });
    },
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: function(t) {
      let e = t.detailsUrl;
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(e) {
          (t.imageUrlFront = e.sprites.front_default),
            (t.imageUrlBack = e.sprites.back_default),
            (t.height = e.height),
            (t.weight = e.weight),
            (t.types = []),
            e.types.forEach(function(e) {
              t.types.push(' ' + e.type.name);
            }),
            (t.ability = []),
            e.abilities.forEach(function(e) {
              t.ability.push(' ' + e.ability.name);
            });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    showDetails: i
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
