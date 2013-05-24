$.fn.activate = function() {
    $(this).addClass('is-active');
    $(this).removeClass('is-inactive');
};

$.fn.deactivate = function() {
    $(this).removeClass('is-active');
    $(this).addClass('is-inactive');
}