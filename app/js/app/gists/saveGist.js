
function saveGist() {
    var sassCode = editorSass.getSession().getValue();
    var htmlCode = editorHtml.getSession().getValue();

    if (!sassCode && !htmlCode) return;

    var sassFilename = "style." + $('#sass-flavor').val();
    var htmlFilename = "structure." + $('#html-flavor').val();

    var data = {
        "description": "Created with http://SassBin.com",
        "public": true,
        "files": {}
    }
    if (htmlCode) data["files"][htmlFilename] = { "content": htmlCode };
    if (sassCode) data["files"][sassFilename] = { "content": sassCode };
    data["files"]["~sassbin-config.json"] = { "content": JSON.stringify(configSave(), null, 4) };

    statusBar('Saving...');

    abortRequests();

    requestGist = $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data)
    })
        .success( function(e) {
            gistId = e.id;
            gistUrl = e.html_url;
            window.history.pushState(data, "Gist " + gistId, "/gist/" + gistId + "/");
            GoogleAnalyticsTrackThisPage();
            appStatusSaved(gistId, gistUrl);
            statusBar();
        })
        .error( function(e) {
            console.warn("gist save error", e);
            statusBar();
        });
}