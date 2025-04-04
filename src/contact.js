document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to allow validation

    let formError = document.getElementById("formError");
    formError.textContent = ""; // Clear previous errors

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let brandName = document.getElementById("brandName").value;
    let website = document.getElementById("website").value;
    let referral = document.getElementById("referral").value;
    let vision = document.getElementById("vision").value;
    let budget = document.getElementById("budget").value;
    let whyUs = document.getElementById("whyUs").value;

    // Check required fields
    if (
      !name ||
      !email ||
      !brandName ||
      !referral ||
      !vision ||
      !budget ||
      !whyUs
    ) {
      formError.textContent =
        "Please fill in all required fields marked with *.";
      return;
    }

    // Check if any services are selected
    let selectedServices = [];
    let checkboxes = document.querySelectorAll(
      'input[name="services"]:checked'
    );
    checkboxes.forEach(function (checkbox) {
      selectedServices.push(checkbox.value);
    });

    if (selectedServices.length === 0) {
      formError.textContent = "Please select at least one service.";
      return;
    }

    // Prepare data to send to the Google Apps Script
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("brandName", brandName);
    formData.append("website", website);
    formData.append("referral", referral);
    formData.append("services", selectedServices);
    formData.append("vision", vision);
    formData.append("budget", budget);
    formData.append("launchDate", document.getElementById("launchDate").value);
    formData.append("whyUs", whyUs);

    // THIS AREA is important >>> the URL after 'fetch' needs to be the URL you get after deployment from your personal AppScript you're working with. The one currently on there was from
    // my makeshift form. REPLACE with your DEPLOYMENT URL, NOT ID.

    // Send the data to Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbwlOAr9xN-mL7AVfxwbutm2YRD1EI3Ffmoji0TRprj_1JslUum-GE-9uwOTFBPBjpN-8A/exec",
      {
        // Replace with your Apps Script Web App URL
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("Your form has been submitted successfully!");
        document.getElementById("contactForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting your form.");
      });
  });
