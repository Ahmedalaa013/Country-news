import { Pubsub } from "./pubsub.js";

export class Countries {
  init() {
    const url = `https://restcountries.com/v2/all`;
    Pubsub.subscribe("countriesLoaded", this.renderCountries);
    this.getCountries(url);
  }
  async getCountries(url) {
    const res = await fetch(url);
    const data = await res.json();
    Pubsub.publish("countriesLoaded", data);
    Pubsub.publish("countryDetails", data);
  }
  renderCountries(data) {
    const insert = document.getElementById("insert");
    for (let i = 0; i < data.length; i++) {
      if (i % 4 == 0) {
        let content = `<div class="carousel-item " id ="carousel-item${i}">
        <div class="row">`;
        for (let j = i; j < i + 4 && j < data.length; j++) {
          content += `
        <div class="col-3" >
            <div class="card mb-2 h-100" id=${j}>
              <img class="card-img-top" src="${data[j].flag}"
                   alt="${data[j].name}">
              <div class="card-body">
                <h4 class="card-title text-center">${data[j].name}</h4>
                <p class="text-center"> ${data[j].capital}</p>
              </div>
            </div>
          </div>
     `;
        }
        content += `</div>
        </div>`;
        insert.insertAdjacentHTML("beforeend", content);
      }
    }
    $("#carousel-item0").addClass("carousel-item active");
  }
}
