// Making panes resizable
applyResizableToPanes();
resetVisiblePanesWidth();

// For all checkboxes
$(".checkbox-pane").each(function() {

    enableAllPanes();

    $(this).change(function() {
        pane = $(this).prop('name');
        status = $(this).prop('checked');

        if (!status || status == "false")
            paneDeactivate(pane);
        else
            paneActivate(pane);
    });
});

// Reacting to hitting the equalisze button
$('#equalize').click(function(){
    // Reset panes' sizes
    resetVisiblePanesWidth();
});