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
                    $('.output-overlay').show();
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
                    $('.output-overlay').hide();
                }

                // Forcing the Ace editor to resize
                var thisPaneId = ui.element.attr('id');
                var nextPaneId = ui.element.nextAll(':visible:first').attr('id');
                [thisPaneId, nextPaneId].forEach(function(item){
                   if (item == "pane-html") editorHtml.resize();
                   else if (item == "pane-sass") editorSass.resize();
                   else if (item == "pane-css") editorCss.resize();
                });


                // Reapplying to recalculate maxWidth
                applyResizableToPanes();
            }
        });
    });
};