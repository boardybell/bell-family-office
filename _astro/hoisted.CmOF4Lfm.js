document.querySelectorAll("img.lazy").forEach(e=>{e.complete?e.classList.add("loaded"):e.addEventListener("load",()=>e.classList.add("loaded"))});
