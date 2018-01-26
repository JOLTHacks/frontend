// get list of supported titles from the allSections file
var titles = Object.keys(allSections);
$.each(titles, function(i, title) {
	titles[i] = parseInt(title);
});

// string version to be used in the error message
var titleString = "";

// create string differently depending on how many titles we support
if (titles.length == 1) {
	titleString = titles[0].toString();
} else if (titles.length == 2) {
	titleString = titles[0].toString() + " and " + titles[1].toString();
} else {
	$.each(titles, function(i, title) {
		if (i == titles.length-1) {
			titleString = titleString + "and " + title.toString();
		} else {
			titleString = titleString + title.toString() + ", ";
		}
	})
}

// HOW MANY SECTIONS THEY CAN DIFF AT ONCE
var DIFF_MAX = 5;

// THESE ARE THE YEARS WE SUPPORT
var MIN_YEAR = 1994;
var MAX_YEAR = 2016;

// this is converting them into two digit format...basically just taking the last 2 digits of the number
var MIN_YEAR_SHORT = parseInt(MIN_YEAR.toString().slice(-2));
var MAX_YEAR_SHORT = parseInt(MAX_YEAR.toString().slice(-2));

// NOTE: code presupposes that min year is before 2000 and max year is after 2000.

$(document).ready(function() {

	// we want to trigger validation whenever one of the form fields is "focused out"--i.e. when the user stops working in that field
	$(".validate").focusout( function(event) {
		check(event);
	});

	// we'll also trigger validation when a field is focused in, mainly so the scary red outline goes away
	$(".validate").focusin( function(event) {
		check(event);
	});

	// obviously, we'll also validate the whole form when the user tries to submit
	$("#search").submit( function(event) {
		check(event);
	});

	// this is the beautiful check function
	function check(event) {

		// these variables must be true to submit the form
		var titleGood = false;
		var sectionGood = false;
		var startYearGood = false;
		var endYearGood = false;

		// strip out trailing whitespace and refill it back into the fields (so you don't actually see the ugly spacing)
		$("#title").val($.trim($("#title")[0].value));
		$("#section").val($.trim($("#section")[0].value));
		$("#startYear").val($.trim($("#startYear")[0].value));
		$("#endYear").val($.trim($("#endYear")[0].value));

		// get the new beautiful trimmed values
		title = $("#title")[0].value;
		section = $("#section")[0].value;
		startYear = $("#startYear")[0].value;
		endYear = $("#endYear")[0].value;

		// parse the title entry to an actual number
		if (!isNaN(title)) {
			titleNum = parseFloat(title);
		} else {
			titleNum = title;
		}


		// get the actual numeric values entered for the years
		startYearNum = parseFloat(startYear);
		endYearNum = parseFloat(endYear);

		// cast to four digit version of year
		if (startYear.length == 2) {
			startYearNum = toFourDigit(startYearNum);
		}

		if (endYear.length == 2) {
			endYearNum = toFourDigit(endYearNum);
		}

		// make an array to collect the sections to diff
		var toDiff = [];

		// if user just selected a field, get rid of its scary red box
		if(event.type == "focusin") {
			// i hate myself for having to write it this way
			$("#"+event.target.id).removeClass("bad-form");
		}

		// broadly speaking, there is a block for each input field. if check is called from a single input field, only that block should run
		// so we're not unnecessarily checking things that haven't been changed. if check is called by trying to submit, then every single
		// block will run so that we validate the whole form before submitting.

		// TITLE INPUT VALIDATION
		if(event.type == "submit" || (event.type == "focusout" && event.target.id == "title")) {
			// automatically set all error messages to false
			$.each(errors.titleErrors, function (i, error) {
				error.status = false;
			})

			// white listing first thanks Lydia
			// if we can find the title number in our list of supported titles, we good
			if ($.inArray(titleNum, titles) !== -1) {
				titleGood = true;
			} else {
				// if we're here, the input didn't pass, so change border to red to indicate an error
				$("#title").addClass("bad-form");

				// now figure out what kind of error it is to throw the right error message
				// we only throw one error message at a time... most specific one first
				// we set that particular error to true and at the end we display all the true errors

				if (!Number.isInteger(titleNum)) {
					// error 1: entry not even an integer
					errors.titleErrors.notInt.status = true;
				} else if (titleNum < 1 || titleNum == 53 || titleNum > 54) {
					// error 2: it's an int but it's not even IN the US code
					errors.titleErrors.notCode.status = true;
				} else {
					// error 3: we don't support this title (it's an int and it's in the code, but we don't diff it)
					errors.titleErrors.notFound.status = true;
				}
			}
		}

		// SECTION INPUT VALIDATION
		if(event.type == "submit" || (event.type == "focusout" && event.target.id == "section")) {

			// automatically set all error messages to false
			$.each(errors.sectionErrors, function (i, error) {
				error.status = false;
			})

			// to check if section in title, title needs to be filled in first so we validate that
			$("#title").focusout();

			// trailing whitespace has already been trimmed from the input

			// since we allow comma division for ranges, split on commas
			var ranges = section.split(",");

			// separately validate all given ranges
			$.each(ranges, function (j, range) {

				// trim whitespace again: "3, 4"
				range = $.trim(range);

				// split on various terrible dashes: "4-5"
				var vals = range.split(/[-‒–—―⁓~]/);
				if (vals.length > 1) {
					var tempVals = []
					for (var k = 0; k < vals.length - 1; k++) {
						var checkSection = vals[k] + '-' + vals[k+1];
						if (sectionInTitle(titleNum, checkSection) !== -1) {
							tempVals.push(checkSection);
							k += 1;
						}
						else {
							tempVals.push(vals[k]);
						}
					}
					if ($.inArray(vals[vals.length - 2] + '-' + vals[vals.length - 1], tempVals) == -1) {
						tempVals.push(vals[vals.length - 1]);
					}
					vals = tempVals;
				}

				// iterate over all sets of ranges: "3" and "4-5"
				$.each(vals, function (i, val) {

					// trim again for the idiot who wrote "4 - 5"
					val = $.trim(val);

					// whitelist if:
						// no spaces in text (i.e. this is a number or a dash separated range)
						// they didn't do this: 3-4-5 (i < 2)
						// EITHER: no title entered yet (i.e. can't check if valid section) OR: section is in title

					if (!val.includes(" ") && (i < 2) && ((title.length == 0) || (sectionInTitle(titleNum, val) != -1))) {
						// it passed thank god

						// if only one number, add to our set of sections
						if (i == 0) {
							if ($.inArray(val, toDiff) === -1) {
								toDiff.push(val);
							}
						} else if (i == 1) {
							// if multiple numbers, get the first and second numbers in the range
							var rangeStart = vals[0];
							var rangeEnd = val;

							// find them both in the title list of sections
							var startPlace = sectionInTitle(titleNum, rangeStart);
							var endPlace = sectionInTitle(titleNum, rangeEnd);

							// add everything between the two range endpoints to the "to diff" set
							var addRange = []
							if (startPlace <= endPlace){
								addRange = allSections[titleNum].slice(startPlace+1, endPlace+1);
							}
							else {
								addRange = allSections[titleNum].slice(endPlace+1, startPlace+1);
							}

							$.each(addRange, function (i, r) {
								if ($.inArray(r, toDiff) === -1) {
									toDiff.push(r);
								}
							})

						} else {
							// error: there are too many dashes in this range
							$("#section").addClass("bad-form");
							errors.sectionErrors.dashError.status = true;
						}

						if (toDiff.length <= DIFF_MAX) { // user can only enter a limited number of sections to diff
							sectionGood = true;
						} else {
							// error so red
							$("#section").addClass("bad-form");;

							sectionGood = false;
							errors.sectionErrors.tooMany.status = true;
						}
					} else {
						// error so red
						$("#section").addClass("bad-form");;

						if (val.includes(" ")) {
							errors.sectionErrors.spaceRange.status = true;
						} else if (i >= 2) {
							errors.sectionErrors.dashError.status = true;
						} else if (section.length == 0) {
							errors.sectionErrors.failure.status = true;
						} else if (val.includes("(") || val.includes(")")) {
							errors.sectionErrors.subsection.status = true;
						} else if (sectionInTitle(titleNum, val) == -1) {
							errors.sectionErrors.notFound.status = true;
						} else {
							errors.sectionErrors.failure.status = true;
						}
					}
				});

			});
		}

		// START YEAR INPUT VALIDATION
		if(event.type == "submit" || (event.type == "focusout" && event.target.id == "startYear")) {

			// all error messages to false
			$.each(errors.startYearErrors, function (i, error) {
				error.status = false;
			})


			// we have to validate this year in several ways, all of which are in this terrible if statement:
			// 1. they entered either 2 or 4 characters (supported year display formats)
			// 2. it's an actual int
			// 3. the start year is in our supported range (as given by the constants in the beginning)
			//     a. the start year has to be at least 1 year before the end of our total range so that the end year will always be after the start year
			//     b. if it's a 2 digit year, we have to check the pre- and post- 2000 ranges separately

			if ((startYear.length == 2 || startYear.length == 4) && Number.isInteger(startYearNum) && (between(startYearNum, MIN_YEAR, MAX_YEAR - 1))) {
				startYearGood = true;
			} else {
				// error so red
				$("#startYear").addClass("bad-form");;

				if (!Number.isInteger(startYearNum)) {
					// the year is not even an int
					errors.startYearErrors.notInt.status = true;
				} else {
					// it's an int but it's not in our range of acceptable years
					errors.startYearErrors.notValid.status = true;
				}
			}
		}

		// END YEAR INPUT VALIDATION
		if(event.type == "submit" || (event.type == "focusout" && event.target.id == "endYear")) {

			// all error messages false
			$.each(errors.endYearErrors, function (i, error) {
				error.status = false;
			})

			// we have to check start year as well as end year in case end is filled in and start isn't we need to flag the right thing
			$("#startYear").focusout();

			// this is the same terrible if statement as in start year (read comment above) with 2 changes:
			// we check that EITHER:
				// end year > start year OR
				// end year is our range max (2016 at the time of this writing) OR
				// there is no start year filled in yet (in which case we'll throw an error in the start year box but not here)

			if ((endYear.length == 2 || endYear.length == 4) && Number.isInteger(endYearNum) && between(endYearNum, MIN_YEAR + 1, MAX_YEAR) && (endYearNum > startYearNum || endYearNum == MAX_YEAR || startYear.length == 0)) {
				endYearGood = true;
			} else {
				// error turns it red
				$("#endYear").addClass("bad-form");;

				if (!Number.isInteger(endYearNum)) {
					// input wasn't even a number
					errors.endYearErrors.notInt.status = true;
				} else if (endYearNum <= startYearNum) {
					// time travel error! the end year is before the start year
					errors.endYearErrors.martyMcfly.status = true;
				} else {
					// our generic catch-all error which just says it's not in our supported range
					errors.endYearErrors.notValid.status = true;
				}
			}
		}

		// we clear out the div which displays errors
		$(".error").empty();

		// and now we iterate over all possible errors and display all the ones that were flagged
		$.each(errors, function(i, errorGroup) {
			$.each(errorGroup, function (j, error) {
				if (error.status) {
					$(errorGroup.errorLoc).append("<p>" + error.message + "</p>");
				}
			})
		})

		// this "submits" the form by loading our custom diff url
		if (event.type == "submit") {
			if (titleGood && sectionGood && startYearGood && endYearGood) {
				var sections = toDiff.join("+");

				var address = "diff/" + title + "/" + sections + "/" + startYearNum + "/" + endYearNum;

				window.location = address;
			}

			// this prevents the page from reloading and submitting the "real" form
			event.preventDefault();
		}
	}

	// this is our monster error structure. it's broken down into which field the error is for
	// each error has a "status" (i.e. is the error thrown) and what custom message to display
	var errors = {
		"titleErrors": {
			"errorLoc": "#title-error",
			"notInt": {
				"status": false,
				"message": "Please enter a <a href='https://en.wikipedia.org/wiki/United_States_Code#Titles'>valid US Code Title</a>."
			},
			"notFound": {
				"status": false,
				// TODO use the list of titles we actually support
				"message": "We currently support the following title(s): " + titleString + ". Sorry!"
			},
			"notCode": {
				"status": false,
				"message": "This is not a <a href='https://en.wikipedia.org/wiki/United_States_Code#Titles'>valid title in the US Code</a>."
			}
		},
		"sectionErrors": {
			"errorLoc": "#section-error",
			"tooMany": {
				"status": false,
				"message": "We currently support comparing up to " + DIFF_MAX + " sections at a time. Sorry!"
			},
			"spaceRange": {
				"status": false,
				"message": "Please separate your section ranges using commas or dashes. <i>E.g.,</i> 3, 6-8."
			},
			"notFound": {
				"status": false,
				"message": "One of your sections does not seem to exist in the title you selected."
			},
			"dashError": {
				"status": false,
				"message": "Please make sure your ranges only have one dash. <i>E.g.,</i> 3-4, 5-6; <i>contra</i> 3-4-5."
			},
			"failure": {
				"status": false,
				"message": "Please enter a valid section from this title of the US Code."
			},
			"subsection" : {
				"status": false,
				"message": "Please enter a valid section, not a subsection."
			}
		},
		"startYearErrors": {
			"errorLoc": "#startYear-error",
			"notInt": {
				"status": false,
				"message": "Please enter a number between " + MIN_YEAR + " and " + (MAX_YEAR - 1) + " for the start year."
			},
			"notValid": {
				"status": false,
				"message": "We currently support start years from " + MIN_YEAR + " to " + (MAX_YEAR - 1) + ". Sorry!"
			}
		},
		"endYearErrors": {
			"errorLoc": "#endYear-error",
			"notInt": {
				"status": false,
				"message": "Please enter a number between " + (MIN_YEAR + 1) + " and " + MAX_YEAR + " for the end year."
			},
			"martyMcfly": {
				"status": false,
				"message": "End year must be after the start year."
			},
			"notValid": {
				"status": false,
				"message": "We currently support end years from " + (MIN_YEAR + 1) + " to " + MAX_YEAR + ". Sorry!"
			}
		}
	}

})

// this is a helpful function to see if X is between two given values. we use it a lot for validating year input
function between(x, min, max) {
	return x >= min && x <= max;
}

// this casts two digit years to a four digit version
function toFourDigit(num) {
	if ((num >= MIN_YEAR_SHORT) && (num < MIN_YEAR)) {
		return 1900 + num;
	} else if ((num >= 0) && (num <= MAX_YEAR_SHORT)) {
		return 2000 + num;
	}
}

// checks if the section is in the title and does a case INSENSITIVE search
function sectionInTitle(title, section) {
	var upperIndex = $.inArray(section.toUpperCase(), allSections[title]);
	var lowerIndex = $.inArray(section.toLowerCase(), allSections[title]);

	if ((upperIndex == -1) && (lowerIndex == -1)) {
		return -1
	} else if (upperIndex == -1) {
		return lowerIndex
	} else if (lowerIndex == -1) {
		return upperIndex
	} else if (upperIndex == lowerIndex) {
		return upperIndex
	} else {
		return -1
	}
}
