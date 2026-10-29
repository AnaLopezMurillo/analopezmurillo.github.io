// change the cursor
$('html').css({'cursor': 'url("static/cursor.cur"), default'});
// movement functions 

// automate this to grab any the first class of any tab div
const tabNames = ['research', 'desktop', 'projects', 'site', 'weather', 'recycling']
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
    $(".tab").not(".init").css("z-index", 1);
    el.css("z-index", 2);
}

// exit button listener
let exitButtons = document.querySelectorAll('.exit');

for (let b of exitButtons) {
    b.addEventListener("click", function(event) {
        // exit out of clicked tab
        let tab = b.parentElement.parentElement;
        tab.style.visibility = "hidden";
        tab.style.display = "none";

        // reset initial position
        let i = tabNames.indexOf(tab.classList[0].toString());
        tab.style.top = tops[i];
        tab.style.left = lefts[i];

    })
}

function openTab(icon) {
    const tab = document.getElementById(icon.id + "-tab")
    if (!tab) return;
    tab.style.visibility = 'visible';
    tab.style.display = 'block';
    bringToFront($(tab));
}

document.addEventListener("click", function(event) {
    const icon = event.target.closest(".icon");
    if (icon) {
        openTab(icon);
        return;
    }
    const tab = event.target.closest('.tab');
    if (tab) bringToFront($(tab));

})

// icon container listener (left)
let icon_container = document.querySelector('.icons-column');
const tabs = document.getElementsByClassName('tab');

// add click event listener
for (let tab of tabs) {
    tab.addEventListener("click", function(event) {
        let el = $('.' + tab.classList[0])
        bringToFront(el);
    })
}

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

// listen for end of current song
music.addEventListener("ended", function(event) {
    playNext();
})

let skipButton = document.getElementsByClassName('skip play-button')[0];
skipButton.addEventListener("click", function(event) {
    playNext();
})

let playNext = function() {
    if (songSrc.length - 1 == i) {
        i = 0;
    } else {
        i+=1;
    }
    music.src = songSrc[i];
    songDiv.innerHTML = songNames[i];
    music.play();
}