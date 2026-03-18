/* ===========================
   FADE IN ON LOAD
=========================== */
document.body.style.opacity = 0;
window.addEventListener("load", () => {
  document.body.style.transition = "opacity 0.8s ease";
  document.body.style.opacity = 1;
});

/* ===========================
   SCROLL REVEAL (Intersection Observer)
=========================== */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards in the same grid
        const siblings = entry.target.parentElement.querySelectorAll(".reveal");
        siblings.forEach((el, idx) => {
          if (el === entry.target) {
            setTimeout(() => el.classList.add("visible"), idx * 80);
          }
        });
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ===========================
   ACTIVE BOTTOM NAV HIGHLIGHT
=========================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".bottom-nav a i");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((icon) => {
          const link = icon.parentElement;
          const href = link.getAttribute("href");
          icon.style.color = href === `#${id}` ? "#818cf8" : "#475569";
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => navObserver.observe(s));

/* ===========================
   EMAILJS CONTACT FORM
=========================== */
emailjs.init("LJedAFhZBtiYZDxjD");

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  sendBtn.innerText = "Sending...";
  sendBtn.disabled = true;

  emailjs
    .sendForm("service_h1sdels", "template_k42wqsw", this)
    .then(() => {
      sendBtn.innerText = "Sent ✔";
      successMsg.classList.remove("hidden");
      form.reset();
      setTimeout(() => {
        sendBtn.innerText = "Send Message";
        sendBtn.disabled = false;
        successMsg.classList.add("hidden");
      }, 4000);
    })
    .catch((error) => {
      alert("❌ Message failed. Please try again.");
      sendBtn.innerText = "Send Message";
      sendBtn.disabled = false;
      console.error(error);
    });
});
