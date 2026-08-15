(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Fade-in on load ---------- */
  function initFade() {
    var items = document.querySelectorAll(".fade-item");
    if (!items.length) return;

    if (prefersReducedMotion) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    items.forEach(function (el, i) {
      el.style.setProperty("--delay", (i * 90) + "ms");
      el.classList.add("is-in");
    });
  }

  /* ---------- Accordion (single open per group) ---------- */
  function initAccordion() {
    var chapters = document.querySelectorAll(".chapter");
    if (!chapters.length) return;

    chapters.forEach(function (chapter) {
      var toggle = chapter.querySelector(".chapter__toggle");
      if (!toggle) return;

      toggle.addEventListener("click", function () {
        var isOpen = chapter.classList.contains("is-open");
        var group = chapter.closest(".chapters");

        if (group) {
          group.querySelectorAll(".chapter.is-open").forEach(function (openChapter) {
            if (openChapter !== chapter) {
              closeChapter(openChapter);
            }
          });
        }

        if (isOpen) {
          closeChapter(chapter);
        } else {
          openChapter(chapter);
        }
      });
    });
  }

  function openChapter(chapter) {
    var toggle = chapter.querySelector(".chapter__toggle");
    chapter.classList.add("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function closeChapter(chapter) {
    var toggle = chapter.querySelector(".chapter__toggle");
    chapter.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  /* ---------- Reveal the secret ---------- */
  function initReveal() {
    var reveal = document.querySelector(".reveal");
    if (!reveal) return;

    var controls = reveal.querySelector(".reveal__controls");
    var confirmBox = reveal.querySelector(".reveal__confirm");
    var answer = reveal.querySelector(".reveal__answer");
    var openBtn = reveal.querySelector(".reveal__open");
    var yesBtn = reveal.querySelector(".reveal__yes");
    var noBtn = reveal.querySelector(".reveal__no");

    if (!openBtn || !confirmBox || !answer) return;

    openBtn.addEventListener("click", function () {
      if (controls) controls.hidden = true;
      confirmBox.hidden = false;
      var yes = confirmBox.querySelector(".reveal__yes");
      if (yes) yes.focus();
    });

    if (noBtn) {
      noBtn.addEventListener("click", function () {
        confirmBox.hidden = true;
        if (controls) { controls.hidden = false; openBtn.focus(); }
      });
    }

    if (yesBtn) {
      yesBtn.addEventListener("click", function () {
        confirmBox.hidden = true;
        answer.hidden = false;
        requestAnimationFrame(function () {
          answer.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFade();
    initAccordion();
    initReveal();
  });
})();
