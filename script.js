var mode = "google";

function update() {
    var text = null;

    if(mode === "google") {
        text = "View Google Web Cache";
    } else if(mode === "archiveorg") {
        text = "View Archive.org Cache";
    } else if(mode === "archiveis") {
        text = "View Archive.is Cache";
    } else if(mode === "live") {
        text = "View Live Version";
    } else if(mode === "megalodon") {
        text = "View Megalodon Cache";
    }

    $('#query').html(text || "View Google Web Cache")
}

var GOOGLE_WEBCACHE_PREFIX = "http://webcache.googleusercontent.com/search?q=cache:";
var ARCHIVE_ORG_PREFIX = "https://web.archive.org/web/";
var ARCHIVE_IS_PREFIX = "http://archive.is/";
var MEGALODON_PREFIX = "http://megalodon.jp/?url=";

function getGoogleURL(url) {
    url = url.trim();
    return GOOGLE_WEBCACHE_PREFIX + encodeURIComponent(url.replace(/(^\w+:|^)\/\//, ''));
}

function getArchiveOrgURL(url) {
    url = url.trim();
    return ARCHIVE_ORG_PREFIX + encodeURIComponent(url);
}

function getArchiveIsURL(url) {
    url = url.trim();
    return ARCHIVE_IS_PREFIX + encodeURIComponent(url);
}

function getMegalodonURL(url) {
    url = url.trim();
    return MEGALODON_PREFIX + encodeURIComponent(url);
}

function getCacheURL(url) {
    if(mode === "google") return getGoogleURL(url);
    else if(mode === "archiveorg") return getArchiveOrgURL(url);
    else if(mode === "archiveis") return getArchiveIsURL(url);
    else if(mode === "megalodon") return getMegalodonURL(url);
    else if(mode === "live") return url;
    else return getGoogleURL(url);
}

function checkValid(override) {
    var input = $('#url-input');
    var value = input.val();
    var valid = document.getElementById("url-input").checkValidity();

    if(value.trim().length > 0 && valid) {
        input.toggleClass('is-invalid', false);
        return true;
    } else {
        input.toggleClass('is-invalid', true);
        return false;
    }
}

function submit() {
    if(checkValid()) {
        window.open(getCacheURL($('#url-input').val()))
        return;
    } else {
        if($('#url-input').val().length > 0 && $('#url-input').val().indexOf("http") === -1) {
            console.log("does not contain http")
            $('#url-input').val("http://" + $('#url-input').val());
            submit();
            return;
        }
    }

    alert("Please enter a valid URL.");
}

$( document ).ready(function() {
    $('#query').on('click', function(event) {
        event.preventDefault();
        submit();
    });

    $('#url-input').change(function(event) {
        checkValid();
    });

    $("#url-input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            submit();
        }
    });

    $('#google').on('click', function() {
        mode = "google";
        update();
    });

    $('#archiveorg').on('click', function() {
        mode = "archiveorg";
        update();
    });

    $('#archiveis').on('click', function() {
        mode = "archiveis";
        update();
    });

    $('#megalodon').on('click', function() {
        mode = "megalodon";
        update();
    });

    $('#live').on('click', function() {
        mode = "live";
        update();
    });
});