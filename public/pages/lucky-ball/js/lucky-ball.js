const drawButton =
  document.getElementById("draw-btn");

const countryName =
  document.getElementById("country-name");

const resultCard =
  document.getElementById("result-card");

const resultCountry =
  document.getElementById("result-country");

const luckyBall =
  document.getElementById("lucky-ball");



// 행운볼 뽑기

drawButton.addEventListener("click",()=>{

  drawButton.disabled = true;

  let count = 0;

  luckyBall.style.animation =
    "float 0.3s infinite";

  const interval =
    setInterval(()=>{

      const randomCountry =
        countries[
          Math.floor(
            Math.random()
            * countries.length
          )
        ];

      countryName.innerText =
        randomCountry;

      count++;

      if(count > 40){

        clearInterval(interval);

        luckyBall.style.animation =
          "float 2s infinite";

        resultCountry.innerText =
          randomCountry;

        resultCard.classList.remove(
          "hidden"
        );

        localStorage.setItem(
          "lucky-country",
          randomCountry
        );

        drawButton.disabled = false;

      }

    },80);

});



// 메인으로 이동

const backBtn =
  document.getElementById("back-btn");

backBtn.addEventListener("click",()=>{

  window.location.href =
    "/";

});