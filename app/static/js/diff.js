import styles from '../css/header-constants.scss'

const screenMed = parseInt(styles.screenMed);

$(function () {

	// we now use cookies! this checks if any have been set, and if not, sets them to our defaults
	// cookies are used only for 2 pane display settings
	if (!localStorage.getItem("twoPaneMem")) {
		localStorage.setItem("twoPaneMem", true);
	}
	// the column display settings store the ID of the right button to click to get that setting
	if (!localStorage.getItem("leftDisplay")) {
		localStorage.setItem("leftDisplay", "#leftBefore");
	}
	if (!localStorage.getItem("rightDisplay")) {
		localStorage.setItem("rightDisplay", "#rightMarkup");
	}

	// onclick, change dropdown display to current selection
	$(".left .dropdown-menu a").click(function(){
		localStorage.setItem("leftDisplay", "#" + $(this)[0]["id"]);
		changeClauseDisplay('.left', $(localStorage.getItem("leftDisplay")));
	});

	$(".right .dropdown-menu a").click(function(){
		localStorage.setItem("rightDisplay", "#" + $(this)[0]["id"]);
		changeClauseDisplay('.right', $(localStorage.getItem("rightDisplay")));
	});

	// initialize toggle display
	setToggleDisplay();

	// initialize with saved column views
	setTwoPaneView();

	// set default view based on current screen size
	if ($(window).innerWidth() <= screenMed) {
		setPanes(false);
	} else {
		// if screen is big we use the cookie settings
		setPanes(localStorage.getItem("twoPaneMem"));
	}

	// add an onclick function to the toggle button
	$("#pane-button").click(function () {
		localStorage.setItem("twoPaneMem", !JSON.parse(localStorage.getItem("twoPaneMem")));
		setPanes(localStorage.getItem("twoPaneMem"));
	});

	// if screen suddenly gets small, make sure only one column is vis
	$(window).resize(function() {
		if ($(window).innerWidth() <= screenMed) {
			setPanes(false);
		} else {
			setPanes(localStorage.getItem("twoPaneMem"));
		}
	});

	function setPanes(twoPanes) {
		// it gets passed as a string from the cookie
		twoPanes = JSON.parse(twoPanes);
		// if only one pane visible do this
		if (!twoPanes) {
			// hide the right column in the section content
			$(".right").addClass("hidden");
			// set left column width to 100% and show full markup
			$(".left").addClass("full-width markup");
			$(".left").removeClass("before after");
			// hide dropdown selectors
			$(".dropdown").each (function (i, btn) {
				$(btn).addClass("hidden");
			})
			// set section bar view to basic
			$(".section-bar").each (function (i, btn) {
				$(btn).removeClass("two-pane-on");
			})
		} else {
			// show right column in section content
			$(".right").removeClass("hidden");
			// set left column width to 50% again
			$(".left").removeClass("full-width");
			// show dropdown selectors
			$(".dropdown").each (function (i, btn) {
				$(btn).removeClass("hidden");
			})
			// set section bar view to 2 pane version
			$(".section-bar").each (function (i, btn) {
				$(btn).addClass("two-pane-on");
			})
			// show proper display
			setTwoPaneView();
			setToggleDisplay();
		}
		reindent();
	}

	function reindent() {
		// set indenting based on level of subsection
		$(".item").each(function (i, clause) {
			// remove previous styles so we're not stacking indents
			$(clause).removeAttr("style");

			var currIndent = parseInt($(clause).css("padding-left"));
			var indentAmt = $(clause).data("indent");

			// set padding left to be old val + new amount
			var newIndent = Math.min(indentAmt, 3) * 25;
			$(clause).css("padding-left", currIndent + newIndent);
		})
	}

	function changeClauseDisplay(side, clickedNode) {
		$(".dropdown" + side).find('.selection').text(clickedNode.text());
		$(".dropdown" + side).find('.selection').val(clickedNode.text());
		
		var newClass = clickedNode.data("display");
		$(".item" + side).each( function(i, clause) {
			$(clause).removeClass("markup before after");
			$(clause).addClass(newClass);
		})
	}
	
	function setTwoPaneView() {
		$(localStorage.getItem("leftDisplay")).click();
		$(localStorage.getItem("rightDisplay")).click();
	}

	// initialize toggle display based on whether twoPaneMem is on or not
	function setToggleDisplay() {
		if (JSON.parse(localStorage.getItem("twoPaneMem"))) {
			$("#pane-button").addClass("active");
			$("#pane-button").attr("aria-pressed", true);
		} else {
			$("#pane-button").removeClass("active");
			$("#pane-button").attr("aria-pressed", false);
		}
	}
});
