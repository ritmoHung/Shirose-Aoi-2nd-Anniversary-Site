// Pre-loader
const fade = () => {
    const wrapper = document.querySelector('.preloader');
    wrapper.classList.add('fade-out');
    document.body.classList.remove('unscrollable');
}
window.addEventListener('load', fade);



// Navbar background color & FAB opacity
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
    var navbarBreakpoint = vh(30);

    if(window.scrollY < navbarBreakpoint) {
        navbar.style.backgroundColor = 'transparent';
        navbar.classList.remove('neumorphism');
    }
    else {
        navbar.style.backgroundColor = 'var(--navbar-color)';
        navbar.classList.add('neumorphism');
    }
}

window.addEventListener('scroll', navBG);