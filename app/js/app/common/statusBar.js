function statusBar(text) {
    var $statusBar = $('#statusbar');
    if (text) {
        $statusBar.text(text);
        $statusBar.show();
    } else {
        $statusBar.hide();
    }
}
