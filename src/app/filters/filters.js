//HTML Stripping filter

app. filter('htmlStripper', function() {
    return function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
    }
});