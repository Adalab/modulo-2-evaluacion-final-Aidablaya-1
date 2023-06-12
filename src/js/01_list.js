'use strict';

//variables globales
const ulElement =document.querySelector('.js_listUl');
const url = 'https://api.disneyapi.dev/character';
const ulFavorites =document.querySelector('.js_characterFavorite');

let listCharacterApi = [];
let nextPageUrl= 'http://api.disneyapi.dev/character?page=2&pageSize=50';

let listCharacterFavorite = [];

/////////////////////////////////////////////////////////FETCH DISNEY/////////////////////////////
//solicitud al servidor
fetch(url)
.then((response)=> response.json())
.then((data)=>{  
    console.log(data);
    listCharacterApi = data.data; 
    console.log (listCharacterApi);
    renderCharacterList(listCharacterApi);
    //añadido para poner paginación
    nextPageUrl= data.next;
});
console.log (localNextPage())

//function para mostrar la siguiente pagina
function localNextPage() {
  if (nextPageUrl) {
    fetch(nextPageUrl)
      .then((response) => response.json())
      .then((data) => {
        listCharacterApi = listCharacterApi.concat(data.data);
        renderCharacterList(listCharacterApi);
        nextPageUrl = data.next;
      })
      
  }
};


//////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////////////////

//función renderizar toda la lista de characters//recorrer array
function renderCharacterList(listData){
    for(const character of listData){
      ulElement.innerHTML += renderCharacter(character);      
    }
    addEventId();      
    }
;

//recorro elemento li
function addEventId() {
  const liElements = document.querySelectorAll('.js_card');  
    //necesito otro bucle para recorrer lis
    for(const li of liElements){
      li.addEventListener('click', handleClick);
}};

//función para renderizar personaje(foto y nombre)
function renderCharacter(characters){
  
    let imageUrl = characters.imageUrl || './assets/images/imagenRepuesto.png';

    let html = `<li class = "card js_card" id=${characters._id}>
      <div class="character">
        <img class="character__img js_imgCard" src=${characters.imageUrl} alt="">
        <p class="character__text js_textCard">${characters.name}</p>
      </div>
  </li>`;
  return html;
};

/////////////////////////LISTA DE FAVORITOS /////////////////////////////////////////////////////////////////

//recojo elemento li// aádir array de favoritos y meter dentro lo que clicamos
function handleClick (ev) {
  const id = parseInt(ev.currentTarget.id);
  //buscar dentro de array el primer elemento que cumple con la condicion(devuelve el contenido)
  const selectedCharacter = listCharacterApi.find((item)=> item._id === id);
  //devolver posición de array favoritos
  const indexCharacter = listCharacterFavorite.findIndex((item)=> item._id === id);
  
  //validar
  if( indexCharacter === -1 ){
    listCharacterFavorite.push(selectedCharacter);
  } else {
    listCharacterFavorite.splice(indexCharacter, 0);
  }
  renderFavoriteList();
};

// funcion añadidora de personajes a la lista de fav
function renderFavoriteList (){
  ulFavorites.innerHTML='';
  for(const fav of listCharacterFavorite){
    ulFavorites.innerHTML += renderCharacter(fav);
  }
};

/////////////////////////////////BUSCADOR///////////////////////////////////////////////////////////////////////

