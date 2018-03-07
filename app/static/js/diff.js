import styles from '../css/header-constants.scss'

const screenMed = parseInt(styles.screenMed);

$(function () {

	// this variable will control whether 2 panes are visible
	var twoPanes = true;
	// set default view based on current screen size
	if ($(window).width() <= screenMed) {
		twoPanes = false;
	}

	// set proper screen display initially based on screen size
	setPanes(twoPanes);

	// add an onclick function to the toggle button
	$("#pane-button").click(function () {
		twoPanes = !twoPanes;
		setPanes(twoPanes);
	});

	// if screen suddenly gets small, make sure only one column is vis
	$(window).resize(function() {
		if ($(window).width() <= screenMed) {
			twoPanes = false;
		} else {
			twoPanes = true;
		}	
		setPanes(twoPanes);
	});

	function setPanes(twoPanes) {
		// if only one pane visible do this
		if (!twoPanes) {
			// hide the right column in the section content
			$(".right").addClass("hidden");
			// set left column width to 100%
			$(".left").addClass("full-width");
		} else {
			// show right column in section content
			$(".right").removeClass("hidden");
			// set left column width to 50% again
			$(".left").removeClass("full-width");
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
});
