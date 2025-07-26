// Timestamp
document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.getElementById("timestamp");
    const now = new Date().toLocaleDateString();
    timestampInput.value = now;
});

// Modals
function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "block";
  modal.querySelector(".modal-content").focus();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";
}

// Close modals on Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.style.display = "none";
    });
  }
});

const form = document.getElementById('membership-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const businessName = form.businessName.value.trim();
    const timestamp = new Date().toLocaleDateString();

    // Redirect with query params
    const url = new URL('thankyou.html', window.location.origin);
    url.searchParams.append('firstName', firstName);
    url.searchParams.append('lastName', lastName);
    url.searchParams.append('email', email);
    url.searchParams.append('phone', phone);
    url.searchParams.append('businessName', businessName);
    url.searchParams.append('timestamp', timestamp);

    window.location.href = url;
});