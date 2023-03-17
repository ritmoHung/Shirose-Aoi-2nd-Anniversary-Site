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
var tachieBGTop = document.getElementById('tachieBGTop');
var tachieBGBottom = document.getElementById('tachieBGBottom');
var tachie = document.getElementById('tachie');

// * Display parallax on mouseY movements
const tachieParallaxOnMouse = () => {
    var parallaxBreakpoint = vh(100);

    if(window.scrollY < parallaxBreakpoint) {
        var mouseX = event.pageX;
        var optDX = 0.01 * (mouseX - vw(50));
        tachieBGTop.style.transform = "translateX(" + -optDX + "px" + ")";
        tachieBGBottom.style.transform = "translateX(" + 2 * optDX + "px" + ")";
        tachie.style.transform = "translateX(" + 3 * optDX + "px" + ")";
    }
}
window.addEventListener('mousemove', function(event) {
    if(!enableOnOrient) tachieParallaxOnMouse();
});

// * Display parallax on orientaions
var enableOnOrient = false;
function getMotion() {
    // ! This remains touch-enabled Windows laptop with deviceorientation-enabled Chrome
    if(window.DeviceOrientationEvent && 'ontouchstart' in window) {
        // # Request permission for iOS 13+ devices
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == 'granted') {
                enableOnOrient = true;
            }
            else {
                console.log('Permission denied');
                return false;
            }
        });
        enableOnOrient = true;
        console.log('Permission granted');
    }
}

function orientDegScaling(deg) {
    // # Restrict maximum value to ±5deg
    if(deg > 5) deg = 5;
    else if(deg < -5) deg = -5;

    // # Map +5 to 0, -5 to 180
    return ((-18 * deg) + 60);
}

const tachieParallaxOnOrient = () => {
    var parallaxBreakpoint = vh(100);

    
    if(window.scrollY < parallaxBreakpoint) {
        var orientG = event.gamma;
        var optDX = 20 * Math.cos(orientDegScaling(orientG));
        console.log(optDX);
        tachieBGTop.style.transform = "translateX(" + -optDX + "px" + ")";
        tachieBGBottom.style.transform = "translateX(" + 2 * optDX + "px" + ")";
        tachie.style.transform = "translateX(" + 3 * optDX + "px" + ")";
    }
}
getMotion();
window.addEventListener('deviceorientation', function(event) {
    if(enableOnOrient) tachieParallaxOnOrient();
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



const muteToggle = () => {
    var muteBtn = document.getElementById('mute-btn');
    var muteBtnIcon = document.getElementById('mute-btn-icon');
    if(muteBtn.checked) {
        muteBtnIcon.textContent = "volume_mute";
    }
    else {
        muteBtnIcon.textContent = "volume_up";
    }
}



// ? particles.js, cannot get tsParticles to work :(
particlesJS.load('snowflakes', './assets/js/particles-config.json');
particlesJS.load('snowflakes-behind', './assets/js/particles-config.json');

const snowflakeBehindVis = () => {
    if(window.scrollY > vh(60)) {
        var snowflakeBehind = document.getElementById('snowflakes-behind');
        snowflakeBehind.style.display = "none";
    }
    else {
        snowflakeBehind.style.display = "initial";
    }
}