// Enabling Ace Editor
loadEditors();


// Compile SASS to CSS on change
// binding to changes in SASS textbox
editorSass.getSession().on("change", function () {
    appStatusModified();
    compileSassWithDelay();
});

// Compile SASS on CSS or SASS flavor change
$('#sass-flavor, #css-flavor').change(function() {
    appStatusModified();
    compileSassWithDelay();
});

// Compile HTML on HTML flavor change
$('#html-flavor').change(function() {
    appStatusModified();
    compileHtml();
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
    appStatusModified();
    compileHtml();
});