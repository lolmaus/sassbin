
loadCurrentGist();


//Loading a Gist
$('#load-gist').click(function(e) {
    e.preventDefault();
    promptGist();
});

//Saving a Gist
$('#save-gist').click(function(e) {
    e.preventDefault();

    saveGist();
});