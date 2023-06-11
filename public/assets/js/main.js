'use strict';

//variables globales
const ulElement =document.querySelector('.js_listUl');
const url = 'https://api.disneyapi.dev/character';

let listCharacterApi = [];
let nextPageUrl= 'http://api.disneyapi.dev/character?page=2&pageSize=50';

/////////////////////////////////////////////////////////FETCH DISNEY/////////////////////////////
//solicitud al servidor
fetch(url)
.then((response)=> response.json())
.then((data)=>{  
    console.log(data);
    listCharacterApi = data.data; 
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
    const liElements = document.querySelectorAll('.js_card');
    //necesito otro bucle para recorrer lis
    for(const li of liElements){
      li.addEventListener('click', handleClick);
    }

};

//función para renderizar personaje(foto y nombre)
function renderCharacter(characters){
  
    let imageUrl = characters.imageUrl || './assets/images/imagenRepuesto.png';

    let html = `<li class = "card js_card" id=${characters.id}>
      <div class="character">
        <img class="character__img js_imgCard" src=${characters.imageUrl} alt="">
        <p class="character__text js_textCard">${characters.name}</p>
      </div>
  </li>`;
  return html;
};


function handleClick (ev) {
  const id = ev.currentTarget.id;
  console.log(id);
};


'use strict';


//# sourceMappingURL=main.js.map
