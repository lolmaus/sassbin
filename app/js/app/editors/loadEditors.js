var editorHtml;
var editorSass;
var editorCss;
function loadEditors() {

    // Serving workers.js
    var path = "/js/vendor-static/ace";
    ace.config.set("workerPath", path);

    // Loading the Ace editor
    editorHtml = ace.edit("editor-html");
    editorHtml.setTheme("ace/theme/github");
    editorHtml.getSession().setMode("ace/mode/html");
    editorHtml.getSession().setValue($('#editor-html-stunt-double').text());
    editorHtml.getSession().setUseWrapMode(true);

    editorSass = ace.edit("editor-sass");
    editorSass.setTheme("ace/theme/github");
    editorSass.getSession().setMode("ace/mode/sass");
    editorSass.getSession().setUseWrapMode(true);

    editorCss = ace.edit("editor-css");
    editorCss.setTheme("ace/theme/github");
    editorCss.getSession().setMode("ace/mode/css");
    editorCss.getSession().setUseWrapMode(true);
    editorCss.setReadOnly(true);
}