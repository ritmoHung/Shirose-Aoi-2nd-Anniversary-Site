// * Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// * Preloaders
const fade = () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    document.body.classList.remove('unscrollable');
}

let isiOSMobile = (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
const iosMotionPreloader = () => {
    if(isiOSMobile) {
        var iosMotionPreloader = document.getElementById('ios-motion-preloader');
        iosMotionPreloader.style.visibility = "visible";
        // # Set body unscrollable again
        // # so user cannot scroll "after preloader" and "before permission granted"
        document.body.classList.add('unscrollable');
    }
}
window.addEventListener('load', fade);
window.addEventListener('load', iosMotionPreloader);



// * Navbar BG color, Navbar & FAB visibility
function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}
function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
function getScrollYMax() {
    var limit = Math.max(document.body.scrollHeight, 
        document.body.offsetHeight, 
        document.documentElement.clientHeight, 
        document.documentElement.scrollHeight, 
        document.documentElement.offsetHeight) - window.innerHeight;
    return limit;
}

const navBG = () => {
    var navbar = document.getElementById('main-navbar');
    var navbarBreakpoint = vh(40);

    // ! navbar-items still clickable
    if(window.scrollY < navbarBreakpoint) {
        navbar.classList.remove('fade-in');
    }
    else {
        navbar.classList.add('fade-in');
    }
}
const fabVis = () => {
    var fabs = document.getElementById('main-fab');
    var fabBreakpoint = vh(40);

    if(window.scrollY < fabBreakpoint || window.scrollY > (getScrollYMax() - vh(10))) {
        fabs.classList.remove('fade-in');
    }
    else {
        fabs.classList.add('fade-in');
    }
}
window.addEventListener('scroll', navBG);
window.addEventListener('scroll', fabVis);