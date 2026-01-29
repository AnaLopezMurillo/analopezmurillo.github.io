bombs = 30

grids = {
    'small': [7,7],
    'med': [16,16],
    'large': [25,25]
}

style = undefined

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