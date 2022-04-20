


function buscarPokemon() {
  let input = document.getElementById("inputPokemon");
  let inputvalue = input.value;
  let pokenombre = inputvalue.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokenombre}`;


  //Funtion arrow que consultará la API y remplazara el valor para encontrar el pokemon deseado
  fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      let pokeimagen = data.sprites.front_default;
      let pokeId = data.id;
      let pokenombre = data.name;
      let pokeTipo = data.types;
      let movimientos = data.abilities;
      let estadistica = data.stats;

      //Se llaman todas las funciones con el parametro correspondiente según las variables de arriba
      pokeTipos(pokeTipo);
      pokeimg(pokeimagen);
      pokeName(pokenombre);
      pokeIds(pokeId);
      pokeHabilidades(movimientos);
      pokeEstadisticas(estadistica);
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("pokeId").innerHTML = "?";
      const imagen = document.getElementById("imagenPokemon");
      imagen.src = "./assets/psyduckError.png";
      imagen.style.marginBottom = "2px";
      const mostrarNombre = document.getElementById("nombrePokemon");
      mostrarNombre.innerText = "Pokémon no encontrado";
    });
}

function pokeIds(pokeId) {
  document.getElementById("pokeId").innerHTML = pokeId;
}

function pokeimg(url) {
  const imagen = document.getElementById("imagenPokemon");
  imagen.src = url;
}

function pokeName(pokenombre) {
  let pokenombre1 = pokenombre[0].toUpperCase() + pokenombre.slice(1);
  const mostrarNombre = document.getElementById("nombrePokemon");
  mostrarNombre.innerText = pokenombre1;
}

function pokeTipos(pokeTipo) {
  const tipoPoke = document.getElementById("tipoPoke");
  tipoPoke.innerHTML = ""; // <= Al colocar esto hacemos que no se encimen los valores cuando volvemos a buscar
  //creamos un nuevo elemento segun la cantidad de valores que tiene el array
  pokeTipo.forEach((type) => {
    const crearP = document.createElement("li");
    crearP.textContent = type.type.name;
    tipoPoke.appendChild(crearP);
  });
}

function pokeHabilidades(movimientos) {
  const movimiento = document.getElementById("movimiento");
  movimiento.innerHTML = "";
  movimientos.forEach((ability) => {
    const crearlis = document.createElement("li");
    crearlis.textContent = ability.ability.name;
    movimiento.appendChild(crearlis);
  });
}

function pokeEstadisticas(estadistica) {
  const datosEstadistica = document.getElementById("datosEstadistica");
  datosEstadistica.innerHTML = "";
  estadistica.forEach((base_stat) => {
    const crear = document.createElement("li");
    crear.textContent = base_stat.base_stat;
    datosEstadistica.appendChild(crear);
  });
}
