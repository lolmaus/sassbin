function statusModified() {
    $('#save-gist').show();
    $('#go-to-gist').hide();
};

function statusNew() {
    $('#save-gist').hide();
    $('#go-to-gist').hide();
};

function statusSaved(gistId, gistUrl) {
    $('#save-gist').hide();
    $('#go-to-gist').attr('href', gistUrl);
    $('#go-to-gist').text("Gist " + gistId);
    $('#go-to-gist').show();
};