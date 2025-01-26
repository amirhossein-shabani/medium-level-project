let myClock = document.querySelector(".clock");

setInterval( () =>{
  
  const hours = new Date().getHours().toString().padStart(2, "0")
  const minutes = new Date().getMinutes().toString().padStart(2, "0")
  const seconds = new Date().getSeconds().toString().padStart(2, "0")

  const time = `${hours}:${minutes}:${seconds}`;

  
  myClock.textContent = time;
} , 1000);
