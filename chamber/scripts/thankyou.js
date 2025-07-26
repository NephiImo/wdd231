document.addEventListener("DOMContentLoaded", () =>{
    const params = new URLSearchParams(window.location.search);

    document.getElementById("firstName").textContent = params.get("firstName") || "N/A";
    document.getElementById("lastName").textContent = params.get("lastName") || "N/A";
    document.getElementById("email").textContent = params.get("email") || "N/A";
    document.getElementById("phone").textContent = params.get("phone") || "N/A";
    document.getElementById("businessName").textContent = params.get("businessName") || "N/A";
    document.getElementById("timestamp").textContent = params.get("timestamp") || new Date().toLocaleString();
});