const clock = document.querySelector('.clock');
const secondhand =document.querySelector('[data-second-hand');
const minutehand =document.querySelector('[data-minute-hand');
const hourhand =document.querySelector('[data-hour-hand]');

function createElement(){
  const fragment = document.createDocumentFragment() ; 
  for(i=1 ; i <= 12 ; i++){
    const elmD = document.createElement('div');
    const elmP = document.createElement('p');
    elmP.textContent = `${i}`
    elmD.appendChild(elmP);
    elmD.classList.add("number" , `number-${i}`);
    fragment.appendChild(elmD);
    clock.appendChild(fragment);
  }
}

function setClock(){
  const currentDate = new Date();
  const secondRatio = currentDate.getSeconds() / 60;
  const minuteRatio = (secondRatio + currentDate.getMinutes()) / 60 ; 
  const hourRatio = (minuteRatio + currentDate.getHours()) / 12 ; 

  setRotation(secondhand , secondRatio);
  setRotation(minutehand , minuteRatio);
  setRotation(hourhand , hourRatio);
  
}

function setRotation (element ,rotaionRaito ){
  element.style.setProperty("--hand-rotation" ,  rotaionRaito * 360)
}




setInterval(setClock , 1000)
createElement()
setClock()
