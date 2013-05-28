var requestSass; // variable to hold request

// Compile SASS to CSS
function compileSass() {
    var sassCode = editorSass.getSession().getValue();

    var sassFlavor = $('#sass-flavor :selected').prop('value');
    var cssFlavor = $('#css-flavor :selected').prop('value');
    var css = null;

    // abort any pending requestSass
    abortRequests();

    // Sending an AJAX requestSass
    var requestSass = $.ajax({
        url: '/compile-sass',
        type: 'POST',
        data: { 'sass_code': sassCode,
            'sass_flavor': sassFlavor,
            'css_flavor': cssFlavor }
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

    // callback handler for both success and failure failure
    requestSass.always(function (){
        statusBar();
    });

}