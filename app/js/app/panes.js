// Making panes resizable
applyResizableToPanes();
resetVisiblePanesWidth();

// For all checkboxes
$(".checkbox-pane").each(function() {

//    // Enabling the checkbox
//    $(this).prop('checked', true);

    enableAllPanes();

    $(this).change(function() {
        togglePane(this);
    });
});

// Reacting to hitting the equalisze button
$('#equalize').click(function(){
    // Reset panes' sizes
    resetVisiblePanesWidth();
});