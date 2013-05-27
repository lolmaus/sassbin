function configSave() {
    var config = {};

    ['html', 'sass', 'css', 'page'].forEach(function(pane) {
        $pane = $('#pane-' + pane);

        config[pane] = {};

        thisPaneIsVisible = $pane.is(':visible')
        config[pane]['visible'] = thisPaneIsVisible;

        if (thisPaneIsVisible) {
            parentInnerWidth = $pane.parent().width();
            thisPaneLeft = parseInt($pane.css('left'));
            thisPaneRelativeLeft = percentageOf(thisPaneLeft, parentInnerWidth);
            config[pane]['left'] = thisPaneRelativeLeft;

            thisPaneRight = parseInt($pane.css('right'));
            thisPaneRelativeRight = percentageOf(thisPaneRight, parentInnerWidth);
            config[pane]['right'] = thisPaneRelativeRight;

            $thisPaneWrapCheckbox = $('#checkbox-wrap-' + pane);
            if ($thisPaneWrapCheckbox) {
                thisPaneWrap = $thisPaneWrapCheckbox.prop('checked');
                config[pane]['wrap'] = thisPaneWrap;
            }
        }
    });

    config['css-flavor'] = $('#css-flavor').val();

    return config;
}