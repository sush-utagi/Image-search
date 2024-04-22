const access_key = "YOUR_ACCESS_KEY";

const form_element = document.querySelector("form");
const search_input_element = document.getElementById("search-input");
const search_results_element = document.querySelector(".search-results");
const show_more_button = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = search_input_element.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    search_results_element.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imgwrapper = document.createElement("div");
    imgwrapper.classList.add("search-entry");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = results.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;

    imgwrapper.appendChild(image);
    imgwrapper.appendChild(imgLink);
    search_results_element.appendChild(imgwrapper);
  });

  page++;

  if (page > 1) {
    show_more_button.style.display = "block";
  }
}

form_element.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

show_more_button.addEventListener("click", () => {
  searchImage();
});
