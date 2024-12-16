async function search(location) {
  try {
    // Fetching the data from the Weather API
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);

    // Check if the response is valid
    if (response.ok && response.status !== 400) {
      let data = await response.json();

      // Process and display the data
      displayCurrent(data.location, data.current);
      displayAnother(data.forecast.forecastday);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayCurrent(location, current) {
  // Get the current day name (e.g., 'Monday', 'Tuesday')
  const currentDate = new Date();
  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Get the current date (e.g., 'December 16, 2024')
  const date = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Update the DOM elements dynamically
  document.getElementById("currentDay").innerText = dayName;  // Display current weekday
  document.getElementById("currentDate").innerText = date;  // Display current date
  
  // Display location information
  document.getElementById("location").innerText = `${location.name}, ${location.region}, ${location.country}`;
  
  // Display current temperature and condition
  document.getElementById("todayTemp").innerText = `${current.temp_c}°C`;
  document.getElementById("todayStatus").innerText = `${current.condition.text}`;

  // Set the image based on the current condition
  let conditionImage = '';
  switch (current.condition.text) {
    case 'Partly cloudy':
      conditionImage = 'Partly Cloudy.png';
      break;
    case 'Patchy rain nearby':
      conditionImage = 'Patchy rain nearby.png';
      break;
    case 'Sunny':
      conditionImage = 'Sunny.png';
      break;
    case 'Clear':
      conditionImage = 'clear.png';
      break;
      case 'Overcast':
      conditionImage = 'Overcast.png';
      break;
    default:
      conditionImage = 'default.png'; // Fallback image for unknown conditions
  }

  document.getElementById("todayStatusImg").innerHTML = `<img src="Images/${conditionImage}" alt="${current.condition.text}">`;
}


function displayAnother(forecastDays) {
  let cartona = '';

  // Clear the previous content before adding new content
  const weatherContainer = document.getElementById("weather");
  if (weatherContainer) {
    weatherContainer.innerHTML = ''; // Clear the existing HTML content
  } else {
    console.error('Element with ID "weather" not found.');
  }

  // Using a traditional for loop
  for (let i = 1; i < forecastDays.length; i++) { // Include all days
    let day = forecastDays[i];

    // Get the correct day of the week
    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
    let dayConditionImg = '';

    if (day.day.condition.text == 'Partly Cloudy ') {
      dayConditionImg = 'Partly Cloudy';
    } else if (day.day.condition.text == 'Patchy rain nearby') {
      dayConditionImg = 'Patchy rain nearby';
    } else if (day.day.condition.text == 'Sunny') {
      dayConditionImg = 'Sunny';
    } else if (day.day.condition.text == 'Clear') {
      dayConditionImg = 'Clear';
    }


    // Generate the HTML card
    cartona += `  
      <div class="card card-${i}">
        <div>
          <p class="text-center pt-2">${dayName}</p>
        </div>
        <div class="card-body text-center">
          <img src="Images/${dayConditionImg}.png" alt="${day.day.condition.text}">
          <div class="degreee m-3">
            <div class="num-higest fs-2"><p>${day.day.maxtemp_c}°C</p></div>
            <div class="num-lower fs-6 text-secondary"><p>${day.day.mintemp_c}°C</p></div>
          </div>
          <div class="text-primary m-3">${day.day.condition.text}</div>
        </div>
      </div>`;
  }

  // After clearing the container, update the HTML with the new forecast
  if (weatherContainer) {
    weatherContainer.innerHTML += cartona;
  }
}

function clearSearch() {
  var clearSearchh = document.getElementById("search");
  
  // Clear the input field
  clearSearchh.value = ''; 

}

search("cairo")


document.getElementById("findBtn").addEventListener("click",clearSearch)

document.getElementById("search").addEventListener("keyup", a => {
  search(a.target.value)
});