const countriesEl = document.getElementById('countries');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const weatherbtn=document.getElementById('btnweather');
getCountries();
async function getCountries()
{
	const res = await fetch('https://restcountries.com/v3.1/all');
	const countries = await res.json();
	displayCountries(countries);
}
function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');
        
		countryEl.innerHTML = `
            <div>
            <h3 class="country-name">${country.name.official}</h3>
                <img src="${country.flags.png}" alt="Germany" />
            </div>
            <div class="card-body">
            <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
                
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Country Code:</strong>
                    ${country.cca3}
                </p><p class="card-body">`
                const wbtn=document.createElement("button");
                wbtn.innerHTML="Click for Weather";
                wbtn.addEventListener('click',()=>{
                    getpopupdata(country.name.official)
                })
                
                countryEl.appendChild(wbtn);
            `<br></p></div>`
		countriesEl.appendChild(countryEl);
        
	});
}
let q="mali"
function getpopupdata(q)
{
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid=7526d57aadd705e154ba35f26991f648")
    .then(res=>res.json())
    .then(result=>
        {
            let t=result.main.temp;
            let h=result.main.humidity;
            let w=result.wind.speed;

            popvalues(q,t,h,w)
        })
    .catch(err=>console.log(err))
}
function popvalues(q,t,h,w)
{
    var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0]; 
modal.style.display = "block";
span.onclick = function()
{
  modal.style.display = "none";
}
window.onclick = function(event)
{
  if (event.target == modal)
  {
    modal.style.display = "none";
  }

}
document.getElementById('values1').innerHTML="<b>Country Name : "+q;
document.getElementById('values2').innerHTML="<b>Temperature : "+t;
document.getElementById('values3').innerHTML="<b>Humidity : "+h;
document.getElementById('values4').innerHTML="<b>Wind Speed : "+w;

}
