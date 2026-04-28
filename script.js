const OWNER_EMAIL = "nickeditzzz13@gmail.com";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

const orderForm = document.getElementById("order-form");
const statusEl = document.getElementById("status");

if (orderForm) {
  const isConfigured = !OWNER_EMAIL.includes("replace-with-your-email");
  const isFilePreview = window.location.protocol === "file:";

  if (isConfigured) orderForm.action = `https://formsubmit.co/${OWNER_EMAIL}`;

  if (isFilePreview) {
    statusEl.textContent =
      "Form submit is blocked on file preview. Use your live site link to place real orders.";
  } else if (!isConfigured) {
    statusEl.textContent = "Set your real email in script.js to activate order emails.";
  } else {
    statusEl.textContent =
      "Quick flow: pay by Interac, upload files, submit. Orders go to nickeditzzz13@gmail.com.";
  }

  orderForm.addEventListener("submit", (event) => {
    if (isFilePreview) {
      event.preventDefault();
      statusEl.textContent = "Use your live site link (not file://) to submit orders.";
      return;
    }

    if (isConfigured) {
      statusEl.textContent = "Sending order... edit starts after payment is verified.";
    }
  });

  orderForm.addEventListener(
    "invalid",
    () => {
      statusEl.textContent = "Complete all required fields before submitting.";
    },
    true
  );
}
