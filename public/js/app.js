const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");
const weatherIcon = document.querySelector(".weatherIcon");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        weatherIcon.src = "";
        weatherIcon.classList.add("hidden");
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;

        weatherIcon.src = data.image;
        weatherIcon.classList.remove("hidden");
      }
    });
  });
});
