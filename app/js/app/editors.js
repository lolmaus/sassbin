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

// binding to changes in SASS textbox
editorHtml.getSession().on("change", function () {
    statusModified();
    compileHtml();
});