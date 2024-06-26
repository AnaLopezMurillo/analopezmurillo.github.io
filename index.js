// movement functions

// automate this to grab any the first class of any tab div
const tabNames = ['about', 'research', 'desktop', 'projects', 'site', 'weather']
let tops = [];
let lefts = [];

$(document).ready(function() {
    for (let tab in tabNames) {
        let tabName = "." + tabNames[tab];
        let tabEl = $(tabName);
        let window_tabEl = window.getComputedStyle(document.getElementsByClassName(tabNames[tab])[0]);
        
        tops.push(window_tabEl.top);
        lefts.push(window_tabEl.left);

        tabEl.draggable({
            start: function() {
                bringToFront(tabEl);
            }
        });
    }
});

$( function() {
    $( ".draggable" ).draggable();
} );

$( function() {
    $( ".resizable" ).resizable();
} );

function bringToFront(el) {
    $(".desktop, .about, .research, .site, .projects, .weather").css("z-index", 1);
    el.css("z-index", 2);
}

// exit button listener
let exitButtons = document.querySelectorAll('.exit');

for (let b of exitButtons) {
    b.addEventListener("click", function(event) {
        // exit out of clicked tab
        let tab = b.parentElement.parentElement;
        tab.style.visibility = "none";
        tab.style.display = "none";

        // reset initial position
        let i = tabNames.indexOf(tab.classList[0].toString());
        tab.style.top = tops[i];
        tab.style.left = lefts[i];

    })
}

// icon container listener (left)
let icon_container = document.querySelector('.icons-column');
const tabs = document.getElementsByClassName('tab');

icon_container.addEventListener("click", function(event) {
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

// about tab listener 
let about_icons = document.querySelector('#about-content');
about_icons.addEventListener("click", function(event) {
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

let playButton = document.getElementsByClassName('play-button first')[0];
let songDiv = document.getElementsByClassName('song-name')[1];
const musicLibrary = {
    "Attitude - Luxury Elite": "./static/music/Attitude.mp3",
    "Second Floor - 猫 シ Corp.": "./static/music/SecondFloor.mp3",
    "Slice of Paradise - Karl Casey" : "./static/music/SliceofParadise.mp3",
}
let songNames = Object.keys(musicLibrary);
let songSrc = Object.values(musicLibrary);
let music = new Audio(src=musicLibrary[songNames[0]]);
music.volume = 0.5
let i = 0;

playButton.addEventListener("click", function() {
    // fix this logic
    if (!music.paused) {
        playButton.innerHTML = "||"
        music.pause();
    } else {
        playButton.innerHTML = "►"
        music.play();
    }

    if (!music.paused) {
        playButton.innerHTML = "||"
    } else {
        playButton.innerHTML = "►"
        music.pause();
    } 
    songDiv.innerHTML = songNames[i];
})

let skipButton = document.getElementsByClassName('skip play-button')[0];
skipButton.addEventListener("click", function(event) {
    if (songSrc.length - 1 == i) {
        i = 0;
    } else {
        i+=1;
    }
    music.src = songSrc[i];
    songDiv.innerHTML = songNames[i];
    music.play();
})