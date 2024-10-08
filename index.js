let news_container = document.querySelector(".news");

function getNews(searchfor) {

  const apikey = '9c0ef6c1c8e695bca6f195f8dc386a53';
  let category = 'today';
 let  url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=in&max=10&apikey=' + apikey;

  if (searchfor != "") {
    url = `https://gnews.io/api/v4/search?q=${searchfor}&lang=en&country=in&max=10&apikey=` + apikey;
  }

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      // console.log(data);
      // console.log(data.articles[0].url);
      displayNews(data);
    });
}


getNews();

document.querySelector(".btn").addEventListener("click", () => {
  getNews(document.querySelector(".search_news").value);
});

function displayNews(data) {
  news_container.innerHTML = "";
  for (let i = 0; i < data.articles.length; i++) {
    if (data.articles[i]["image"] != null) {
      let ele = document.createElement("div");

      ele.innerHTML = `<div class="card me-3 mb-3 " style="width: 18rem;">
      <img src="${data.articles[i]["image"]
        }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title fs-6">${data.articles[i]["title"]}</h5>
        <p class="card-text">${data.articles[i]["description"].substring(
          0,
          154
        )}....</p>
        <p class="card-text">publishAt: ${data.articles[i][
          "publishedAt"
        ].substring(0, 10)}</p>
        <a href="${data.articles[i].url
        }" class="btn btn-primary" target="_blank">Read more</a>
      </div>
     </div>`;

      news_container.appendChild(ele);
    }
  }
}


document.querySelectorAll(".nav-link").forEach((ele) => {
  ele.addEventListener("click", () => {
    getNews(ele.innerText);
  });
});
