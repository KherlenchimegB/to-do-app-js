let summary = 0;

const summaryEl = document.getElementById("summary");
const minusButton = document.getElementById("decrease");
const incButton = document.getElementById("increase");

minusButton.addEventListener("click", decreaseNumber);
incButton.addEventListener("click", increaseNumber);

function decreaseNumber() {
  summary--;
  summaryEl.innerText = summary;
}

function increaseNumber() {
  summary++;
  summaryEl.innerText = summary;
}
