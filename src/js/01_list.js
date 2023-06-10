'use strict';

//variables globales
const ulElement =document.querySelector('.js_listUl');
const url = 'https://api.disneyapi.dev/character';

let listCharacterApi = [];

//solicitud al servidor
fetch(url)
.then((response)=> response.json())
.then((data)=>{  
    console.log(data);
    listCharacterApi = data.data; 
    renderCharacterList(listCharacterApi);
});

//función renderizar toda la lista de characters
function renderCharacterList(listData){
    for(const character of listData){
      ulElement.innerHTML += renderCharacter(character);
      
    }
};

//función para renderizar personaje
function renderCharacter(characters){
    let html= `<li card">
      <div class="character">
        <img class="character__img js_imgCard" src="${characters.imageUrl}" alt="">
        <p class="character__text js_textCard">${characters.name}</p>
      </div>
  </li>`;
  return html;
;
};
