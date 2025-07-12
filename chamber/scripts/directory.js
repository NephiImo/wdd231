const directoryContainer = document.getElementById("directory");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function getDirectoryData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayDirectory(data.members);
}

function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return "Member";
        case 2:
            return "Silver";
        case 3:
            return "Gold";
        default:
            return "Unknown";
    }
}

function displayDirectory(members) {
    directoryContainer.innerHTML="";
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("business-card");

        if (member.membership === 3) {
            card.classList.add("gold");
        } else if (member.membership === 2) {
            card.classList.add("silver");
        } else {
            card.classList.add("member");
        }

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">Membership: ${getMembershipLevel(member.membership)}</p>
        `;
        directoryContainer.appendChild(card)
    });
}

gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid");
    directoryContainer.classList.remove("list");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list");
    directoryContainer.classList.remove("grid");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

getDirectoryData();