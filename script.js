//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const numOfShows = document.getElementById("numOfShows");

function setup() {
  makePageForEpisodes(allEpisodes);
  drop();
  allEpisodes.forEach((e) => console.log(e.name));
}

//level-100
function makePageForEpisodes(episodeList) {
  numOfShows.innerText = `Displaying ${episodeList.length}/73 episode(s)`;
  episodeList.forEach((e) => {
    const article = document.createElement("article");
    //const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");

    h4.innerText = `${e.name} - S0${e.season}E${
      e.number < 10 ? "0" + e.number : e.number
    }`;
    img.setAttribute("src", e.image.medium);
    p.innerText = e.summary.slice(3, -4);
    article.append(h4, img, p);
    rootElem.append(article);
  });
}

//level-200
const searchEpisodes = () => {
  const input = document.getElementById("search");
  input.addEventListener("input", (event) => {
    let searchTerm = event.target.value.toLowerCase();

    let filteredEpisodes = allEpisodes.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm)
      );
    });
    console.log(filteredEpisodes);
    rootElem.innerHTML = "";
    numOfShows.innerText = `Displaying ${filteredEpisodes.length}/73 episode(s)`;
    // while (rootElem.firstChild) {
    //   rootElem.removeChild(rootElem.lastChild);
    // }

    //rootElem.replaceChildren(makePageForEpisodes(filteredEpisodes));

    // while (rootElem.firstChild) {
    //   rootElem.remove(rootElem.lastChild);
    // }

    console.log(rootElem);
    makePageForEpisodes(filteredEpisodes);
  });
};
searchEpisodes();

//rootElem.textContent = `Got ${episodeList.length} episode(s)`

//level-300
const drop = () => {
  const dropdown = document.getElementById("dropdown");
  allEpisodes.forEach((e) => {
    const option = document.createElement("option");
    option.setAttribute("value", e.id);
    option.innerText = `S0${e.season}E${
      e.number < 10 ? "0" + e.number : e.number
    } - ${e.name}`;
    dropdown.append(option);
  });
};

window.onload = setup;
