//variáveies globais
const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-Prev");
const buttonNext = document.querySelector(".btn-Next");

//Inicia a tela com o Valor do ID do pokémon
let searchPokemon = 1;

//Função asyncrona para pesquisar o pokémon
const fetchPokemon = async (pokemon) => {
  //constante que espera a função fetch retornar com a resposta
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  //Fazendo a validação se encontrar o pokémon
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

//Função que irá renderizar os dados dos pokemons na tela
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";
  pokemonNumber.innerHTML = "";

  //Recebe os dados do pokemon
  const data = await fetchPokemon(pokemon);
  if (data) {
    //Pegando os dados da API do PokéAPI
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = "";
    searchPokemon = data.id;
  } else {
    //Condição para retornar uma mensagem pro usuário e limpar a tela
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Não encontrado :/";
    pokemonNumber.innerHTML = "";
  }
};

//Função que retorna o ID e o nome do Pokemon
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

//Evento para voltar ao pokémon anterior
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

//Evento para passar para o próximo pokémon
buttonNext.addEventListener("click", () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

//Renderizando a pesquisa do pokemon na tela
renderPokemon(searchPokemon);
