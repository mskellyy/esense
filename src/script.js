// fade in up, right, left

const elementsToAnimate = document.querySelectorAll(".a-right, .a-left, .a-up");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  },
  { threshold: 0.1 }
);

elementsToAnimate.forEach((element) => observer.observe(element));

// form

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    let selectedServices = [];

    form
      .querySelectorAll("input[name='services']:checked")
      .forEach((checkbox) => {
        selectedServices.push(checkbox.value);
      });

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      brandName: formData.get("brandName"),
      website: formData.get("website"),
      referral: formData.get("referral"),
      services: selectedServices,
      vision: formData.get("vision"),
      budget: formData.get("budget"),
      launchDate: formData.get("launchDate"),
      whyUs: formData.get("whyUs"),
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbyuGVX4-qEDjsTXuXWuPhZ-wAS_j-PeEkprTiMGcIWaaWpf8gLzQVoXCxT4w-azH3sUfQ/exec",
      {
        method: "POST",
        mode: "no-cors", // This prevents the browser from blocking the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => console.log("Form submitted successfully"))
      .catch((error) => console.error("Error:", error));
  });
});

// Word animation
document.addEventListener("DOMContentLoaded", function () {
  const phrases = [
    "work harder than you do.",
    "feel like home to the right people.",
    "speak before you say a word.",
    "make sense.",
  ];

  let textElement = document.querySelector(".typing-text");
  let cursor = document.querySelector(".cursor");
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    let currentPhrase = phrases[index];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex--);
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % phrases.length; // Move to the next phrase
      setTimeout(typeEffect, 500); // Pause before typing the next phrase
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing & deleting speed
    }
  }

  typeEffect();
});
