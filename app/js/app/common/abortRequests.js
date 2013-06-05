function abortGistRequest() {
  if (requestGist) requestGist.abort();
}

function abortSassRequest() {
  if (requestSass) requestSass.abort();
}

function abortRequests() {
  abortGistRequest();
  abortSassRequest();
}

