const apiKey = '11b4dd143d7713cca2c7a9d1aadce931';

$('#get-weather').click(function () {
  const city = $('#city-input').val();
  if (!city) return alert('Please enter a city name.');

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log("Fetching from URL:", apiUrl);

  $.getJSON(apiUrl, function (data) {
    console.log("API Response:", data);

    const location = `${data.name}, ${data.sys.country}`;
    const weather = data.weather[0].description;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = `${data.main.temp.toFixed(1)} °C`;

    $('#weather-display').html(`
      <h2>${location}</h2>
      <img src="${iconUrl}" alt="${weather}" />
      <p><strong>Weather:</strong> ${weather}</p>
      <p><strong>Temperature:</strong> ${temp}</p>
    `);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("Request Failed:", jqXHR.responseText);
    $('#weather-display').html(`<p>City not found or invalid API key. (${jqXHR.status})</p>`);
  });
});
