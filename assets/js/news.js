import { Pubsub } from "./pubsub.js";

export class News {
  init() {
    Pubsub.subscribe("countryClicked", this.loadNews);
    Pubsub.subscribe("newsLoaded", this.renderNews);
    Pubsub.subscribe("noNews", this.renderNoNews);
  }
  async loadNews(countryData) {
    const url = `https://newsapi.org/v2/top-headlines?country=${countryData.getCode.toLowerCase()}&pageSize=10&apiKey=dfbc5209637644e79add7a4d555e0343`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.totalResults > 0) {
      Pubsub.publish("newsLoaded", data.articles);
    } else {
      Pubsub.publish("noNews", countryData.getName);
    }
  }
  renderNews(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].urlToImage === null) {
        continue;
      }
      let PubDate = data[i].publishedAt;
      let date = PubDate.split("").splice(0, 10).join("");
      content += ` <div class="border border-secondary p-4">
      <div class=" row text-white">
      <img src="${data[i].urlToImage}" alt="No Image Available" class="col-4" />
      <div class=" col-8">
        <h3 class="my-4">${data[i].title}</h3>
        <h6 > ${data[i].description}</h6>
        <h6 class="text-end"> ${data[i].source.name}</h6>
        <h6 class="text-end"> ${date}</h6>
      </div>
      </div>
      </div>
      `;
    }
    $(".news-details").html(content);
  }
  renderNoNews(name) {
    let content = `<div class="border border-secondary p-4">
    <div class=" row text-white text-center">
    <h2 > There is no news available for ${name} today!</h2>
    </div>
    </div>
    `;
    $(".news-details").html(content);
  }
}
