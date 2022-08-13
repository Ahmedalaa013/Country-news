import { Countries } from "./countries.js";
import { CountryDetails } from "./countryDetails.js";
import { News } from "./news.js";

const country = new Countries();
const countryDetails = new CountryDetails();
const news = new News();
country.init();
countryDetails.init();
news.init();
