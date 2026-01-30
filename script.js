// simple fade-in animation
document.body.style.opacity = 0;

window.onload = () => {
  document.body.style.transition = "1s";
  document.body.style.opacity = 1;
};

// Initialize EmailJS
emailjs.init("LJedAFhZBtiYZDxjD"); // your user ID

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const successMsg = document.getElementById("success-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  sendBtn.innerText = "Sending...";
  sendBtn.disabled = true;

  emailjs
    .sendForm(
      "service_h1sdels",      // your service ID
      "template_k42wqsw",     // your template ID
      this
    )
    .then(() => {
      sendBtn.innerText = "Sent ✔";
      successMsg.classList.remove("hidden"); // show success message
      sendBtn.classList.add("sent"); // optional: add a class for styling

      form.reset(); // reset form fields

      setTimeout(() => {
        sendBtn.innerText = "Send Message";
        sendBtn.disabled = false;
        successMsg.classList.add("hidden");
        sendBtn.classList.remove("sent");
      }, 3000);
    })
    .catch((error) => {
      alert("❌ Message failed. Please try again.");
      sendBtn.innerText = "Send Message";
      sendBtn.disabled = false;
      console.error(error);
    });
});
