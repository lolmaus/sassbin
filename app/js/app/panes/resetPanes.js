function resetVisiblePanesWidth() {
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