const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const cardFields = document.querySelectorAll(".card-field");
const sameAsBilling = document.getElementById("sameAsBilling");
const shippingFields = document.getElementById("shippingFields");
const form = document.getElementById("paymentForm");

function toggleCardFields() {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  const disableCards = selectedMethod === "PayPal";

  cardFields.forEach(field => {
    field.disabled = disableCards;

    if (disableCards) {
      field.classList.add("disabled");
      field.value = "";
      field.setCustomValidity("");
    } else {
      field.classList.remove("disabled");
    }
  });
}

paymentMethods.forEach(method => {
  method.addEventListener("change", toggleCardFields);
});

toggleCardFields();

sameAsBilling.addEventListener("change", () => {
  if (sameAsBilling.checked) {
    shippingFields.classList.add("d-none");
  } else {
    shippingFields.classList.remove("d-none");
  }
});

function validateEmail() {
  const email = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value.trim())) {
    email.setCustomValidity("Please enter a valid email address");
  } else {
    email.setCustomValidity("");
  }
}

document.getElementById("email").addEventListener("input", validateEmail);

function validateCardFields() {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  const cardNumber = document.getElementById("cardNumber");
  const expiry = document.getElementById("expiry");
  const cvv = document.getElementById("cvv");

  if (selectedMethod !== "PayPal") {
    if (!cardNumber.value.trim()) {
      cardNumber.setCustomValidity("Card number is required");
    } else {
      cardNumber.setCustomValidity("");
    }

    if (!expiry.value.trim()) {
      expiry.setCustomValidity("Expiry date is required");
    } else {
      expiry.setCustomValidity("");
    }

    if (!cvv.value.trim()) {
      cvv.setCustomValidity("CVV is required");
    } else {
      cvv.setCustomValidity("");
    }
  }
}

form.addEventListener("submit", function (e) {
  validateEmail();
  validateCardFields();

  const requiredFields = [
    document.getElementById("name"),
    document.getElementById("address"),
    document.getElementById("city"),
    document.getElementById("state"),
    document.getElementById("postalCode"),
    document.getElementById("email"),
    document.getElementById("country")
  ];

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.setCustomValidity("This field is required");
    } else if (field.id !== "email") {
      field.setCustomValidity("");
    }
  });

  if (!sameAsBilling.checked) {
    const shippingInputs = shippingFields.querySelectorAll("input");
    shippingInputs.forEach(field => {
      if (!field.value.trim()) {
        field.setCustomValidity("Please fill out this shipping field");
      } else {
        field.setCustomValidity("");
      }
    });
  }

  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
  }
});