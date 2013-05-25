// Enabling Ace Editor
loadEditors();

// Compile SASS to CSS on page load
compileSassWithDelay();


// Compile SASS to CSS on change
// binding to changes in SASS textbox
editorSass.getSession().on("change", function () {
    statusModified();
    compileSassWithDelay();
});

// Compile SASS on flavor change
$('.flavor').change(function() {
    statusModified();
    compileSassWithDelay();
});
// Change syntax highlighting on SASS flavor change
$('#sass-flavor').change(function() {
    sassFlavor = $(this).val();

    if (sassFlavor == "scss")
        editorSass.getSession().setMode("ace/mode/scss");
    else if (sassFlavor == "sass")
        editorSass.getSession().setMode("ace/mode/sass");
});


// binding to changes in SASS textbox
editorHtml.getSession().on("change", function () {
    statusModified();
    compileHtml();
});