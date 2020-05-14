function hoverHighlightClass(classname, colorover, colorout="transparent") {
    console.log('oK')
    var members = document.getElementsByClassName(classname);
    for (var i=0; i < members.length; i++) {
        members[i].onmouseover = function() {
            for (var k=0; k < members.length; k++) {
                members[k].style.backgroundColor = colorover //colorover
            }
        }
        members[i].onmouseout = function() {
            for (var k=0; k < members.length; k++) {
                members[k].style.backgroundColor = colorout
            }
        }
    } 
}

hoverHighlightClass("room_type-lu", "red");