function newGist() {
    abortRequests();
    editorHtml.getSession().setValue('');
    editorSass.getSession().setValue('');
    window.history.pushState('', 'Unsaved gist', "/");
    appStatusNew();
}