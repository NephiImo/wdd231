const apiKey = 'e419dc634f9609a1b7625b21c2f5ec5c';
const lat = '6.47';
const lon = '3.45';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    if (!data.list || data.list.length === 0) return;

    // Current Weather
    const current = data.list[0];
    const currentTemp = current.main.temp.toFixed(0);
    const description = current.weather[0].description;
    document.getElementById("current-weather").innerHTML = `
      <p><strong>${currentTemp}°F</strong></p>
      <p>${description}</p>
    `;

    // 3-Day Forecast
    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";

    const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    filtered.forEach(day => {
      const date = new Date(day.dt_txt);
      const temp = day.main.temp.toFixed(0);
      const desc = day.weather[0].description;
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

      const li = document.createElement("li");
      li.innerHTML = `<strong>${dayName}</strong>: ${temp}°F - ${desc}`;
      forecastEl.appendChild(li);
    });
  })
  .catch(err => console.error('Weather API Error:', err));


// Member Spotlights
fetch('data/members.json')
  .then(res => res.json())
  .then(data => {
    // console.log("Members data:", data);
    const eligible = data.members.filter(m => m.membership === 1 || m.membership === 2);
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const spotlightCount = Math.floor(Math.random() * 2) + 2;
    const spotlightMembers = shuffled.slice(0, spotlightCount);
    
    const getMembershipLevels = {
        1: "Gold",
        2: "Silver"
    };

    const spotlightSection = document.querySelector(".spotlight-container");
    spotlightSection.innerHTML = "";

    spotlightMembers.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="badge ${member.membership === 1 ? 'gold' : 'silver'}">
        ${member.membership === 1 ? 'Gold' : 'Silver'}  Member
        </p>
      `;
      spotlightSection.appendChild(card);
    });
  })
  .catch(err => console.error('Members JSON Error:', err));
