// * Twemoji replacing
const emo = () => {
    twemoji.parse(document.body, {
        folder: "svg", 
        ext: ".svg"
    });
}
window.addEventListener('load', emo);



// * Parallax Sizing
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



// * Parallax
var tachieBGTop = document.getElementById('tachieBGTop');
var tachieBGBottom = document.getElementById('tachieBGBottom');
var tachie = document.getElementById('tachie');

// * Display parallax on mouseY movements
const tachieParallaxOnMouse = () => {
    if(window.scrollY < vh(100)) {
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

// * Mobile Detection
var enableOnOrient = false;
function getMotion() {
    // ! This remains touch-enabled Windows laptop with deviceorientation-enabled Chrome
    if(window.DeviceOrientationEvent && 'ontouchstart' in window) {
        // # Request permission for iOS 13+ devices needs user gesture to prompt
        // # therefore enableOnOrient is directly set to true here
        console.log('Permission granting not needed for devices other than iPhone X or above');
        enableOnOrient = true;
    }
}
// * iOS Mobile permission granting
const getMotionOnIOS = () => {
    // # Request permission for iOS 13+ devices
    if(isiOSMobile && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == 'granted') {
                console.log('Permission granted');
                enableOnOrient = true;
            }
            else {
                console.log('Permission denied');
                return false;
            }
        });
    }
    // # Closes the motion-preloader regardlessly, then enable body scroll
    var iosMotionPreloader = document.getElementById('ios-motion-preloader');
    iosMotionPreloader.classList.add('fade-out');
    document.body.classList.remove('unscrollable');
    sleep(200).then(() => { iosMotionPreloader.style.display = "none"; });
}
if(!isiOSMobile) {
    getMotion();
}

function clamp(val, min, max) {
    return (val > max) ? max : ((val < min) ? min : val);
}

// * Display parallax on orientaions
const tachieParallaxOnOrient = () => {
    if(window.scrollY < vh(100)) {
        let orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
        switch(orientation) {
            case "portrait-primary":
                var orientDeg = event.gamma;
                break;

            case "portrait-secondary":
                var orientDeg = -(event.gamma);
                break;

            case "landscape-primary":
                var orientDeg = event.beta;
                break;

            case "landscape-secondary":
                var orientDeg = -(event.beta);
                break;

            default:
                break;
        }
        orientDeg = orientDeg.toFixed(3);
        var limit = 0.25 * vw(10);
        var optDX = clamp(0.2 * (orientDeg % 360), -limit, limit);

        tachieBGTop.style.transform = "translateX(" + optDX + "px" + ")";
        tachieBGBottom.style.transform = "translateX(" + (-2 * optDX) + "px" + ")";
        tachie.style.transform = "translateX(" + (-3 * optDX) + "px" + ")";
    }
}
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