// Making panes resizable
applyResizableToPanes();
resetVisiblePanesWidth();

// For all pane checkboxes
$(".checkbox-pane").each(function() {

    enableAllPanes();

    $(this).change(function() {
        pane = $(this).prop('name');
        status = $(this).prop('checked');

        if (!status || status == "false")
            paneDeactivate(pane);
        else
            paneActivate(pane);

        applyResizableToPanes();
    });
});

// Reacting to hitting the equalisze button
$('#equalize').click(function(){
    // Reset panes' sizes
    resetVisiblePanesWidth();
    equalizeHide();
});

// For all wrap checkboxes
$(".checkbox-wrap").each(function() {

    $(this).change(function() {
        pane = $(this).prop('name');
        status = $(this).prop('checked');

        editorWrapSet(pane, status);
    });
});

