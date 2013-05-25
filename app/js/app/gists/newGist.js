function newGist() {
    editorHtml.getSession().setValue('');
    editorSass.getSession().setValue('');
    window.history.pushState('', 'Unsaved gist', "/");
    statusNew();
}