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
    x: 0,
    y: 0,
}

function MousePosition() {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
}

const parallaxHeader = () => {
    MousePosition();
    var tachieBGTop = document.getElementById('tachieBGTop');
    var tachieBGBottom = document.getElementById('tachieBGBottom');
    var tachie = document.getElementById('tachie');
    var parallaxBreakpoint = vh(100);

    if(window.scrollY < parallaxBreakpoint) {
        var dx = mouse.x - vw(50);
        console.log(mouse.x, dx);
        tachieBGTop.style.left = dx + "px";
        tachieBGBottom.style.left = dx + "px";
        tachie.style.left = dx + "px";
    }
}
window.addEventListener('mousemove', parallaxHeader);