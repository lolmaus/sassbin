var ga = $.ga({'_setAccount': 'UA-41634131-1'});

function GoogleAnalyticsTrackThisPage() {
  ga.track('pageview', window.location.pathname);
}

function GoogleAnalyticsTrackThisPage() {
  ga.track('event', 'AJAX', 'compilation');
}

GoogleAnalyticsTrackThisPage();