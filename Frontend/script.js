const container = document.querySelector(".container");
const memeSubmit = document.querySelector(".memeSubmit");
const memeForm = document.querySelector("#formMeme");
const namePerson = document.querySelector(".form__name");
const caption = document.querySelector(".form__caption");
const url = document.querySelector(".form__url");
const alertBox = document.querySelector(".alert");

function createNotification() {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = "You submitted a meme";
  container.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 3000);
}

memeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let box = "alert-success";
  fetch("https://xmeme-api-akansha.herokuapp.com/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: namePerson.value,
      caption: caption.value,
      url: url.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      console.log(`${err}`);
      box = "alert-danger";
      //renderError(`something went wromg ${err.message}`);
    })
    .finally(() => {
      console.log(box);

      if (box === "alert-danger") {
        alertBox.textContent = "";
        alertBox.textContent = "Error while submitting !!";
      } else {
        alertBox.textContent = "";
        alertBox.textContent = "Success message";
      }

      alertBox.classList.add(box);
      alertBox.classList.remove("hidden");
      setTimeout(() => {
        alertBox.classList.add("hidden");
        alertBox.classList.remove(box);
      }, 5000);
    });
});
