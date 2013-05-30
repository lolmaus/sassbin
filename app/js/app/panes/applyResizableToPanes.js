function nextPaneMaxWidth(currentPaneObject) {
    var currentPaneWidth = $(currentPaneObject).outerWidth();
    var nextPaneWidth = $(currentPaneObject).nextAll(':visible:first').width();
    var maxWidth = currentPaneWidth + nextPaneWidth - 100;
    return maxWidth;
}

function applyResizableMaxWidthToPanes() {
    $(".pane:visible").not(':last-child').each(function() {
        $(this).resizable({maxWidth: nextPaneMaxWidth(this)});
    });
}

//var currentPaneOriginalWidth = 0; // Has to be declared outside applyResizableToPanes()
function applyResizableToPanes() {

    $visiblePanes = $(".pane:visible");

    $visiblePanes.each(function( index ) {

        $pane = $(this);

        // The last pane should not be resizable
        if (index == $visiblePanes.length -1) {
            if ($pane.is('.ui-resizable'))
                $pane.resizable('destroy');

        } else {
            $pane.resizable({
    //            helper: 'ui-resizable-helper',
                handles: 'e',
                minWidth: 100,
                maxWidth: nextPaneMaxWidth(this),

                // This happens on mousedown when starting a resize
                start: function(event, ui){
                    // Covering the iframe with a transparent div
                    // so that it does not prevent Resizable from tracking the cursor over the iframe
                    $('.output-overlay').show();
                },

                // This happens on dragging the edge
                resize: function(event, ui){

                    // Calculating the new css attributes for resizing the panes:
                    // `right` css attribute for the current pane,
                    // `left` for the next pane.
                    var parentWidth = ui.element.parent().width();

                    var thisPaneOriginalWidth = ui.originalSize['width'];
                    var thisPaneNewWidth = ui.size['width'];
                    var thisPaneDelta = thisPaneNewWidth - thisPaneOriginalWidth;

                    var thisPaneOriginalLeft = ui.originalPosition['left'];
                    var thisPaneOriginalLeftRelative = percentageOf(thisPaneOriginalLeft, parentWidth);

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

                        left: thisPaneOriginalLeftRelative,
                        right: thisPaneNewRightRelative,
                    });

                    // Resizing the next visible pane
                    $(ui.element).nextAll(':visible:first').css({
                        left: nextPaneNewLeftRelative,
                    });

                    // Forcing the Ace editor to resize
                    var thisPane = ui.element.attr('id').substring(5);
                    var nextPane = ui.element.nextAll(':visible:first').attr('id').substring(5);
                    resizeEditor(thisPane);
                    resizeEditor(nextPane);
                },

                // This happens on mouseup after resize
                stop: function(event, ui){
                    $('.output-overlay').hide();
                    // Reapplying to recalculate maxWidth
                    applyResizableMaxWidthToPanes();
                    equalizeShow();
                }
            });
        }
    });
};