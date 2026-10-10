/* ==========================================================================
   Mindful Care Living — small helpers for the website
   --------------------------------------------------------------------------
   You do not need to edit this file. The one setting you might change is
   the email address that tour requests are sent to (TOUR_EMAIL below).
   The site still works if JavaScript is turned off.
   ========================================================================== */

(function () {
  "use strict";

  // Tour requests from the contact page are emailed to this address.
  var TOUR_EMAIL = "contact@mindfulcareliving.com";
  var PHONE_DISPLAY = "(612) 483-1978";

  var root = document.documentElement;

  /* ---------- Mobile menu ---------- */
  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        menuButton.focus();
      }
    });
  }

  /* ---------- Current year in the footer ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Gallery: view a larger photo ---------- */
  var lightbox = document.getElementById("lightbox");

  if (lightbox && typeof lightbox.showModal === "function") {
    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector(".lightbox__caption");
    var lastTrigger = null;

    document.querySelectorAll("[data-lightbox]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var img = link.querySelector("img");
        var caption = link.closest("figure").querySelector(".gallery__title");
        lightboxImg.src = link.getAttribute("href");
        lightboxImg.alt = img ? img.alt : "";
        lightboxCaption.textContent = caption ? caption.textContent : "";
        lastTrigger = link;
        lightbox.showModal();
      });
    });

    lightbox.querySelector(".lightbox__close").addEventListener("click", function () {
      lightbox.close();
    });

    // Clicking the dark area around the photo also closes it
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener("close", function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- Tour request form ---------- */
  var form = document.getElementById("tour-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var submitButton = form.querySelector('button[type="submit"]');
  var dateInput = form.querySelector("#tour-date");

  // Turn off the browser's own pop-up messages; we show clearer ones under each box.
  form.setAttribute("novalidate", "");

  function todayISO() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  if (dateInput) dateInput.min = todayISO();

  function setError(input, message) {
    var errorEl = document.getElementById(input.id + "-error");
    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function validate(input) {
    var value = input.value.trim();
    var message = "";

    if (input.id === "tour-name" && !value) {
      message = "Please enter your name.";
    } else if (input.id === "tour-phone") {
      var digits = value.replace(/\D/g, "");
      if (!value) message = "Please enter a phone number so we can call you.";
      else if (digits.length < 10) message = "Please enter a full phone number, including area code.";
    } else if (input.id === "tour-email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Please check the email address (for example, name@example.com) or leave it blank.";
    } else if (input.id === "tour-date") {
      if (!value) {
        message = "Please choose a date for your visit.";
      } else if (value < todayISO()) {
        message = "Please choose today or a future date.";
      } else if (new Date(value + "T12:00:00").getDay() === 0) {
        message = "Tours are Monday to Saturday. Please choose a different day.";
      }
    }

    setError(input, message);
    return !message;
  }

  var fields = form.querySelectorAll("#tour-name, #tour-phone, #tour-email, #tour-date");

  fields.forEach(function (input) {
    input.addEventListener("blur", function () {
      if (input.value.trim() || input.hasAttribute("aria-invalid")) validate(input);
    });
    input.addEventListener("input", function () {
      if (input.hasAttribute("aria-invalid")) validate(input);
    });
  });

  function showStatus(kind, html) {
    status.className = "form-status is-" + kind;
    status.innerHTML = html;
    status.setAttribute("tabindex", "-1");
    status.focus();
  }

  function formatDate(iso) {
    try {
      return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric"
      });
    } catch (e) {
      return iso;
    }
  }

  function escapeHTML(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    var firstInvalid = null;
    fields.forEach(function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var payload = {};
    data.forEach(function (value, key) { payload[key] = value; });
    payload["Preferred date (written out)"] = formatDate(String(data.get("preferred_date")));

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";

    fetch("https://formsubmit.co/ajax/" + TOUR_EMAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function (result) {
        if (result && (result.success === false || result.success === "false")) {
          throw new Error(result.message || "Request failed");
        }
        form.reset();
        showStatus(
          "success",
          "Thank you, " + escapeHTML(name) + "! We received your tour request and will call you soon to confirm a time. " +
          'If you would like to talk sooner, call us at <a href="tel:+16124831978">' + PHONE_DISPLAY + "</a>."
        );
      })
      .catch(function () {
        showStatus(
          "error",
          "Sorry, your request could not be sent. Please call us at " +
          '<a href="tel:+16124831978">' + PHONE_DISPLAY + "</a> or email " +
          '<a href="mailto:' + TOUR_EMAIL + '">' + TOUR_EMAIL + "</a> and we will set up your tour."
        );
      })
      .then(function () {
        submitButton.disabled = false;
        submitButton.textContent = "Send Tour Request";
      });
  });
})();
