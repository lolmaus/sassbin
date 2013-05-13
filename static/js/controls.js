//Object.prototype.ppp = function() { console.log(this); return this; }

function percentage(fraction, total) {
    return fraction / total * 100 + "%";
}

function nextPaneMaxWidth(currentPaneObject) {
    var currentPaneWidth = $(currentPaneObject).outerWidth();
    var nextPaneWidth = $(currentPaneObject).nextAll(':visible:first').width();
    var maxWidth = currentPaneWidth + nextPaneWidth - 100;
    return maxWidth;
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
                var thisPaneNewRightRelative = percentage(thisPaneNewRight,parentWidth);

                var nextPaneOriginalLeft = thisPaneOriginalLeft + thisPaneOriginalWidth;
                var nextPaneNewLeft = nextPaneOriginalLeft + thisPaneDelta;
                var nextPaneNewLeftRelative = percentage(nextPaneNewLeft, parentWidth);

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

applyResizableToPanes();

//function stretchPanesToFullWidth() {
//    var containerWidth = $("#main").width();
//
//    // Calculating the initial width of all panes
//    var initialPanesWidth = 0;
//    $(".pane:visible").each(function(index){
//        initialPanesWidth = initialPanesWidth + $(this).outerWidth();
//    });
//
//    // Adjusting each pane's width
//    var newPanesWidth = 0;
//    $(".pane:visible").each(function(index){
//
//        // Setting width
//        var currentPaneRelativeWidth = $(this).outerWidth() / initialPanesWidth;
//        var currentPaneNewAbsoluteWidth = Math.floor(currentPaneRelativeWidth * containerWidth);
//        $(this).outerWidth(currentPaneNewAbsoluteWidth);
//        newPanesWidth = newPanesWidth + currentPaneNewAbsoluteWidth;
//
////        // Setting height
////        var parentHeight = $(this).parent().height();
////        $(this).outerHeight(parentHeight);
////
////        // Setting height for editor
////        var paneHeight = $(this).height();
////        var headerHeight = $(this).find('header').outerHeight();
////        var editorHeight = paneHeight - headerHeight;
////        console.log(editorHeight);
////        $(this).find('.editor').outerHeight(editorHeight);
//    });
//
//    // Filling a possible gap that could appear due to rounding down
//    if (newPanesWidth < containerWidth) {
//        var lastPaneWidth = $(".pane:visible:last-child").outerWidth();
//        //     console.log("bla" + lastPaneWidth);
//        $(".pane:visible:last-child").outerWidth(lastPaneWidth + 1);
//    }
//
//    var currentPaneOriginalWidth = 0; // This var should be globally available for applyResizableToPanes() to work
//    applyResizableToPanes();
//}
//
//function nextPaneMaxWidth(object) {
//    var currentPaneWidth = $(object).outerWidth();
//    var nextPaneWidth = $(object).nextAll(':visible:first').width();
//    var maxWidth = currentPaneWidth + nextPaneWidth - 100;
//    return maxWidth;
//}
//
//function applyResizableToPanes() {
//    $(".pane").not(':last-child').each(function( index ) {
//        $(this).resizable({
//            helper: 'ui-resizable-helper',
//            handles: 'e',
//            minWidth: 100,
//            maxWidth: nextPaneMaxWidth(this),
//
//            start: function(event, ui){
//                currentPaneOriginalWidth = $(this).outerWidth();
//            },
//
//            stop: function(event, ui){
//                var currentPaneNewWidth = $(this).outerWidth();
//                var widthDelta = currentPaneOriginalWidth - currentPaneNewWidth;
//
//                var nextPane = $(this).nextAll(':visible:first');
//
//
//                var nextPaneOriginalWidth = nextPane.outerWidth();
//                var nextPaneNewWidth = Math.floor(nextPaneOriginalWidth + widthDelta);
//                nextPane.outerWidth(nextPaneNewWidth);
//
//                // Fix for http://bugs.jqueryui.com/ticket/4152
//                $(this).height('auto');
//
//                // Reapplying to recalculate maxWidth
//                applyResizableToPanes();
//
//            }
//        });
//    });
//}
//
////$(document).ready(function(){
////
////});
//
//stretchPanesToFullWidth();
//
//$(window).resize(function() {
//    stretchPanesToFullWidth();
//});
//
//$("#controls input").change(function() {
//    console.log("changed");
//    var target = "#" + $(this).prop('name');
//    var status = $(this).is(':checked');
//
//    if (status) {
//        $(target).addClass('is-active');
//    } else {
//        $(target).removeClass('is-active');
//    }
//
//    stretchPanesToFullWidth();
//});
//
//$('#equalize').click(function(){
//    // Reset panes' sizes
//    $('.pane').outerWidth(100);
//    stretchPanesToFullWidth();
//});