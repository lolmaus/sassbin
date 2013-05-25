function compileSassStatusBar(text) {
    var $statusBar = $('#statusbar');
    if (text) {
        $statusBar.text(text);
        $statusBar.show();
    } else {
        $statusBar.hide();
    }
}

var compileSassDelayTimer; // variable to delay SASS execution
var compileSassDelay = 500; // variable to delay SASS execution
function compileSassWithDelay() {

    // Reset the timer if it was running
    clearTimeout(compileSassDelayTimer);



    compileSassStatusBar("Taking courage to compile...");

    // Compile SASS with delay
    compileSassDelayTimer = setTimeout(function() {

        var sassCode = editorSass.getSession().getValue();
        if (sassCode.length > 0) {
            compileSassStatusBar("Compiling...");
            compileSass();
        } else {
            editorCss.getSession().setValue('');
            compileHtml();
            compileSassStatusBar();
        }
    },compileSassDelay);

}