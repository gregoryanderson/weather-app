// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
let api = {
  key: "15b2983e6d7980c12cd68cd4e441ffd1",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery (e) {
   if (e.keyCode == 13) {
     getResults(searchbox.value)
   }
}

function getResults (query) {
  let url = `${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`
  console.log('url', url)
  fetch(url)
  .then(weather => {
    return weather.json();
  })
  .then(displayResults)
}

function displayResults(weather){
  document.querySelector('.search-box').innerHTML = '';

  let city = document.querySelector('.location .city')
  city.innerText = `${weather.name}, ${weather.sys.country}`

  let now = new Date()
  let date = document.querySelector('.location .date ')
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg; f</span>`

  let condition = document.querySelector('.current .weather')
  condition.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low')
  hilow.innerText = `${Math.round(weather.main.temp_min)}&deg; f / ${Math.round(weather.main.temp_max)}&deg; f`

  if (weather.main.temp > 70){
    document.querySelector('body').classList.add('warm')
    document.querySelector('body').classList.remove('cold')
  } else if (weather.main.temp < 32) {
    document.querySelector('body').classList.add('cold')
    document.querySelector('body').classList.remove('warm')
  } else {
    document.querySelector('body').classList.remove('warm')
    document.querySelector('body').classList.remove('cold')
  }
} 

function dateBuilder(d) {
  let months = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
  let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}
