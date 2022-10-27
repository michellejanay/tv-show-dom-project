//You can edit ALL of the code here
// const allEpisodes = getAllEpisodes();
// const rootElem = document.getElementById("root");
// const numOfShows = document.getElementById("numOfShows");
// const allShows = getAllShows().sort((a, b) =>
//   a.name > b.name ? 1 : b.name > a.name ? -1 : 0
// );
// const dropdown = document.getElementById("dropdown");

// //API call to get episodes for each show
// const fetching = (showID) => {
//   fetch("https://api.tvmaze.com/shows/" + showID + "/episodes")
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("something went wrong");
//     })
//     .then((episodes) => {
//       makePageForEpisodes(episodes);
//       searchEpisodes(episodes);
//       drop(episodes);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// function setup() {
//   makePageShows(allShows);
//   drop();
//   searchEpisodes();
// }

// //level-100
// function makePageForEpisodes(episodeList) {
//   //numOfShows.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;
//   episodeList.forEach((e) => {
//     const article = document.createElement("article");
//     article.classList.add("episodes-article");
//     const h4 = document.createElement("h4");
//     const img = document.createElement("img");
//     const p = document.createElement("p");
//     //make an if/else statement to check for images and sumamry
//     h4.innerText = `${e.name} - S0${e.season}E${
//       e.number < 10 ? "0" + e.number : e.number
//     }`;
//     img.setAttribute("src", e.image.medium);
//     p.innerHTML = e.summary;
//     article.append(h4, img, p);
//     rootElem.append(article);
//     dropdown.style.display = "block";
//   });
// }

// //Make page for all shows (no season number information)
// function makePageShows(episodeList) {
//   //numOfShows.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;
//   episodeList.forEach((e) => {
//     const article = document.createElement("article");
//     article.classList.add("shows-article");
//     const div = document.createElement("div");
//     const h1 = document.createElement("h1");
//     const img = document.createElement("img");
//     const p = document.createElement("p");
//     const div2 = document.createElement("div");
//     const div3 = document.createElement("div");
//     const rated = document.createElement("p");
//     const status = document.createElement("p");
//     const genre = document.createElement("p");
//     const runtime = document.createElement("p");
//     h1.innerText = `${e.name}`;
//     img.setAttribute("src", e.image.medium);
//     p.innerHTML = e.summary;
//     div.append(img, p);
//     div.classList.add("img-summary");
//     div2.classList.add("card");
//     div3.classList.add("container");
//     rated.innerHTML = `<strong>Rated</strong>: ${e.rating.average}`;
//     genre.innerHTML = `<strong>Genres</strong>: ${e.genres}`;
//     status.innerHTML = `<strong>Status</strong>: ${e.status}`;
//     runtime.innerHTML = `<strong>Runtime</strong>: ${e.runtime}`;
//     div2.append(rated, genre, status, runtime);
//     p.style.width = "100%";
//     article.style.width = "100%";
//     rootElem.style.flexDirection = "column";
//     dropdown.style.display = "none";
//     div3.append(div, div2);
//     article.append(h1, div3);
//     rootElem.append(article);
//     //add genres, status, rating, and runtime
//     //add event listeners to each show to take them to the episodes page
//     //search functionality to search through shows
//   });
// }

// //zero padded for season and episode display
// const zeroPadded = (episodeCode) => {
//   return episodeCode.toString().padStart(2, 0);
// };

// //level-200 live-search
// const searchEpisodes = (episode) => {
//   const input = document.getElementById("search");
//   input.addEventListener("input", (event) => {
//     let searchTerm = event.target.value.toLowerCase();

//     let filteredEpisodes = episode.filter((item) => {
//       return (
//         item.name.toLowerCase().includes(searchTerm) ||
//         item.summary.toLowerCase().includes(searchTerm)
//       );
//     });
//     rootElem.innerHTML = "";
//     numOfShows.innerText = `Displaying ${filteredEpisodes.length}/${episode.length}`;
//     makePageForEpisodes(filteredEpisodes);

//     //fix search for shows. Not searching on shows
//   });
// };

// //level-300 - episodes dropdown population and funcationality
// const drop = (episodes) => {
//   const dropdown = document.getElementById("dropdown");
//   dropdown.innerHTML = "";
//   const option = document.createElement("option");
//   option.setAttribute("value", "see-all");
//   option.innerText = "See All";
//   dropdown.append(option);
//   //clear list before
//   //check if it has episodes
//   //if no episodes say no available episodes
//   //re-add see all
//   episodes.forEach((e) => {
//     const option = document.createElement("option");
//     option.setAttribute("value", e.name);
//     option.innerText = `${e.name} - S${zeroPadded(e.season)}E${zeroPadded(
//       e.number
//     )}`;
//     dropdown.append(option);
//   });

