// Adapted from https://github.com/RagnarGrootKoerkamp/research/blob/master/static/js/toc.js

let paragraphs = [...document.querySelectorAll("main > *")];
const links = [...document.querySelectorAll(".floating-toc a")];
const idEntry = paragraphs.reduce((acc, par) => {
  let p = par;
  while (p && !p.matches("h1, h2, h3")) {
    p = p.previousElementSibling;
  }
  const id = p?.id;
  if (id) {
    par.headingId = id;
    const entry = links.find((a) => decodeURIComponent(a.hash) === "#" + id).closest("li");
    acc.set(id, entry);
  }
  return acc;
}, new Map());

let parState = new Map();
let idActive = new Map();
let parentActive = new Map();
const observer = new IntersectionObserver((updates) => {
  idActive.clear();
  parentActive.clear();
  updates.forEach((update) => {
    const par = update.target;
    parState.set(par, update);
  });
  parState.forEach((state, par) => {
    const id = par.headingId;
    if (id && idActive.get(id) !== true) {
      idActive.set(id, state.isIntersecting);
    }
  });
  idActive.forEach((active, id) => {
    if (active === true) {
      idEntry.get(id)?.classList.add("active");
      let parentElem = idEntry.get(id).parentElement.closest("li");
      while (parentElem) {
        parentActive.set(parentElem, true);
        parentElem = parentElem.parentElement.closest("li");
      }
    } else {
      idEntry.get(id)?.classList.remove("active");
      let parentElem = idEntry.get(id).parentElement.closest("li");
      while (parentElem) {
        if (parentActive.get(parentElem) !== true) {
          parentActive.set(parentElem, false);
        }
        parentElem = parentElem.parentElement.closest("li");
      }
    }
  });
  parentActive.forEach((active, parentElem) => {
    if (active === true) {
      parentElem?.classList.add("active-parent");
    } else {
      parentElem?.classList.remove("active-parent");
    }
  });
},
  { threshold: 0 }
);
paragraphs.forEach((par) => observer.observe(par));
