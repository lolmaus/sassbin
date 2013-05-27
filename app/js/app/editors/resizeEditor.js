function resizeEditor(pane) {
    if (pane == "html") editorHtml.resize();
    else if (pane == "sass") editorSass.resize();
    else if (pane == "css") editorCss.resize();
}