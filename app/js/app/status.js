function leavingAlready() {
    if(appStatusIsModified)
        return "Abandon changes?";
}

window.onbeforeunload = leavingAlready;