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
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.7}s`;
            }
        });

        // burger animation
        burger.classList.toggle('toggle')
    })

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
    hoverHighlightClass("room_type-lu", "violet", "grey");
    hoverHighlightClass("room_type-dedicated", "violet", "yellowgreen");
    hoverHighlightClass("room_type-bookable", "violet", "#F8C26E");

}

animations();