function calculatorF() {
  
  const calculator = document.querySelector(".calculator-box");
  const mathOperation = document.querySelector(".m-operations");
  const mathResult = document.querySelector(".m-result");


  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= 19; i++) {
    const button = document.createElement("div");
    button.textContent = i;
    button.className = `box b-${i}`;

    fragment.appendChild(button);
  }
  calculator.appendChild(fragment);

  let oSimple2 = [
    { s: ".b-1", nC: "AC", v: "AC" },
    { s: ".b-2", nC: "AD", v: "AD" },
    { s: ".b-3", nC: "dote", v: "." },
    { s: ".b-4", nC: "devide", v: "/" },
    { s: ".b-5", nC: "number-7", v: "7" },
    { s: ".b-6", nC: "number-8", v: "8" },
    { s: ".b-7", nC: "number-9", v: "9" },
    { s: ".b-8", nC: "multy", v: "*" },
    { s: ".b-9", nC: "number-4", v: "4" },
    { s: ".b-10", nC: "number-5", v: "5" },
    { s: ".b-11", nC: "number-6", v: "6" },
    { s: ".b-12", nC: "plus", v: "+" },
    { s: ".b-13", nC: "number-1", v: "1" },
    { s: ".b-14", nC: "number-2", v: "2" },
    { s: ".b-15", nC: "number-3", v: "2" },
    { s: ".b-16", nC: "mines", v: "-" },
    { s: ".b-17", nC: "twoZero", v: "00" },
    { s: ".b-19", nC: "equal", v: "=" },
    { s: ".b-18", nC: "oneZero", v: "0" },
  ];


  oSimple2.forEach((item) => {
    const chosenE = document.querySelector(item.s);
    if (chosenE) {
      chosenE.classList.add(item.nC);
      chosenE.textContent = item.v;
      console.log(chosenE);
    }
  });

  

  let lastTargeted = null;

  calculator.addEventListener("click", (event) => {
    if (event.target.classList.contains("box")) {
      let eTargeted = event.target;

      if (lastTargeted) {
        lastTargeted.classList.remove("b-color");
      }
      
      eTargeted.classList.add("b-color");
      lastTargeted = eTargeted;
    }
    })


  let operationString = "" ;

  calculator.addEventListener("click", (event) => {
    if (event.target.classList.contains("box")) {
      let textC = event.target.textContent ; 

      if (textC === "AC") {
        // پاک کردن عملیات و نتیجه
        operationString = "";
        mathOperation.textContent = "";
        mathResult.textContent = "";
      } else if (textC === "=") {
        // محاسبه نتیجه
        try {
          const result = eval(operationString); // محاسبه با eval
          mathResult.textContent = result;
        } catch (error) {
          mathResult.textContent = "Error";
        }
      }else if (textC === "AD") {
        // حذف آخرین کاراکتر
        operationString = operationString.slice(0, -1);
        mathOperation.textContent = operationString;
      }else {
        // اضافه کردن مقدار به رشته عملیات
        operationString += textC;
        mathOperation.textContent = operationString;
      }
    }
  });
}

calculatorF();