//   dropdown.addEventListener("change", (e) => {
//     rootElem.innerHTML = "";
//     let selected = episodes.filter(
//       (episode) => episode.name === e.target.value
//     );
//     e.target.value === "see-all"
//       ? makePageForEpisodes(episodes)
//       : onePageEpisode(selected);
//   });
// };

// //show dropdown and functionality
// const showDrop = (shows) => {
//   const dropdown = document.getElementById("shows-dropdown");

//   shows.forEach((s) => {
//     const option = document.createElement("option");
//     option.setAttribute("value", s.id);
//     option.innerText = `${s.name}`;
//     dropdown.append(option);
//   });

//   dropdown.addEventListener("change", (e) => {
//     let showID = e.target.value;
//     rootElem.innerHTML = "";
//     e.target.value === "see-all" ? makePageShows(allShows) : fetching(showID);
//     // when see-all is clicked, clear episodes dropdown
//   });
// };
// showDrop(allShows);

// //function to display episode information from episode dropdown
// const onePageEpisode = (episode) => {
//   episode.forEach((e) => {
//     const article = document.createElement("article");
//     const h2 = document.createElement("h2");
//     const img = document.createElement("img");
//     const p = document.createElement("p");

//     h2.innerText = `${e.name} - S0${e.season}E${
//       e.number < 10 ? "0" + e.number : e.number
//     }`;
//     img.setAttribute("src", e.image.original);
//     p.innerHTML = e.summary;
//     p.style.maxWidth = "720px";
//     img.style.maxWidth = "720px";
//     article.append(h2, img, p);
//     article.style.justifyContent = "center";
//     rootElem.append(article);
//     numOfShows.innerText = `Displaying 1/73 episode(s)`;
//   });
// };
// window.onload = setup;

//present listing of all shows
//each show display the
//name,
//image,
//summary,
//genres, status, rating, and runtime

//show name on click, display episodes for show
//enable search and selection as before

//add navigation to return to shows listing
//hide episodes listing

//return to shows listing
//episodes listing hidden

//CTRL - D for mutlitple selection

//search through shows names, genres, and summary texts
//ensure all search and dropdowns work accordingly

const root = document.getElementById("root");
const epiDisplay = document.getElementById("epi-display");
const onePageDisplay = document.getElementById("one-page-display");
const allShows = getAllShows().sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
);
const setup = () => {
  makePageShows(allShows);
  showDrop(allShows);
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
      console.log(episodes);
      makePageForEpisodes(episodes);
      episodeDrop(episodes);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Dropdown for shows
const showDrop = (shows) => {
  const dropdown = document.getElementById("shows-dropdown");

  shows.forEach((s) => {
    const option = document.createElement("option");
    option.setAttribute("value", s.id);
    option.innerText = `${s.name}`;
    dropdown.append(option);
  });

  dropdown.addEventListener("change", (e) => {
    const showID = e.target.value;
    console.log(showID);
    root.innerHTML = "";
    e.target.value === "see-all" ? makePageShows(allShows) : fetching(showID);
  });
};

//Dropdown for episodes
const episodeDrop = (episodes) => {
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  const option = document.createElement("option");
  option.setAttribute("value", "see-all");
  option.innerText = "See All";
  dropdown.append(option);

  episodes.forEach((e) => {
    const option = document.createElement("option");
    option.setAttribute("value", e.name);
    option.innerText = `${e.name} - S${seasonEpisode(e)}E${seasonEpisode(e)}`;
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

//Page for shows
const makePageShows = (episodeList) => {
  epiDisplay.innerHTML = "";
  onePageDisplay.innerHTML = "";

  //numOfShows.innerText = `Displaying ${episodeList.length}/${episodeList.length}`;
  episodeList.forEach((e) => {
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
    }
  });
};

//Helper function for formatting
const seasonEpisode = (a) => {
  return a.number < 10 ? `0${a.number}` : a.number;
};

//Page for episodes
const makePageForEpisodes = (episode) => {
  root.innerHTML = "";
  onePageDisplay.innerHTML = "";

  episode.forEach((e) => {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const p = document.createElement("p");

    article.classList.add("episodes-article");

    h4.innerText = `${e.name} - S0${e.season}E`;
    img.setAttribute("src", e.image.medium);
    p.innerHTML = e.summary;
    article.append(h4, img, p);
    epiDisplay.append(article);

    dropdown.style.display = "block";
  });
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

    h2.innerText = `${e.name} - S${seasonEpisode(e)}E${seasonEpisode(e)}`;
    img.setAttribute("src", e.image.original);
    p.innerHTML = e.summary;
    img.style.maxWidth = "720px";
    article.append(h2, img, p);
    onePageDisplay.append(article);
  });
};

window.onload = setup();
