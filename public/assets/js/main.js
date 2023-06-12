'use strict';

//variables globales
const ulElement =document.querySelector('.js_listUl');
const url = 'https://api.disneyapi.dev/character';
const ulFavorites =document.querySelector('.js_characterFavorite');
const inputSearch= document.querySelector('.js_search');
const btnSearch = document.querySelector('.js_btnSearch');

let listCharacterApi = [];
let nextPageUrl= 'http://api.disneyapi.dev/character?page=2&pageSize=50';

let listCharacterFavorite = [];

//verificar si hay cosas en el localStorage
const characterLocalStorage = JSON.parse(localStorage.getItem('character'));
console.log (characterLocalStorage);

function init () {
  if (characterLocalStorage) {
    listCharacterApi = characterLocalStorage;
    renderCharacterList(listCharacterApi);
  } else {
    fetch(url)
      .then((response)=> response.json())
      .then((data)=> {  
        console.log(data);
        listCharacterApi = data.data; 

        console.log (listCharacterApi);
        renderCharacterList(listCharacterApi);
        //añadido para poner paginación
        nextPageUrl= data.next;
        //coger dato para guardarlos
        localStorage.setItem('character', JSON.stringify(listCharacterApi));
})
  }
};

init();
/////////////////////////////////////////////////////////FETCH DISNEY/////////////////////////////
//solicitud al servidor
/*fetch(url)
.then((response)=> response.json())
.then((data)=>{  
    console.log(data);
    listCharacterApi = data.data; 
    console.log (listCharacterApi);
    renderCharacterList(listCharacterApi);
    //añadido para poner paginación
    nextPageUrl= data.next;
    //coger dato para guardarlos
    localStorage.setItem('character', JSON.stringify(listCharacterApi));
});*/


//function para mostrar la siguiente pagina
function localNextPage() {
  if (nextPageUrl) {
    fetch(nextPageUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log (listCharacterApi);
        listCharacterApi = listCharacterApi.concat(data.data);
        console.log (listCharacterApi);
        renderCharacterList(listCharacterApi);
        nextPageUrl = data.next;
        localStorage.setItem('character', JSON.stringify(listCharacterApi));
      })
      ///ejecutar funcion
  }
};



//////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////////////////

//función renderizar toda la lista de characters//recorrer array
function renderCharacterList(listData){
    ulElement.innerHTML = '';
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

///////////////////////// LISTA DE FAVORITOS /////////////////////////////////////////////////////////////////

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
  //guardar la lista en local Storage
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

const handleClickSearch = (ev) => {
  ev.preventDefault();
  const inputValue = inputSearch.value;
  const filterList = listCharacterApi.filter((item)=>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(filterList);
  renderCharacterList(filterList);
};

btnSearch.addEventListener('click', handleClickSearch);
'use strict';


//# sourceMappingURL=main.js.map
