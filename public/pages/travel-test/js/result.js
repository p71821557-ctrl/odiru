const resultType =
localStorage.getItem(
  "travel-result-type"
);

const mbti =
localStorage.getItem(
  "travel-result-mbti"
);

const desc =
localStorage.getItem(
  "travel-result-desc"
);

const recommend =
JSON.parse(
  localStorage.getItem(
    "travel-result-recommend"
  )
);

const choice =
localStorage.getItem(
  "travel-result-choice"
);

document.getElementById(
  "result-type"
).innerText = resultType;

document.getElementById(
  "result-mbti"
).innerText = mbti;

document.getElementById(
  "result-desc"
).innerText = desc;

document.getElementById(
  "result-choice"
).innerText = choice;

const recommendList =
document.getElementById(
  "recommend-list"
);

recommend.forEach(place => {

  recommendList.innerHTML += `

    <div class="travel-item">
      ${place}
    </div>

  `;

});

document.getElementById(
  "retry-btn"
).addEventListener("click", () => {

  window.location.href =
  "/pages/travel-test/travel-test.html";

});

document.getElementById(
  "main-btn"
).addEventListener("click", () => {

  window.location.href =
  "/";

});