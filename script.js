"use strict";

const citations = {
  enhancement: {
    note: "Published in Digital Signal Processing, Volume 174, article 105987.",
    text: `@article{jiang2026lightweight,
  title = {Lightweight speech enhancement with state-space model and depthwise separable convolution},
  author = {Jiang, Chen and Gao, Dai and Wang, Sirui and Zou, Chengxuan and Liu, Jie},
  journal = {Digital Signal Processing},
  volume = {174},
  pages = {105987},
  year = {2026},
  doi = {10.1016/j.dsp.2026.105987}
}`
  },
  noiselora: {
    note: "Published in Interspeech 2026, pp. 414–418.",
    text: `@inproceedings{gao26_interspeech,
  title = {{NoiseLoRA-SV}: Hierarchical Noise-Conditioned Adaptation with Embedding Distillation for Robust Speaker Verification},
  author = {Gao, Dai and Jiang, Chen and Liu, Sizhe and Zhang, Peng},
  booktitle = {Interspeech 2026},
  year = {2026},
  pages = {414--418},
  doi = {10.21437/Interspeech.2026-64},
  issn = {2958-1796},
  url = {https://www.isca-archive.org/interspeech_2026/gao26_interspeech.html}
}`
  }
};

const dialog = document.getElementById("citation-dialog");
const citationText = document.getElementById("citation-text");
const copyStatus = document.querySelector(".copy-status");
const copyButton = document.getElementById("copy-citation");

document.querySelectorAll("[data-citation]").forEach(button => {
  button.addEventListener("click", () => {
    const citation = citations[button.dataset.citation];
    citationText.textContent = citation.text;
    document.getElementById("citation-note").textContent = citation.note;
    copyStatus.textContent = "";
    dialog.showModal();
    copyButton.focus();
  });
});

document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(citationText.textContent);
    copyStatus.textContent = "BibTeX copied to clipboard.";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citationText);
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = "Text selected. Press Ctrl+C (or ⌘C) to copy.";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// The email icon copies the address instead of relying on a mailto: handler, which silently
// does nothing on machines without a default mail app.
const copyLink = document.querySelector("[data-copy]");
if (copyLink) {
  const emailLabel = copyLink.getAttribute("aria-label");
  const emailTitle = copyLink.title;
  const contactStatus = document.getElementById("contact-status");
  let copyResetTimeout;
  copyLink.addEventListener("click", async event => {
    event.preventDefault();
    const value = copyLink.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      window.clearTimeout(copyResetTimeout);
      copyLink.classList.add("is-copied");
      copyLink.setAttribute("aria-label", "Email address copied to clipboard");
      copyLink.title = "Email copied!";
      contactStatus.textContent = "Email address copied to clipboard.";
      copyResetTimeout = window.setTimeout(() => {
        copyLink.classList.remove("is-copied");
        copyLink.setAttribute("aria-label", emailLabel);
        copyLink.title = emailTitle;
        contactStatus.textContent = "";
      }, 1600);
    } catch {
      // Fall back to the email handler when clipboard access is unavailable.
      window.location.href = copyLink.href;
    }
  });
}

// Keep the celebration local to News and remove every particle after its short animation.
const newsSection = document.getElementById("news");
const celebrateButtons = [...document.querySelectorAll(".celebrate-button")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let celebrationRunning = false;

function celebrate(button) {
  if (celebrationRunning || document.hidden) return;
  celebrationRunning = true;
  button.classList.add("is-celebrating");

  const finish = () => {
    button.classList.remove("is-celebrating");
    celebrationRunning = false;
  };
  if (reducedMotion.matches || typeof Element.prototype.animate !== "function") {
    window.setTimeout(finish, 700);
    return;
  }

  const layer = document.createElement("div");
  layer.className = "celebration-layer";
  layer.setAttribute("aria-hidden", "true");
  newsSection.append(layer);

  const bounds = layer.getBoundingClientRect();
  const origin = button.getBoundingClientRect();
  const x = origin.left + origin.width / 2 - bounds.left;
  const y = origin.top + origin.height / 2 - bounds.top;
  const colors = ["#c58d35", "#41956c", "#e1b85e", "#78ad8b", "#d99073"];
  const animations = [];

  for (let burst = 0; burst < 3; burst += 1) {
    for (let index = 0; index < 16; index += 1) {
      const particle = document.createElement("i");
      particle.className = "firework-particle";
      particle.style.left = `${x + burst * 36}px`;
      particle.style.top = `${y - 12 - burst * 7}px`;
      particle.style.setProperty("--spark-color", colors[(index + burst) % colors.length]);
      layer.append(particle);

      const angle = (index / 16) * Math.PI * 2;
      const distance = 25 + Math.random() * 30;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const animation = particle.animate([
        { transform: "translate(-50%, -50%) scale(0.4)", opacity: 0 },
        { opacity: 0.9, offset: 0.12 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.8)`, opacity: 0.7, offset: 0.65 },
        { transform: `translate(${dx * 1.2}px, ${dy + 20}px) scale(0.2)`, opacity: 0 }
      ], {
        duration: 950,
        delay: burst * 190,
        easing: "cubic-bezier(.15,.55,.4,1)",
        fill: "both"
      });
      animations.push(animation);
    }
  }

  const stopAnimation = () => {
    if (reducedMotion.matches) animations.forEach(animation => animation.cancel());
  };
  reducedMotion.addEventListener("change", stopAnimation);
  Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
    reducedMotion.removeEventListener("change", stopAnimation);
    layer.remove();
    finish();
  });
}

celebrateButtons.forEach(button => button.addEventListener("click", () => celebrate(button)));

if (newsSection && celebrateButtons.length && "IntersectionObserver" in window) {
  const newsObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    celebrate(celebrateButtons[0]);
    newsObserver.disconnect();
  }, { threshold: 0.4 });
  newsObserver.observe(newsSection);
}
