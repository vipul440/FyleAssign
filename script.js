// document.addEventListener("DOMContentLoaded", function () {
//   var form = document.getElementById("taxForm");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     validateInput("income");
//     validateInput("extraIncome");
//     validateSelect("ageGroup");
//     validateInput("deductions");

//     if (form.querySelectorAll(".is-invalid").length > 0) {
//       return false;
//     }

//     form.submit();
//   });

//   function validateInput(inputId) {
//     var input = document.getElementById(inputId);
//     var errorIcon = input.nextElementSibling;

//     if (!/^\d+$/.test(input.value.trim())) {
//       input.classList.add("is-invalid");
//       errorIcon.style.display = "inline-block";
//     } else {
//       input.classList.remove("is-invalid");
//       errorIcon.style.display = "none";
//     }
//   }

//   function validateSelect(selectId) {
//     console.log(selectId);
//     var select = document.getElementById(selectId);
//     var errorIcon = select.parentElement.querySelector(".error-icon");

//     if (!["<40", "40-60", "≥60"].includes(select.value)) {
//       select.classList.add("is-invalid");
//       errorIcon.style.display = "inline-block";
//     } else {
//       select.classList.remove("is-invalid");
//       errorIcon.style.display = "none";
//     }
//   }
//   var tooltips = document.querySelectorAll('[data-bs-tooltip="tooltip"]');
//   tooltips.forEach(function (tooltipEl) {
//     new bootstrap.Tooltip(tooltipEl);
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   var form = document.getElementById("taxForm");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     validateInput("income");
//     validateInput("extraIncome");
//     validateSelect("ageGroup");
//     validateInput("deductions");

//     if (form.querySelectorAll(".is-invalid").length > 0) {

//       return false;
//     }

//     calculateTax();
//   });

//   function validateInput(inputId) {
//     var input = document.getElementById(inputId);
//     var errorIcon = input.nextElementSibling;

//     if (!/^\d+$/.test(input.value.trim())) {
//       input.classList.add("is-invalid");
//       errorIcon.style.display = "inline-block";
//     } else {
//       input.classList.remove("is-invalid");
//       errorIcon.style.display = "none";
//     }
//   }

//   function validateSelect(selectId) {
//     var select = document.getElementById(selectId);
//     var errorIcon = select.parentElement.querySelector(".error-icon");

//     if (!["<40", "40-60", "≥60"].includes(select.value)) {
//       select.classList.add("is-invalid");
//       errorIcon.style.display = "inline-block";
//     } else {
//       select.classList.remove("is-invalid");
//       errorIcon.style.display = "none";
//     }
//   }

//   function calculateTax() {
//     var income = parseInt(document.getElementById("income").value);
//     var extraIncome = parseInt(document.getElementById("extraIncome").value);
//     var ageGroup = document.getElementById("ageGroup").value;
//     var deductions = parseInt(document.getElementById("deductions").value);

//     var totalIncome = income + extraIncome - deductions;
//     var taxDeductions = "After tax deductions";

//     if (totalIncome <= 800000) {
//       taxDeductions += ": No tax";
//     } else {
//       var tax = 0;
//       if (ageGroup === "<40") {
//         tax = 0.3 * (totalIncome - 800000);
//       } else if (ageGroup === "40-60") {
//         tax = 0.4 * (totalIncome - 800000);
//       } else {
//         tax = 0.1 * (totalIncome - 800000);
//       }
//       taxDeductions += ": Tax amount - " + tax.toFixed(2) + " Lakhs";
//     }

//     document.getElementById("overallIncome").textContent =
//       totalIncome.toFixed(2) + " Lakhs";
//     document.getElementById("taxDeductions").textContent = taxDeductions;

//     var taxModal = new bootstrap.Modal(document.getElementById("taxModal"));
//     taxModal.show();
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("taxForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate each input field
    validateInput("income");
    validateInput("extraIncome");
    validateSelect("ageGroup");
    validateInput("deductions");

    // Check if there are any validation errors
    if (form.querySelectorAll(".is-invalid").length > 0) {
      // If there are validation errors, do not submit the form
      return false;
    }

    // If no validation errors, calculate tax and display modal
    calculateTax();
  });

  function validateInput(inputId) {
    var input = document.getElementById(inputId);
    var errorIcon = input.nextElementSibling; // Get the sibling span for error icon

    if (!/^\d+$/.test(input.value.trim())) {
      input.classList.add("is-invalid"); // Add the Bootstrap is-invalid class for styling
      errorIcon.style.display = "inline-block"; // Show the error icon
    } else {
      input.classList.remove("is-invalid"); // Remove the Bootstrap is-invalid class
      errorIcon.style.display = "none"; // Hide the error icon
    }
  }

  function validateSelect(selectId) {
    var select = document.getElementById(selectId);
    var errorIcon = select.parentElement.querySelector(".error-icon");

    if (!["<40", "40-60", "≥60"].includes(select.value)) {
      select.classList.add("is-invalid");
      errorIcon.style.display = "inline-block";
    } else {
      select.classList.remove("is-invalid");
      errorIcon.style.display = "none";
    }
  }

  function calculateTax() {
    var income = parseInt(document.getElementById("income").value);
    var extraIncome = parseInt(document.getElementById("extraIncome").value);
    var ageGroup = document.getElementById("ageGroup").value;
    var deductions = parseInt(document.getElementById("deductions").value);

    var totalIncome = income + extraIncome - deductions;
    var afterTaxIncome =
      totalIncome <= 800000
        ? totalIncome
        : totalIncome - calculateTaxAmount(totalIncome, ageGroup);

    document.getElementById("overallIncome").textContent = afterTaxIncome;

    // Show the modal
    var taxModal = new bootstrap.Modal(document.getElementById("taxModal"), {
      centered: true,
    });
    taxModal.show();
  }

  function calculateTaxAmount(totalIncome, ageGroup) {
    var taxRate = ageGroup === "<40" ? 0.3 : ageGroup === "40-60" ? 0.4 : 0.1;
    return taxRate * (totalIncome - 800000);
  }
});

/*  */
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
