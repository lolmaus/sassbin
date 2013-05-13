// Loading the Ace editor
var editorHtml = ace.edit("editor-html");
editorHtml.setTheme("ace/theme/github");
editorHtml.getSession().setMode("ace/mode/html");

var editorSass = ace.edit("editor-sass");
editorSass.setTheme("ace/theme/github");
editorSass.getSession().setMode("ace/mode/sass");
editorSass.getSession().setMode("ace/mode/sass");

var editorCss = ace.edit("editor-css");
editorCss.setTheme("ace/theme/github");
editorCss.getSession().setMode("ace/mode/css");
editorCss.setReadOnly(true);






function compileHtml() {
    var output = $('#output')
    var head = output.contents().find("head");
    var body = output.contents().find("body");
    var style = output.contents().find("head style");

    var css = editorCss.getSession().getValue();
    var html = editorHtml.getSession().getValue();

    if(style.length == 0){
        head.prepend('<style></style>')
        style = output.contents().find("head style");
    }

    style.html(css);
    body.html(html);
}

//var requestHtml;
//function compileHtml() {
//  var css = editorCss.getSession().getValue();
//  var html = editorHtml.getSession().getValue();
//
//  // abort any pending requestHtml
//  if (requestHtml) {
//      requestHtml.abort();
//  }
//
//  // Sending an AJAX requestHtml
//  var requestHtml = $.ajax({
//    url: '/result',
//    type: 'POST',
//    data: {'html': html, 'css': css}
//  });
//
//  // callback handler that will be called on success
//  requestHtml.done(function (response, textStatus, jqXHR){
//      output.html(response);
//  });
//
//  // callback handler that will be called on failure
//  requestHtml.fail(function (jqXHR, textStatus, errorThrown){
//      // log the error to the console
//      var error =  "Failed to ask server for HTML render: "+ textStatus, errorThrown
//      console.error(error);
//      output.html(error);
//  });
//}

var requestSass; // variable to hold request
// Compile SASS to CSS
function compileSass() {
    var sass = editorSass.getSession().getValue();
    var css = null;

    // abort any pending requestSass
    if (requestSass) {
        requestSass.abort();
    }

    // Sending an AJAX requestSass
    var requestSass = $.ajax({
        url: '/compile-sass',
        type: 'POST',
        data: {'sass': sass}
    });

    // callback handler that will be called on success
    requestSass.done(function (response, textStatus, jqXHR){
        // log a message to the console
        //console.log("sass: " + sass + "; responce: " + response)
        editorCss.getSession().setValue(response);
        compileHtml();
    });

    // callback handler that will be called on failure
    requestSass.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        var error =  "Failed to ask server for SASS compilation: "+ textStatus + ', ' + errorThrown
        console.error(error);
        editorCss.getSession().setValue(error);
    });
}


// Compile SASS to CSS on change
// binding to changes in SASS textbox
editorSass.getSession().on("change", function () {
    compileSass();
});


// variable to hold request
// binding to changes in SASS textbox
editorHtml.getSession().on("change", function () {
    compileHtml();
});





//// Copying text from Ace to a textarea as you type
//var textareaHtml = $('textarea[name="html"]').hide();
//editorHtml.getSession().setValue(textareaHtml.val());
//editorHtml.getSession().on("change", function () {
//    textareaHtml.val(editorHtml.getSession().getValue());
//});
//var textareaCss = $('textarea[name="css"]').hide();
//editorCss.getSession().setValue(textareaCss.val());
//editorCss.getSession().on("change", function () {
//    textareaCss.val(editorCss.getSession().getValue());
//});
//
//// Catching the click
//output = $('#output');
////output.hide();
//
//$('#submit').click(function() {
//   output.show();
//});