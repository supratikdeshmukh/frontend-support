// ✅ Navbar Toggle with Icon Change
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", function () {
  navLinks.classList.toggle("show");

  // ✅ Toggle between bars and times icon
  if (navLinks.classList.contains("show")) {
    menuIcon.innerHTML = '<i class="fas fa-times"></i>'; // Cross icon
  } else {
    menuIcon.innerHTML = '<i class="fas fa-bars"></i>'; // Hamburger icon
  }
});

// ✅ Multi-step Form Logic
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const formSteps = document.querySelectorAll(".form-step");
let currentStep = 0;

// ✅ Restrict phone input to digits only and max 10 chars
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
  });
}

nextBtn.addEventListener("click", () => {
  const inputs = formSteps[currentStep].querySelectorAll("[required]");
  let allValid = true;

  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      allValid = false;
      break;
    }
  }

  if (allValid) {
    formSteps[currentStep].classList.remove("active");
    currentStep++;
    formSteps[currentStep].classList.add("active");
  }
});

prevBtn.addEventListener("click", () => {
  formSteps[currentStep].classList.remove("active");
  currentStep--;
  formSteps[currentStep].classList.add("active");
});

// ✅ AJAX Form Submission
document
  .getElementById("multiStepForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch("php/save.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        const msg = document.getElementById("formMessage");
        msg.innerHTML = data;

        // Auto-clear message after 4 seconds
        setTimeout(() => {
          msg.innerHTML = "";
        }, 4000);

        this.reset();
        formSteps[currentStep].classList.remove("active");
        currentStep = 0;
        formSteps[currentStep].classList.add("active");
      })
      .catch((err) => {
        document.getElementById("formMessage").innerHTML =
          "<span style='color:red;'>❌ An error occurred.</span>";
      });
  });
