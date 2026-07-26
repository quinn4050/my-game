const activeKeys = {};

document.KeyIsDown = function(codeName) {
  return activeKeys[codeName] === true;
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
  }
  activeKeys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  activeKeys[e.code] = false;
});
