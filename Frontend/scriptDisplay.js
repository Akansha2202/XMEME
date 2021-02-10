const memeContainer = document.querySelector(".meme_container");
let open;
let close;
let container;
let idEdit = 0;
let submitEdit;

const displayResult = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const html = `
    
    <div class="card card_container" data-id="${arr[i].id}" style="width: 25rem;">
        <img class="card-img-top" src="${arr[i].url}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${arr[i].caption}</h5>
            <p class="card-text">${arr[i].name}</p>          
          <i class="fa fa-heart"></i>

          <button class="btn btn btn-primary btn-edit" id="open" data-id="${arr[i].id}">
                Edit Meme
          </button>
          
        </div>
        
    </div>
    `;
    memeContainer.insertAdjacentHTML("beforeend", html);
  }

  //Adding event listner;
  open = document.querySelectorAll("#open");
  close = document.querySelector("#close");
  container = document.querySelector("#container");

  open.forEach((openBox) => {
    openBox.addEventListener("click", () => {
      container.classList.add("active");
      idEdit = openBox.dataset.id;
    });
  });

  close.addEventListener("click", () => {
    container.classList.remove("active");
  });

  submitEdit = document.getElementById("formMeme");
  submitEdit.addEventListener("submit", editMeme);
};

const editMeme = function (e) {
  e.preventDefault();
  const caption = document.querySelector(".form__caption");
  const url = document.querySelector(".form__url");
  console.log(caption);
  console.log(url);
  fetch(`https://xmeme-api-akansha.herokuapp.com/memes/${idEdit}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    .then((data) => {
      //console.log("Success:", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error while submiting");
    });
};

const request = fetch("https://xmeme-api-akansha.herokuapp.com/memes")
  .then((response) => response.json())
  .then((data) => {
    displayResult(data);
  });

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

const switchTheme = function (e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

toggleSwitch.addEventListener("change", switchTheme, false);
