/**
 * jquery.ga.js 0.0.3 - https://github.com/yckart/jquery.ga.js
 * Google analytics implementation for jQuery.
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/09
**/
;(function($, window) {
    window._gaq = window._gaq || [];

    String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); };

    /**
     * Add the analytics command to the queue.
     *
     * See the API documentation for the available commands and arguments:
     *     - http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html
     *
     * options - string or function. Name of the command to push or a function to push
     * [arguments]* - any. Additional arguments to be passed to the options
     */
    $.ga = function(options) {
        if($.isFunction(options)) {
            $.ga.push(options);
        } else if($.isPlainObject(options)) {
            $.each(options, function (option, value) {
                $.ga.push(option, value);
            });
        } else {
            $.ga.push(Array.prototype.slice.call(arguments));
        }
        $.ga.track('pageview');
        $.ga._getScript();
        return $.ga;
    };

    $.map(['_track', '_get', '_set', '_create', '_add', '_link', '_delete', '_clear'], function(value){
        $.ga[value.replace('_', '')] = function(method){
            var args = [].slice.call(arguments);
            return this.push(value + args[0].capitalize(), args.splice(1));
        };
    });

    $.extend($.ga, {
        debug: false,
        push: function () {
            var args = [].concat([].slice.call(arguments)),
                data = $.map(args, function (value) {
                    return $.type(value) === 'boolean' ? (value ? true : false) : value;
                });
            if (data.length < 1) return this;
            if (this.debug) console.log("ga.push", data);
            _gaq.push(data);
            return this;
        },
        _getScript: function () {
            $.ajax({
                type: 'GET',
                url: "//google-analytics.com/ga.js",
                dataType: "script",
                cache: true,
                success: function () {
                    // never load this again...
                    $.ga._getScript = $.noop;
                }
            });
        }
    });
}(jQuery, window));
