// * Twemoji replacing ------------------------------------------------------------------
const emo = () => {
    twemoji.parse(document.body, {
        folder: "svg", 
        ext: ".svg"
    });
}
window.addEventListener('load', emo);



// * Parallax Sizing --------------------------------------------------------------------
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




// * Mobile Detection -------------------------------------------------------------------
// ! Permission preloader now shows regardless of devices
let isiOSMobile = (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
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
if(!isiOSMobile) {
    getMotion();
}

// * Audio & iOS motion permission granting
var audioBGM = new Audio('./assets/audio/DEMO_128K.mp3');
function playBGM() {
    audioBGM.currentTime = 0;
    audioBGM.play();
}
const getAllPermission = () => {
    // # Request motion permission for iOS 13+ devices
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
    var iosMotionPreloader = document.getElementById('permission-preloader');
    iosMotionPreloader.classList.add('fade-out');
    document.body.classList.remove('unscrollable');
    sleep(200).then(() => { iosMotionPreloader.style.display = "none"; });
    // # ... then play the BGM. Nice work-around lol
    playBGM();
}
audioBGM.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
})

function clamp(val, min, max) {
    return (val > max) ? max : ((val < min) ? min : val);
}

// * Display parallax on orientaions
function getOrientation() {
    if(!isiOSMobile) {
        return (screen.orientation.type || screen.mozOrientation || screen.msOrientation);
    }
    else {
        return window.orientation;
    }
}
const tachieParallaxOnOrient = () => {
    if(window.scrollY < vh(100)) {
        let orientation = getOrientation();
        if(orientation === "portrait-primary" ||
            orientation === 0) {
            var orientDeg = (event.gamma).toFixed(3);
        }
        else if(orientation === "landscape-primary" ||
                orientation === 90) {
            var orientDeg = (event.beta).toFixed(3);
        }
        else if(orientation === "portrait-secondary" ||
                orientation === 180) {
            var orientDeg = -(event.gamma).toFixed(3);
        }
        else if(orientation === "landscape-secondary" ||
                orientation === -90) {
            var orientDeg = -(event.beta).toFixed(3);
        }
        else {
            var orientDeg = (event.gamma).toFixed(3);
        }
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



// * particles.js, cannot get tsParticles to work :( ------------------------------------
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



// * Arrow: Scroll Down Indicator -------------------------------------------------------
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



// * Element reveal animation -----------------------------------------------------------
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for(var index = 0; index < reveals.length; index++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[index].getBoundingClientRect().top;
        var elementVisible = 100;
        if(elementTop < windowHeight - elementVisible) {
            reveals[index].classList.add("active");
        }
        else {
            reveals[index].classList.remove("active");
        }
    }
}
// # Check the scroll position on page load
reveal();
window.addEventListener('scroll', reveal);



// * Mute button ------------------------------------------------------------------------
const muteToggle = () => {
    var muteBtnIcon = document.getElementById('mute-btn-icon');
    if(audioBGM.volume) {
        audioBGM.volume = 0;
        muteBtnIcon.textContent = "volume_mute";
    }
    else {
        audioBGM.volume = 1.0;
        muteBtnIcon.textContent = "volume_up";
    }
}



// * Play sound
var audioSFX = new Audio('./assets/audio/notarium.wav');
function playSound() {
    audioSFX.currentTime = 0;
    audioSFX.play();
}