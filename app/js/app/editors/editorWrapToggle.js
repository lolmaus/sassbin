function editorWrapSet(pane, status) {

    console.log(pane, status);

    if (status == "false") status = false;

    if (pane == "html") editorHtml.getSession().setUseWrapMode(status);
    else if (pane == "sass") editorSass.getSession().setUseWrapMode(status);
    else if (pane == "css") editorCss.getSession().setUseWrapMode(status);

    var $checkbox = $("#checkbox-wrap-" + pane);
    $checkbox.prop('checked', status);
}