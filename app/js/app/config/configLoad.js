function configLoad(config) {

    ['html', 'sass', 'css', 'page'].forEach(function(pane) {

        if (config[pane]) {
            $pane = $('#pane-' + pane);
            $checkbox = $('#checkbox-pane-' + pane);

            if (config[pane]["visible"]) {
                $checkbox.prop('checked', true);
                $pane.activate();
                $pane.css('left', config[pane]['left']);
                $pane.css('right', config[pane]['right']);
                resizeEditor(pane);
            }
            else {
                $checkbox.prop('checked', false);
                $pane.deactivate();
            }
            thisPaneWrap = config[pane]['wrap'];
            if (typeof thisPaneWrap != 'undefined')
                editorWrapSet(pane, thisPaneWrap);
        }
    });

    $('#css-flavor').val(config['css-flavor']);
    $('#html-flavor').val(config['html-flavor']);
    applyResizableToPanes();
}