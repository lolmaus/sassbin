function resetVisiblePanesWidth() {
    var visiblePanes = $('.pane:visible');
    var visiblePanesAmount =  visiblePanes.length;
    var paneNewWidth = 1 / visiblePanesAmount;

    visiblePanes.removeAttr('style');
    visiblePanes.each(function( index ) {
        $pane = $(this);

        $pane.css({
            left: percentage(paneNewWidth * index),
            right: percentage(1 - (paneNewWidth * (index +1)))
        });

        pane = $pane.attr('id').substring(5);
        resizeEditor(pane);
    });
}

function enableAllPanes() {
    // For all checkboxes
    $(".checkbox-pane").each(function() {

        // Enabling the checkbox
        $('.checkbox-pane').prop('checked', true);

        // Enabling all panes
        $('.pane').activate();
    });
}