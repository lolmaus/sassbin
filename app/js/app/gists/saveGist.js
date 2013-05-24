function saveGist() {
    var sassCode = editorSass.getSession().getValue();
    var htmlCode = editorHtml.getSession().getValue();
    var sassFilename = "style." + $('#sass-flavor :selected').prop('value');

    var data = {
        "description": "Created with SassBin",
        "public": true,
        "files": {
            "structure.html": { "content": htmlCode }
        }
    }
    data["files"][sassFilename] = { "content": sassCode }

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
            statusSaved(gistId, gistUrl);
        })
        .error( function(e) {
            console.warn("gist save error", e);
        });
}