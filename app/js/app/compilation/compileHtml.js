function compileHtml() {
    var output = $('#output')
    var head = output.contents().find("head");
    var body = output.contents().find("body");
    var style = output.contents().find("head style");

    var css = editorCss.getSession().getValue();
    var html = editorHtml.getSession().getValue();
    var htmlFlavor = $('#html-flavor').val();

    if (htmlFlavor == 'haml') {
        hamlFn = haml.compileHaml({source: html});
        html = hamlFn();
    }

    if(style.length == 0){
        head.prepend('<style></style>')
        style = output.contents().find("head style");
    }

    style.html(css);
    body.html(html);
}