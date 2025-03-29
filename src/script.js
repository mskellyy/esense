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

    fetch("YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((result) => {
        alert("Form submitted successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
      });
  });
});
