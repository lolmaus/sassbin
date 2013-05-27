var appStatusIsModified = false;

function appStatusModified() {
    appStatusIsModified = true;
    $('#save-gist').show();
    $('#go-to-gist').hide();
    $('#new-gist').show();
};

function appStatusNew() {
    appStatusIsModified = false;
    $('#save-gist').hide();
    $('#go-to-gist').hide();
    $('#new-gist').hide();
};

function appStatusSaved(gistId, gistUrl) {
    appStatusIsModified = false;
    $('#save-gist').hide();
    $('#go-to-gist').attr('href', gistUrl);
    $('#go-to-gist').text("Gist " + gistId);
    $('#go-to-gist').show();
    $('#new-gist').show();
};
