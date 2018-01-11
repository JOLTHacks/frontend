window.onload = function() {

    // override the submit function of the search form on the main page
    $("#search").submit( function(event) {

            // get title and section values from the form fields
            title = $("#title")[0].value;
            section = $("#section")[0].value;
    
            // validate title and section values to be integers
            if (!isNaN(title) && title.length > 0 && !isNaN(section) && section.length > 0) {
                // manually load the correct diff url
                window.location = "diff/" + title + "/" + section;
            } else {
                alert("Please enter valid title and section");
            }

            // prevent actual form submission
            event.preventDefault();
        })
}