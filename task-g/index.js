// index.js
// Author: Wiivi Röning
// Date: 2025-10-25
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#registrations tbody");
  const timestampInput = document.getElementById("timestamp");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    timestampInput.value = new Date().toLocaleString();

    // Clear old errors
    form.querySelectorAll(".error").forEach(el => el.textContent = "");

    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const birth = form.birthDate.value;
    const terms = form.terms.checked;

    let valid = true;

    // Full name: at least 2 words, each ≥ 2 chars
    if (!name || name.split(" ").length < 2 || !name.split(" ").every(w => w.length >= 2)) {
      document.getElementById("error-name").textContent =
        "Please enter your full name (at least two words, each 2+ characters).";
      valid = false;
    }

    // Email: basic pattern + type=email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("error-email").textContent =
        "Please enter a valid email address (e.g., name@example.com).";
      valid = false;
    }

    // Phone: Finnish format +358 followed by 7–10 digits
    const phonePattern = /^\+358\d{7,10}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById("error-phone").textContent =
        "Phone must start with +358 and contain 7–10 digits (no spaces).";
      valid = false;
    }

    // Birth date: not in future, at least 13 years old
    const birthDate = new Date(birth);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    if (!birth || birthDate > today || birthDate > minAgeDate) {
      document.getElementById("error-birth").textContent =
        "Birth date must be valid and age at least 13 years.";
      valid = false;
    }

    // Terms must be checked
    if (!terms) {
      document.getElementById("error-terms").textContent =
        "You must accept the terms to register.";
      valid = false;
    }

    if (!valid) return;

    // Append new row to the table
    const row = document.createElement("tr");
    [timestampInput.value, name, email, phone, birth].forEach((val) => {
      const cell = document.createElement("td");
      cell.textContent = val;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    form.reset();
  });
});

