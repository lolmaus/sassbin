function paneActivate(pane) {
    var $pane = $("#pane-" + pane);
    var $checkbox = $("#checkbox-pane-" + pane);

    $checkbox.prop('checked', true);
    $pane.activate();

    resetVisiblePanesWidth();
}

function paneDeactivate(pane) {
    var $pane = $("#pane-" + pane);
    var $checkbox = $("#checkbox-pane-" + pane);

    $checkbox.prop('checked', false);
    $pane.deactivate();

    resetVisiblePanesWidth();
}