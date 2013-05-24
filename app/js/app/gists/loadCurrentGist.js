function loadCurrentGist() {
    var pathName = window.location.pathname;

    if(/\/gist\/[a-f\d]+(\/)?/.test(pathName)) {

        gistId = pathName.slice(6);

        // Stripping the trailing "/";
        if (gistId.slice(-1) == "/")
            gistId = gistId.slice(0, - 1);

        loadGist(gistId);
    }
}