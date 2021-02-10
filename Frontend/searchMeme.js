const endpoint = "https://xmeme-api-akansha.herokuapp.com/memes";

const memes = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => memes.push(...data));

function findMatches(wordToMatch, memes) {
  return memes.filter((response) => {
    const regex = new RegExp(wordToMatch, "gi");
    return response.name.match(regex) || response.caption.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, memes);
  const html = matchArray
    .map((ele) => {
      const regex = new RegExp(this.value, "gi");
      const personName = ele.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const captionName = ele.caption.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${personName}, ${captionName}</span>
       <a href="${ele.url}" > <button type="button" class="btn btn-outline-info">image</button></a>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
