// Twemoji
const emo = () => {
    twemoji.parse(document.body, {
        folder: "svg", 
        ext: ".svg"
    });
}
window.addEventListener('load', emo);



// Arrow: Scroll Down Indicator
const scrollDownArrowVis = () => {
    var arrow = document.getElementById('scrollDownArrow');
    var arrowBreakpoint = vh(40);

    if(window.scrollY > arrowBreakpoint) {
        arrow.classList.add('fade-out');
    }
    else {
        arrow.classList.remove('fade-out');
    }
}
window.addEventListener('scroll', scrollDownArrowVis);



// Parallax
let mouse = {
    x : 0,
    y : 0,
}

window.addEventListener('mousemove',(event) => {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
})

const parallaxHeader = () => {
    var tachieBGTop = document.getElementById('tachieBGTop');
    var tachieBGTop = document.getElementById('tachieBGBottom');
    var tachieBGTop = document.getElementById('tachie');
}