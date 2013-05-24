var requestGist;
function loadGist(gistId) {

    // abort any pending requestSass
    if (requestGist) {
        requestSass.abort();
    }

    if (gistId) {
        requestGist = $.get('https://api.github.com/gists/' + gistId);

        // callback handler that will be called on success
        requestGist.done(function (response, textStatus, jqXHR){
            // log a message to the console
            //console.log("sass: " + sass + "; responce: " + response)

            var gistId = response.id;
            var gistUrl = response.html_url;
            var gistFiles = response.files;

            $.each(gistFiles, function(key, val) {
                if (/.htm(l)?$/i.test(val.filename))
                    editorHtml.getSession().setValue(val.content);
                if (/.s(a|c)ss$/i.test(val.filename))
                    editorSass.getSession().setValue(val.content);
            });

            statusSaved(gistId, gistUrl);
        });

        // callback handler that will be called on failure
        requestGist.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            var error =  "Failed to ask server for SASS compilation: "+ textStatus + ', ' + errorThrown
            console.error(error);
            editorHtml.getSession().setValue(error);
        });
    }
}