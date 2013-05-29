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

            // Working around a jQuery/Chrome issue: http://bugs.jquery.com/ticket/13956
            thisPaneRightRaw = $pane.css('right');
            if (thisPaneRightRaw.slice(-1) == '%')
                thisPaneRelativeRight = thisPaneRightRaw;
            else
                thisPaneRelativeRight = percentageOf(parseInt(thisPaneRightRaw), parentInnerWidth);
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