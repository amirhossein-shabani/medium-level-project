const display = document.querySelector(".display");
const buttons = document.querySelectorAll('button');
const specialChars  = ["%" , "*" , "/" , "-" , "+" , "=" ] ;
let output = "";


//Define function to calclute based on botton clicked . 
const  calculate  = (btnValue) =>{
  if(btnValue === "=" && output !== ""){
    output = eval(output)
  }else if(btnValue === "AC"){
    output = "" ; 
  }else if(btnValue === "DEL"){
    //If DEL button is clicked , remove the last character from the output . 

    output = output.toString().slice(0 , -1)
  }else {
    //If output is empty and button is spectialChars then return 
    if(output === "" && specialChars.includes(btnValue))  return ; 
    // output = output+btnValue ; 
    output += btnValue
  }

 display.value = output ; 
}


//Add event listener to buttons , call calculate() on click 
buttons.forEach((button) =>{
  //Button click listener calls calculate() with dataset value as argument . 

  button.addEventListener('click'  , (e) => {
    calculate(e.target.dataset.value);
  }) 

})




