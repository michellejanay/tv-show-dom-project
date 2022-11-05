//Global Variables
const root = document.getElementById("root");
const epiDisplay = document.getElementById("epi-display");
const onePageDisplay = document.getElementById("one-page-display");
const episodeInput = document.getElementById("search");
const showInput = document.getElementById("show-search");
const seeAllBtn = document.getElementById("see-all-shows");
const showsDropdown = document.getElementById("shows-dropdown");
const dropdown = document.getElementById("dropdown");

const allShows = getAllShows().sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
);

//Starter Function
const setup = () => {
  makePageShows(allShows);
  showDrop(allShows);
  searchShows(allShows);
};

//API function
const fetching = (showID) => {
  let url = "https://api.tvmaze.com/shows/" + showID + "/episodes";
  console.log(url);
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("something went wrong");
    })
    .then((episodes) => {
      makePageForEpisodes(episodes);
      episodeDrop(episodes);
      searchEpisodes(episodes);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Dropdown for shows
const showDrop = (shows) => {
  shows.forEach((s) => {
    const option = document.createElement("option");
    option.value = s.id;
    option.innerText = s.name;
    showsDropdown.append(option);
  });

  showsDropdown.addEventListener("change", (e) => {
    const showID = e.target.value;
    console.log(showID);
    root.innerHTML = "";
    e.target.value === "see-all" ? makePageShows(allShows) : fetching(showID);
  });
};

//search for shows
const searchShows = (show) => {
  showInput.addEventListener("input", (event) => {
    let searchTerm = event.target.value.toLowerCase();

    let filteredShows = show.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm) ||
        item.genres.join(" ").toLowerCase().includes(searchTerm)
      );
    });
    root.innerHTML = "";
    numOfShows.innerText = `Displaying ${filteredShows.length}/${show.length}`;
    makePageShows(filteredShows);
  });
};

//Dropdown for episodes
const episodeDrop = (episodes) => {
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";

  const option = document.createElement("option");
  option.value = "see-all";
  option.innerText = "See All";
  dropdown.append(option);

  episodes.forEach((e) => {
    const option = document.createElement("option");
    option.setAttribute("value", e.name);
    option.innerText = `${e.name} - S${seasonEpisode(e.number)}E${seasonEpisode(
      e.number
    )}`;
    dropdown.append(option);
  });

  dropdown.addEventListener("change", (e) => {
    root.innerHTML = "";
    let selected = episodes.filter(
      (episode) => episode.name === e.target.value
    );
    e.target.value === "see-all"
      ? makePageForEpisodes(episodes)
      : onePageEpisode(selected);
  });
};

//search for episodes
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
    root.innerHTML = "";
    // numOfShows.innerText = `Displaying ${filteredEpisodes.length}/${episode.length}`;
    makePageForEpisodes(filteredEpisodes);
  });
};

//Page for shows
const makePageShows = (shows) => {
  epiDisplay.innerHTML = "";
  onePageDisplay.innerHTML = "";
  episodeInput.style.display = "none";
  showInput.style.display = "block";
  seeAllBtn.style.display = "none";
  dropdown.style.display = "block";
  showsDropdown.style.display = "block";

  shows.forEach((e) => {
    if (e.image && e.summary) {
      const article = document.createElement("article");
      article.classList.add("shows-article");
      const div = document.createElement("div");
      const h1 = document.createElement("h1");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const rated = document.createElement("p");
      const status = document.createElement("p");
      const genre = document.createElement("p");
      const runtime = document.createElement("p");
      const hr = document.createElement("hr");
      div.classList.add("img-summary");
      div2.classList.add("card");
      div3.classList.add("container");
      p.classList.add("show-summary");

      h1.innerText = e.name;
      h1.value = e.id;
      img.src = e.image.medium;
      p.innerHTML = e.summary;
      div.append(img, p);

      rated.innerHTML = `<strong>Rated</strong>: ${e.rating.average}`;
      genre.innerHTML = `<strong>Genres</strong>: ${e.genres}`;
      status.innerHTML = `<strong>Status</strong>: ${e.status}`;
      runtime.innerHTML = `<strong>Runtime</strong>: ${e.runtime}`;
      div2.append(rated, genre, status, runtime);

      root.style.flexDirection = "column";
      dropdown.style.display = "none";

      div3.append(div, hr, div2);
      article.append(h1, div3);
      root.append(article);

      h1.addEventListener("click", () => {
        fetching(h1.value);
        showsDropdown.options.selectedIndex = 0;
      });
    }
  });
};

//Helper function for formatting
const seasonEpisode = (a) => {
  return a < 10 ? `0${a}` : a;
};

//Page for all episodes
const makePageForEpisodes = (episode) => {
  root.innerHTML = "";
  onePageDisplay.innerHTML = "";
  showInput.style.display = "none";
  seeAllBtn.style.display = "block";
  dropdown.style.display = "none";
  numOfShows.style.display = "none";
  showsDropdown.style.display = "none";
  showsDropdown.options.selectedIndex = 0;
  episodeInput.style.display = "block";

  seeAllBtn.addEventListener("click", () => {
    makePageShows(allShows);
  });

  episode.forEach((e) => {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");

    article.classList.add("episodes-article");

    h4.innerText = `${e.name} - S0${e.season}E${seasonEpisode(e.number)}`;
    img.src = e.image.medium;
    p.innerHTML = e.summary;

    article.append(h4, img, p);
    epiDisplay.append(article);

    dropdown.style.display = "block";
  });
  episodeInput.style.display = "block";
};

//Page for one episode
const onePageEpisode = (episode) => {
  epiDisplay.innerHTML = "";
  root.innerHTML = "";

  episode.forEach((e) => {
    const article = document.createElement("article");
    article.classList.add("onePageArticle");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");

    h2.innerText = `${e.name} - S${seasonEpisode(e.number)}E${seasonEpisode(
      e.number
    )}`;
    img.setAttribute("src", e.image.original);
    p.innerHTML = e.summary;
    img.style.maxWidth = "720px";
    article.append(h2, img, p);
    onePageDisplay.append(article);
  });
};

window.onload = setup();
