$(document).ready(function() {

    // TODO
    // var titles = API.getTitles();
    var titles = [17, 18, 35];

    $(".validate").focusout( function(event) {
        check(event);
    });

    $(".validate").focusin( function(event) {
        check(event);
    });

    $("#search").submit( function(event) {
        check(event);
    });

    // // override the submit function of the search form on the main page
    // $("#search").submit( function(event) {

    //         // get title and section values from the form fields
    //         title = $("#title")[0].value;
    //         section = $("#section")[0].value;
    
    //         // validate title and section values to be integers
    //         if (!isNaN(title) && title.length > 0 && !isNaN(section) && section.length > 0) {
    //             // manually load the correct diff url
    //             window.location = "diff/" + title + "/" + section;
    //         } else {
    //             alert("Please enter valid title and section");
    //         }

    //         // prevent actual form submission
    //         event.preventDefault();
    // })
    function check(event) {
        console.log(event);

        $("#title").val($.trim($("#title")[0].value));
        $("#section").val($.trim($("#section")[0].value));
        $("#startYear").val($.trim($("#startYear")[0].value));
        $("#endYear").val($.trim($("#endYear")[0].value));

        title = $("#title")[0].value;
        section = $("#section")[0].value;
        startYear = $("#startYear")[0].value;
        endYear = $("#endYear")[0].value;

        startYearNum = parseFloat(startYear);
        endYearNum = parseFloat(endYear);

        if(event.type == "focusin") {
            event.target.style.borderColor="initial";
        }

        if(event.type == "submit" || (event.type == "focusout" && event.target.id == "title")) {
            for (error in errors.titleErrors) {
                errors.titleErrors[error].status = false;
            }

            titleNum = parseFloat(title);

            // white listing first thanks Lydia
            if ($.inArray(titleNum, titles) !== -1) {
                console.log("title found");
            } else {
                $("#title").css("border-color", "red");

                if (!Number.isInteger(titleNum)) {
                    errors.titleErrors.notInt.status = true;
                } else if (titleNum < 1 || titleNum == 53 || titleNum > 54) {
                    errors.titleErrors.notCode.status = true;
                } else {
                    errors.titleErrors.notFound.status = true;
                }
            }            
        }

        if(event.type == "submit" || (event.type == "focusout" && event.target.id == "section")) {
            //TODO
        }

        if(event.type == "submit" || (event.type == "focusout" && event.target.id == "startYear")) {
            for (error in errors.startYearErrors) {
                errors.startYearErrors[error].status = false;
            }

            if ((startYear.length == 2 || startYear.length == 4) && Number.isInteger(startYearNum) && (between(startYearNum, 1994, 2015) || between(startYearNum, 94, 99) || between(startYearNum, 0, 15))) {
                console.log("start year good");
            } else {
                $("#startYear").css("border-color", "red");

                if (!Number.isInteger(startYearNum)) {
                    errors.startYearErrors.notInt.status = true;
                } else {
                    errors.startYearErrors.notValid.status = true;
                }
            }
        }

        if(event.type == "submit" || (event.type == "focusout" && event.target.id == "endYear")) {
            for (error in errors.endYearErrors) {
                errors.endYearErrors[error].status = false;
            }

            $("#startYear").focusout();

            if ((endYear.length == 2 || endYear.length == 4) && Number.isInteger(endYearNum) && (between(endYearNum, 1995, 2016) || between(endYearNum, 95, 99) || between(endYearNum, 0, 16)) && (endYearNum > startYearNum || endYearNum == 2016 || startYear.length == 0)) {
                console.log("end year good");
            } else {
                $("#endYear").css("border-color", "red");

                if (!Number.isInteger(endYearNum)) {
                    errors.endYearErrors.notInt.status = true;
                } else if (endYearNum <= startYearNum) {
                    errors.endYearErrors.martyMcfly.status = true;
                } else {
                    errors.endYearErrors.notValid.status = true;
                }
            }
        }

        $("#error").empty();

        for (errorGroup in errors) {
            for (error in errors[errorGroup]) {
                if (errors[errorGroup][error].status) {
                    $("#error").append(errors[errorGroup][error].message + "<br>");
                }
            }
        }


        // if (event.type == "submit") {
        //     window.location = "diff/" + title + "/" + section;
        //     event.preventDefault();
        // }

        event.preventDefault();
    }

    var errors = {
        "titleErrors": {
            "notInt": {
                "status": false,
                "message": "Please enter a positive integer for the title."
            },
            "notFound": {
                "status": false,
                "message": "We don't currently support this title. Sorry!"
            },
            "notCode": {
                "status": false,
                "message": "This is not a title in the US Code."
            }
        },
        "sectionErrors": {},
        "startYearErrors": {
            "notInt": {
                "status": false,
                "message": "Please enter a positive integer for the start year."
            },
            "notValid": {
                "status": false,
                "message": "We only support start years from 1994 to 2015. Sorry!"
            }
        },
        "endYearErrors": {
            "notInt": {
                "status": false,
                "message": "Please enter a positive integer for the end year."
            },
            "martyMcfly": {
                "status": false,
                "message": "End year must be after the start year."
            },
            "notValid": {
                "status": false,
                "message": "We only support end years from 1995 to 2016. Sorry!"
            }
        }
    }

})

function between(x, min, max) {
    return x >= min && x <= max;
}