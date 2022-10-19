//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const numOfShows = document.getElementById("numOfShows");
const allShows = getAllShows().sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
);

//API call to get episodes for each show
const fetching = (showID) => {
  fetch("https://api.tvmaze.com/shows/" + showID + "/episodes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("something went wrong");
    })
    .then((episodes) => {
      makePageForEpisodes(episodes);
      searchEpisodes(episodes);
      drop(episodes);
    })
    .catch((error) => {
      console.log(error);
    });
};

function setup() {
  makePageShows(allShows);
  drop();
  searchEpisodes();
}

//level-100
function makePageForEpisodes(episodeList) {
  //numOfShows.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;
  episodeList.forEach((e) => {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");
    //make an if/else statement to check for images and sumamry
    h4.innerText = `${e.name} - S0${e.season}E${
      e.number < 10 ? "0" + e.number : e.number
    }`;
    img.setAttribute("src", e.image.medium);
    p.innerHTML = e.summary;
    article.append(h4, img, p);
    rootElem.append(article);
  });
}

//Make page for all shows (no season number information)
function makePageShows(episodeList) {
  //numOfShows.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;
  episodeList.forEach((e) => {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");
    //make an if/else statement to check for images and sumamry
    h4.innerText = `${e.name}`;
    img.setAttribute("src", e.image.medium);
    p.innerHTML = e.summary;
    article.append(h4, img, p);
    rootElem.append(article);
  });
}

//zero padded for season and episode display
const zeroPadded = (episodeCode) => {
  return episodeCode.toString().padStart(2, 0);
};

//level-200 live-search
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

//level-300 - episodes dropdown population and funcationality
const drop = (episodes) => {
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  const option = document.createElement("option");
  option.setAttribute("value", "see-all");
  option.innerText = "See All";
  dropdown.append(option);
  //clear list before
  //check if it has episodes
  //if no episodes say no available episodes
  //re-add see all
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

//show dropdown and functionality
const showDrop = (shows) => {
  const dropdown = document.getElementById("shows-dropdown");

  shows.forEach((s) => {
    const option = document.createElement("option");
    option.setAttribute("value", s.id);
    option.innerText = `${s.name}`;
    dropdown.append(option);
  });

  dropdown.addEventListener("change", (e) => {
    let showID = e.target.value;
    rootElem.innerHTML = "";
    e.target.value === "see-all" ? makePageShows(allShows) : fetching(showID);
    // when see-all is clicked, clear episodes dropdown
  });
};
showDrop(allShows);

//function to display episode information from episode dropdown
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
