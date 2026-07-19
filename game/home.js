const levelEditter = document.createElement("button");
levelEditter.innerHTML = "levelEditter";

levelEditter.style.position = "absolute"; 

levelEditter.style.top = `${window.innerHeight / 2}px`; 

levelEditter.style.left =`${(window.innerWidth /2)-200}px`; 
levelEditter.style.zIndex = "10"; 

levelEditter.onclick = function() {
  alert("in devloping!");
};
const play = document.createElement("button");
play.innerHTML = "play";

play.style.position = "absolute"; 

play.style.top = `${window.innerHeight / 2}px`; 

play.style.left =`${(window.innerWidth /2)+200}px`; 
play.style.zIndex = "10"; 

play.onclick = function() {
  window.location.href = ("game.html");
};
document.body.appendChild(play);


const expor = document.createElement("button");
expor.innerHTML = "expor";

expor.style.position = "absolute"; 

expor.style.top = `${window.innerHeight / 2}px`; 

expor.style.left =`${(window.innerWidth /2)}px`; 
expor.style.zIndex = "10"; 

expor.onclick = function() {
 alert("in devloping!")
};
document.body.appendChild(play);
document.body.appendChild(expor);
document.body.appendChild(levelEditter);

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  colorMode(RGBHDR);
}

function draw() {
  background(192.7);
}
