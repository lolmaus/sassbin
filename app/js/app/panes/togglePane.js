function togglePane(checkbox) {
    // Which pane to toggle
    var $target = $("#" + $(checkbox).prop('name'));

    // Enable or disable?
    var $status = $(checkbox).is(':checked');

    if ($status) {
        $target.activate();
    } else {
        $target.deactivate();
    }
    resetVisiblePanesWidth();
}