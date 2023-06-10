'use strict';

const ulElement =document.querySelector('.js_listUl');
const url = 'https://api.disneyapi.dev/character';

//solicitud al servidor
fetch(url)
.then((response)=> response.json())
.then((data)=>{
  listCharacterdApi = data.character;
  renderCard = (listCharacterdApi);
    console.log(data);
    ulElement.innerHTML = renderCard();
});

//función para renderizar carta
function renderCharacter(character){
    let html= `<li>
    <div class="card">
      <img class="card__img js_imgCard" src="" alt="">
      <p class="card__text js_textCard"></p>
    </div>
  </li>`;
  return html;
};
console.log(renderCharacter());
'use strict';

console.log('>> Ready :)');

//# sourceMappingURL=main.js.map
