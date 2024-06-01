// movement functions

$(document).ready(function() {
    const about = $(".about");
    const desktop = $(".desktop");
    const research = $(".research");

    research.draggable({
        start: function() { 
            bringToFront(research); 
        }
    }).resizable({});

    about.draggable({
        start: function() { 
            bringToFront(about); 
        }
    }).resizable({});

    desktop.draggable({
        start: function() { 
            bringToFront(desktop); 
        }
    }).resizable({});

});

$( function() {
    $( ".draggable" ).draggable();
} );

$( function() {
    $( ".resizable" ).resizable();
} );

function bringToFront(el) {
    $(".desktop, .about, .research").css("z-index", 1);
    el.css("z-index", 2);
}

// exit button listener
let exitButtons = document.querySelectorAll('.exit');

for (let b of exitButtons) {
    b.addEventListener("click", function(event) {
        let tab = b.parentElement.parentElement;
        tab.style.visibility = "none";
        tab.style.display = "none";
    })
}


// icon container listener (left)
let icon_container = document.querySelector('.icons-column');
const tabs = document.getElementsByClassName('tab');

icon_container.addEventListener("dblclick", function(event) {
    const icon = event.target.closest(".icon");
    if (!icon) return;

    for (let tab of tabs) {
        if (tab.id === icon.id + "-tab") {
            tab.style.visibility = "visible";
            tab.style.display = "block";
            let el = $("#" + icon.id + "-tab");
            bringToFront(el);
        }
    }
}) 

// desktop tab listener
let desktop_icons = document.querySelector('.content');
console.log(desktop_icons);
desktop_icons.addEventListener("click", function(event) {
    const icon = event.target.closest(".icon")
    if (!icon) return;

    for (let tab of tabs) {
        if (tab.id === icon.id + "-tab") {
            tab.style.visibility = "visible";
            tab.style.display = "block";
            let el = $("#" + icon.id + "-tab");
            bringToFront(el);
        }
    }
})


// footer functions
let windowsButton = document.getElementsByClassName('windows-button')[0];

windowsButton.addEventListener("click", function() {
});

// date
function clock() {
    function updateClock() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

        const isDST = (now.getMonth() > 2 && now.getMonth() < 11);
        const estOffset = isDST ? -4 : -5; 
        const estTime = new Date(utc + (3600000 * estOffset));

        let hours = estTime.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutes = estTime.getMinutes();
        const seconds = estTime.getSeconds();
        const formattedTime = 
            (hours < 10 ? "0" + hours : hours) + ":" + 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (seconds < 10 ? "0" + seconds : seconds) + " " + ampm;
        document.getElementById('clock').innerText = formattedTime;
    }
    setInterval(updateClock, 1000);
}

clock();
