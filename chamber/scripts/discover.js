document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("discoverGrid");

    fetch("data/places.json")
        .then((response) => response.json())
        .then((data) => {
            data.places.forEach((place) => {
                const card = document.createElement("section");
                card.classList.add("discover-card");

                const title = document.createElement("h2");
                title.textContent = place.title || place.name;

                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = place.image;
                img.alt = place.imageAlt;
                figure.appendChild(img);

                const address = document.createElement("address");
                address.textContent = place.address;

                const desc = document.createElement("p");
                desc.textContent = place.description;

                const btn = document.createElement("button");
                btn.textContent = place.link;

                card.append(title, figure, address, desc, btn);
                grid.appendChild(card);
            });
        })
        .catch((err) => {
            console.error("Error loading places:", err);
        });

        // LocalStorage: Last visit logic
        const visitDisplay = document.getElementById("lastVisit");
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();

        if (!lastVisit) {
            visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
        }   else {
            const diff = now - parseInt(lastVisit);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            if(days < 1) {
                visitDisplay.textContent = "Back so soon! Awesome!";
            }   else if (days ===1) {
                visitDisplay.textContent = "You last visited 1 day ago.";
            }   else {
                visitDisplay.textContent = `You last visited ${days} days ago.`;
            }
        }

        localStorage.setItem("lastVisit", now);
});