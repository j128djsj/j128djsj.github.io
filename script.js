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
