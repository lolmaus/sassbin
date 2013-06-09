var requestGist;
function loadGist(gistId) {

    // abort any pending requestSass
    abortRequests();

    if (gistId) {

        statusBar('Loading gist ' + gistId + "...");

        requestGist = $.get('https://api.github.com/gists/' + gistId);

        // callback handler that will be called on success
        requestGist.done(function (response, textStatus, jqXHR){

            var gistUrl = response.html_url;
            var gistFiles = response.files;
            var config;

            $.each(gistFiles, function(key, val) {
                if (/.(haml|(htm(l)?))$/i.test(val.filename))
                    editorHtml.getSession().setValue(val.content);
                else if (/.s(a|c)ss$/i.test(val.filename)) {
                    editorSass.getSession().setValue(val.content);

                    if (/.scss$/i.test(val.filename))
                        editorSass.getSession().setMode("ace/mode/scss");
                    else if (/.sass$/i.test(val.filename))
                        editorSass.getSession().setMode("ace/mode/sass");
                } else if (val.filename == '~sassbin-config.json')
                    config = val.content;
            });

            if (config)
                configLoad(JSON.parse(config));
            else
                enableAllPanes();

            statusBar();
            appStatusSaved(gistId, gistUrl);
            window.history.pushState(response, "Gist " + gistId, "/gist/" + gistId + "/");
        });

        // callback handler that will be called on failure
        requestGist.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            var error =  "Failed to ask server for SASS compilation: "+ textStatus + ', ' + errorThrown
            console.error(error);
            editorHtml.getSession().setValue(error);
            statusBar();
        });
    }
}