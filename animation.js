const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click', () => {

        // toggle nav
        nav.classList.toggle('nav-active')

        // animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';    
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });

        // burger animation
        burger.classList.toggle('toggle')
    })

}

const lightMode = () => {
    var body = document.body;
    var demo = document.querySelector('.demo-sign');
    var navBg = document.querySelector('nav');
    var toggleText = document.querySelector('.toggle-text')

    var logos = document.querySelectorAll('.logo-light')
    var links = document.querySelectorAll('.link-simple')
    var btns = document.querySelectorAll('.btn');
    var fullButtons = document.querySelectorAll('.btn-full')
    var borderButtons =document.querySelectorAll('.btn-border')
    var burgerLines = document.querySelectorAll('.burger-line')

    var legendBg = document.querySelectorAll('.grid_legend-element')

    body.classList.toggle('light-mode');
    demo.classList.toggle('demo-light');
    navBg.classList.toggle('nav-light');
    toggleText.classList.toggle('toggle-text-light')

    for (var i = 0; i < logos.length; i++) {
        logos[i].classList.toggle('logo-dark');
    }

    for (var i = 0; i < links.length; i++) {
        links[i].classList.toggle('link-dark')
    }

    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle('btn-dark')
    }

    for (var i = 0; i < borderButtons.length; i++) {
        borderButtons[i].classList.toggle('btn-border-dark')
    }

    for (var i = 0; i < fullButtons.length; i++) {
        fullButtons[i].classList.toggle('btn-full-light');
    }

    for (var i = 0; i < burgerLines.length; i++) {
        burgerLines[i].classList.toggle('burger-line-dark')
    }

    for (var i = 0; i < legendBg.length; i++) {
        legendBg[i].classList.toggle('grid_legend-bg-dark')
    }


}


function hoverHighlightClass(classname, colorover, coloroutBg, coloroutBgTxt="transparent") {
    var members = document.getElementsByClassName(classname);
    for (var i=0; i < members.length; i++) {
        members[i].onmouseover = function() {
            for (var k=0; k < members.length; k++) {
                members[k].style.backgroundColor = colorover; //colorover
                members[k].style.fill = colorover;
                members[k].style.color = "black";
            }
        }
        members[i].onmouseout = function() {
            for (var k=0; k < members.length; k++) {
                members[k].style.backgroundColor = coloroutBgTxt;
                members[k].style.color = "#8d8f91";
                members[k].style.fill = coloroutBg;
            }
        }
        members[i].touchstart = function() {
            for (var k=0; k < members.length; k++) {
                members[k].style.backgroundColor = colorover; //colorover
                members[k].style.fill = colorover;
            }
        }
        members[i].touchend = function() {
            for (var k=0; k < members.length; k++) {
                members[k].style.backgroundColor = coloroutBgTxt;
                members[k].style.fill = coloroutBg;
            }
        }
    } 
}

const animations = () => {
    navSlide();
    // decided against it for now:
    // hoverHighlightClass("room_type-lu", "violet", "grey");
    // hoverHighlightClass("room_type-dedicated", "violet", "yellowgreen");
    // hoverHighlightClass("room_type-bookable", "violet", "#F8C26E");

}

animations();