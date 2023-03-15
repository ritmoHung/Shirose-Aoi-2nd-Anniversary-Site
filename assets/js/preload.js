// Pre-loader
const fade = () => {
    const wrapper = document.querySelector('.preloader');
    wrapper.classList.add('fade-out');
    document.body.classList.remove('unscrollable');
}
window.addEventListener('load', fade);



// Navbar background color & FAB opacity
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
        navbar.style.opacity = 0;
    }
    else {
        navbar.style.opacity = 1;
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