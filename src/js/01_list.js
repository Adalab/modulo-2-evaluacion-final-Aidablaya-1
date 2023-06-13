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
const characterLocalStorageFavorite = JSON.parse(localStorage.getItem('favorite'));
console.log (characterLocalStorageFavorite);

/////////////////////////////////////////////////////////FETCH DISNEY/////////////////////////////

function init () {
  if (characterLocalStorage) {
    listCharacterApi = characterLocalStorage;
    renderCharacterList(listCharacterApi);
  if (characterLocalStorageFavorite) {
    listCharacterFavorite = characterLocalStorageFavorite;
    renderFavoriteList(listCharacterFavorite);
  }
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
        renderFavoriteList(listCharacterFavorite);
        //coger dato para guardarlos
        localStorage.setItem('character', JSON.stringify(listCharacterApi));
        
})
  }
};

init();

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

localNextPage()

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
    //splice elimina o agrega
    listCharacterFavorite.splice(indexCharacter, 0);
  }
  //guardar la lista en local Storage
    localStorage.setItem('favorite', JSON.stringify(listCharacterFavorite));
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
const liElements = document.querySelectorAll('.js_card'); 

//////////////////////TRASH////////////////////////////////////////////
const btnTrash = document.querySelector('.js_btnTrash');

const handleClickTrash = () => {
  if (listCharacterFavorite.length > 0) {
    listCharacterFavorite.shift(1)
    
  }
  renderFavoriteList();
};

btnTrash.addEventListener('cliclk', handleClickTrash);


/*
function renderTrash (){
  const trash = '<i class="fa-solid fa-trash" style="color: #eaeaeb;"></i>';
  if (renderFavoriteList) {
    trash.innerHTML += renderFavoriteList;
  
  }
}*/
/*
const btnTrash = document.querySelector('.js_btnTrash');

const handleClickTrash = (ev) => {
  if (listCharacterFavorite) {
    openPopup();
  }
};

btnTrash.addEventListener('cliclk', handleClickTrash);

function openPopup(){
  const popupWindow = window.open('', '_blank', 'width=400,height=300');

  let html =  `<h1>Lista de Nombres</h1>
               <ul>
               <li class="character__text js_textCard">${characters.name}</li>
               </ul>;`

                popupWindow.document.write(html);
                popupWindow.document.close();
  };*/