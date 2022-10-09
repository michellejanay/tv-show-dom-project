//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  makePageForEpisodes(allEpisodes);
  console.log(allEpisodes); //array of objects
  allEpisodes.forEach((e) => console.log(e.name));
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  allEpisodes.forEach((e) => {
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");
    h3.innerText = e.name;
    h4.innerText = `S0${e.season}E${e.number < 10 ? "0" + e.number : e.number}`;
    img.setAttribute("src", e.image.medium);
    p.innerText = e.summary.slice(3, -4);
    article.append(h3, h4, img, p);
    rootElem.append(article);
  });
}

window.onload = setup;
