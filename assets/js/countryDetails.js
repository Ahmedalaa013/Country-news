import { Pubsub } from "./pubsub.js";

export class CountryDetails {
  init() {
    Pubsub.subscribe("countryDetails", this.countryClickHandler);
    Pubsub.subscribe("renderCountryDetails", this.renderCountryDetails);
  }
  countryClickHandler(data) {
    $(".card").click(function () {
      var getCardId = $(this).attr("id");
      let getCode = data[getCardId].alpha2Code;
      let getName = data[getCardId].name;
      Pubsub.publish("countryClicked", { getCode, getName });

      let getImgSrc = data[getCardId].flag;
      let getCapital = data[getCardId].capital;
      let getPopulation = data[getCardId].population;
      let getSubregion = data[getCardId].subregion;
      let getTimezone = data[getCardId].timezones[0];
      let getLang = data[getCardId].languages[0].name;
      let getCurrencies = data[getCardId].currencies[0].name;

      let countryDetails = {
        getImgSrc,
        getName,
        getCapital,
        getPopulation,
        getSubregion,
        getTimezone,
        getLang,
        getCurrencies,
      };
      Pubsub.publish("renderCountryDetails", countryDetails);
    });
  }
  renderCountryDetails(data) {
    let content = `
            <div class="border border-secondary p-3">
              <div class=" d-flex text-white">
                <img src="${data.getImgSrc}" alt="${data.getName}" class="card-img h-100" />
                <div class="ms-5">
                  <h5 class="my-4">${data.getName}</h5>
                  <h5>Capital: ${data.getCapital}</h5>
                  <h5>Currency: ${data.getCurrencies}</h5>
                  <h5>Language: ${data.getLang}</h5>
                  <h5>Population: ${data.getPopulation}</h5>
                  <h5>Subregion: ${data.getSubregion}</h5>
                  <h5 class="mb-4">Timezone: ${data.getTimezone}</h5>
                </div>
              </div>
            </div>
    `;
    $(".country-details").html(content);
  }
}
