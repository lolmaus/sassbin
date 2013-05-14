//Object.prototype.ppp = function() { console.log(this); return this; }

function percentage(value) {
    return value * 100 + "%";
}

function percentageOf(fraction, total) {
    return percentage(fraction / total);
}

function nextPaneMaxWidth(currentPaneObject) {
    var currentPaneWidth = $(currentPaneObject).outerWidth();
    var nextPaneWidth = $(currentPaneObject).nextAll(':visible:first').width();
    var maxWidth = currentPaneWidth + nextPaneWidth - 100;
    return maxWidth;
}

function resetPanes() {
    var visiblePanes = $('.pane:visible');
    var visiblePanesAmount =  visiblePanes.length;
    var paneNewWidth = 1 / visiblePanesAmount;

    visiblePanes.removeAttr('style');
    visiblePanes.each(function( index ) {
        $(this).css({
           left: percentage(paneNewWidth * index),
           right: percentage(1 - (paneNewWidth * (index +1)))
        });
//        left: $pane-width * ($i - 1)
//        right: 100% - ($pane-width * $i)
    });
}

//var currentPaneOriginalWidth = 0; // Has to be declared outside applyResizableToPanes()
function applyResizableToPanes() {
    $(".pane:visible").not(':last-child').each(function( index ) {
        $(this).resizable({
            helper: 'ui-resizable-helper',
            handles: 'e',
            minWidth: 100,
            maxWidth: nextPaneMaxWidth(this),

            // This happens on mousedown when starting a resize
            start: function(event, ui){
                // Covering the iframe with a transparent div
                // so that it does not prevent Resizable from tracking the cursor over the iframe
                if ($(ui.element).is(':nth-last-child(2)')) {
                  $('#output-overlay').show();
                }
            },

            // This happens on mouseup after resize
            stop: function(event, ui){

                // Calculating the new css attributes for resizing the panes:
                // `right` css attribute for the current pane,
                // `left` for the next pane.
                var parentWidth = ui.element.parent().width();

                var thisPaneOriginalWidth = ui.originalSize['width'];
                var thisPaneNewWidth = ui.size['width'];
                var thisPaneDelta = thisPaneNewWidth - thisPaneOriginalWidth;

                var thisPaneOriginalLeft = ui.originalPosition['left'];

                var thisPaneNewRight = parentWidth - (thisPaneOriginalLeft + thisPaneNewWidth);
                var thisPaneNewRightRelative = percentageOf(thisPaneNewRight,parentWidth);

                var nextPaneOriginalLeft = thisPaneOriginalLeft + thisPaneOriginalWidth;
                var nextPaneNewLeft = nextPaneOriginalLeft + thisPaneDelta;
                var nextPaneNewLeftRelative = percentageOf(nextPaneNewLeft, parentWidth);

                // Resizing current pane using the `right` css attribute instead of `width`
                ui.element.css({
                    // Prevent modifying the `width` and `height` attributes
                    width: 'auto',
                    height: 'auto',

                    right: thisPaneNewRightRelative,
                });

                // Resizing the next visible pane
                $(ui.element).nextAll(':visible:first').css({
                    left: nextPaneNewLeftRelative,
                });

                // Uncovering the iframe back
                if ($(ui.element).is(':nth-last-child(2)')) {
                    $('#output-overlay').hide();
                }

                // Reapplying to recalculate maxWidth
                applyResizableToPanes();
            }
        });
    });
};

function promptGist(message) {
  var usersInput = prompt(message);

  if (usersInput) {
      var regexForNumber = /^[\da-f]+$/;
      if(regexForNumber.test(usersInput)) {
          return usersInput;
      } else {
          promptGist("Wrong number provided. Please provide a Gist gist ID number. It’s usually a longish number like 29388372.");
      }
  }
};

applyResizableToPanes();

// Enabling all checkboxes
$("#pane-controls input").prop('checked', true);
// Reacting to toggling checkboxes
$("#pane-controls input").change(function() {
    console.log("yay");
    var target = "#" + $(this).prop('name');
    var status = $(this).is(':checked');

    if (status) {
        $(target).addClass('is-active');
        $(target).removeClass('is-inactive');
    } else {
        $(target).removeClass('is-active');
        $(target).addClass('is-inactive');
    }
    resetPanes();
});

$('#equalize').click(function(){
    // Reset panes' sizes
    resetPanes();
});



//Loading a Gist
$('#load-gist').click(function(e) {
    e.preventDefault();

    var gistId = promptGist("Please provide a Gist gist ID number. It’s usually a longish number like 29388372.");
    if (gistId) {
        window.open ('/gist/' + gistId,'_self',false);
    }
});