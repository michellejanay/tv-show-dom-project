//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const numOfShows = document.getElementById("numOfShows");
const allShows = getAllShows();

// const check = (shows) => {
//   return shows.forEach((show) => console.log(show.id + " " + show.name));
// };
// check(allShows);
//get shows by id
//store id in variable
//use variable to fech shows from api
//populate shows based on id using show name
//display shows episode information in drop dropdown
//make sure functionality still works for all shows

const fetching = (showID) => {
  fetch("https://api.tvmaze.com/shows/" + showID + "/episodes")
    .then((response) => {
      return response.json();
    })
    .then((episodes) => {
      makePageForEpisodes(episodes);
      searchEpisodes(episodes);
      drop(episodes);
    });
};
function setup() {
  // makePageForEpisodes(allEpisodes);
  drop();
  searchEpisodes();
}

//level-100
function makePageForEpisodes(episodeList) {
  numOfShows.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;
  episodeList.forEach((e) => {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");
    //make an if/else statement to check for images and sumamry
    h4.innerText = `${e.name} - S${zeroPadded(e.season)}E${zeroPadded(
      e.number
    )}`;
    img.setAttribute("src", e.image.medium);
    p.innerHTML = e.summary;
    article.append(h4, img, p);
    rootElem.append(article);
  });
}

const zeroPadded = (episodeCode) => {
  return episodeCode.toString().padStart(2, 0);
};

//level-200
const searchEpisodes = (episode) => {
  const input = document.getElementById("search");
  input.addEventListener("input", (event) => {
    let searchTerm = event.target.value.toLowerCase();

    let filteredEpisodes = episode.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm)
      );
    });
    rootElem.innerHTML = "";
    numOfShows.innerText = `Displaying ${filteredEpisodes.length}/${episode.length}`;
    makePageForEpisodes(filteredEpisodes);
  });
};

//level-300
const drop = (episodes) => {
  const dropdown = document.getElementById("dropdown");

  episodes.forEach((e) => {
    const option = document.createElement("option");
    option.setAttribute("value", e.name);
    option.innerText = `${e.name} - S${zeroPadded(e.season)}E${zeroPadded(
      e.number
    )}`;
    dropdown.append(option);
  });

  dropdown.addEventListener("change", (e) => {
    rootElem.innerHTML = "";
    let selected = episodes.filter(
      (episode) => episode.name === e.target.value
    );
    e.target.value === "see-all"
      ? makePageForEpisodes(episodes)
      : onePageEpisode(selected);
  });
};

const showDrop = (shows) => {
  const dropdown = document.getElementById("shows-dropdown");

  shows.forEach((s) => {
    const option = document.createElement("option");
    option.setAttribute("value", s.id);
    option.innerText = `${s.name}`;
    //console.log(option);
    dropdown.append(option);
  });
  //sort alphabetically ^^^
  dropdown.addEventListener("change", (e) => {
    //console.log(e.target.value);
    rootElem.innerHTML = "";
    fetching(e.target.value);
  });
};
showDrop(allShows);

const onePageEpisode = (episode) => {
  episode.forEach((e) => {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");

    h2.innerText = `${e.name} - S0${e.season}E${
      e.number < 10 ? "0" + e.number : e.number
    }`;
    img.setAttribute("src", e.image.original);
    p.innerHTML = e.summary;
    p.style.maxWidth = "720px";
    img.style.maxWidth = "720px";
    article.append(h2, img, p);
    article.style.justifyContent = "center";
    rootElem.append(article);
    numOfShows.innerText = `Displaying 1/73 episode(s)`;
  });
};
window.onload = setup;
