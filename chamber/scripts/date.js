// Current Year in Footer
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// Last Modified Date
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;