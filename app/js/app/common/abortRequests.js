function abortRequests() {
    if (requestGist) requestGist.abort();
    if (requestSass) requestSass.abort();
}