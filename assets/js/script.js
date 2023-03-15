// Twemoji
const emo = () => {
    twemoji.parse(document.body, {
        folder: "svg", 
        ext: ".svg"
    });
}
window.addEventListener('load', emo);



// Parallax Sizing
const tachieSizing = () => {
    var tachieContainers = document.querySelectorAll('.tachie-container');
    var viewportRatio = vw(100) / vh(100);
    var imageRatio = 15 / 9;

    if(viewportRatio > imageRatio) {
        var rescale = 0.98 * (viewportRatio / imageRatio);
        for(var index = 0; index < tachieContainers.length; index++) {
            tachieContainers[index].style.transform = "scale(" + rescale + ")";
        }
    }
    else {
        for(var index = 0; index < tachieContainers.length; index++) {
            tachieContainers[index].style.transform = "none";
        }
    }
}
window.addEventListener('load', tachieSizing);
window.addEventListener('resize', tachieSizing);



// Parallax
let mouse = {
    x: 0,
    y: 0
}

var hasGyro = false;
let rotate = {
    alpha: 0,
    beta: 0,
    gamma: 0
}

var tachieBGTop = document.getElementById('tachieBGTop');
var tachieBGBottom = document.getElementById('tachieBGBottom');
var tachie = document.getElementById('tachie');

function getMousePosX() {
    mouse.x = event.pageX;
}
function requestMotionPermission() {
    // Request permission for iOS 13+ devices
    if( DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission();
    }
}
function getGyro() {
    if(event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
        hasGyro = true;
    }
}
function getRotateAlpha() {
    rotate.alpha = event.alpha;
}
window.addEventListener('devicemotion', getGyro);

const tachieParallaxOnGyro = () => {
    var parallaxBreakpoint = vh(100);

    if(window.scrollY < parallaxBreakpoint) {
        getRotateAlpha();
        var optDX = 0;
        console.log(rotate.alpha, mouse.x);
    }
}
const tachieParallaxOnMouse = () => {
    var parallaxBreakpoint = vh(100);

    if(window.scrollY < parallaxBreakpoint) {
        getMousePosX();
        var optDX = 0.01 * (mouse.x - vw(50));
        tachieBGTop.style.transform = "translateX(" + -optDX + "px" + ")";
        tachieBGBottom.style.transform = "translateX(" + 2 * optDX + "px" + ")";
        tachie.style.transform = "translateX(" + 3 * optDX + "px" + ")";
    }
}
window.addEventListener('load', requestMotionPermission);
window.addEventListener('devicemotion', function(event) {
    if(hasGyro) tachieParallaxOnGyro();
});
window.addEventListener('mousemove', function(event) {
    if(!hasGyro) tachieParallaxOnMouse();
});



// Arrow: Scroll Down Indicator
const scrollDown = () => {
    document.documentElement.scrollTop = vh(100);
}
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



/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', './assets/js/particles-config.json', function() {
    console.log('callback - particles.js config loaded');
});