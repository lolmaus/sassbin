function promptGist(message) {

    if(typeof(message) === 'undefined')
        message = "Please provide a Gist gist ID number. It’s usually a longish number like 29388372.";

    var usersInput = prompt(message);

    if (usersInput) {
        var regexForNumber = /^[\da-f]+$/;
        if(regexForNumber.test(usersInput)) {
            loadGist(usersInput);
        } else {
            promptGist("Wrong number provided. Please provide a Gist gist ID number. It’s usually a longish number like 29388372.");
        }
    }
};