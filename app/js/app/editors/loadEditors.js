var editorHtml;
var editorSass;
var editorCss;
function loadEditors() {
    // Loading the Ace editor
    editorHtml = ace.edit("editor-html");
    editorHtml.setTheme("ace/theme/github");
    editorHtml.getSession().setMode("ace/mode/html");
    editorHtml.getSession().setValue($('#editor-html-stunt-double').text());

    editorSass = ace.edit("editor-sass");
    editorSass.setTheme("ace/theme/github");
    editorSass.getSession().setMode("ace/mode/sass");

    editorCss = ace.edit("editor-css");
    editorCss.setTheme("ace/theme/github");
    editorCss.getSession().setMode("ace/mode/css");
    editorCss.setReadOnly(true);
}