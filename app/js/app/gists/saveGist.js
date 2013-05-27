function saveGist() {
    var sassCode = editorSass.getSession().getValue();
    var htmlCode = editorHtml.getSession().getValue();

    if (!sassCode && !htmlCode) return;

    var sassFilename = "style." + $('#sass-flavor :selected').prop('value');

    var data = {
        "description": "Created with SassBin",
        "public": true,
        "files": {}
    }
    if (htmlCode) data["files"]["structure.html"] = { "content": htmlCode };
    if (sassCode) data["files"][sassFilename] = { "content": sassCode };
    data["files"]["~sassbin-config.json"] = { "content": JSON.stringify(configSave(), null, 4) };

    statusBar('Saving...');

    $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data)
    })
        .success( function(e) {
            gistId = e.id;
            gistUrl = e.html_url;
            window.history.pushState(data, "Gist " + gistId, "/gist/" + gistId + "/");
            appStatusSaved(gistId, gistUrl);
            statusBar();
        })
        .error( function(e) {
            console.warn("gist save error", e);
            statusBar();
        });
}