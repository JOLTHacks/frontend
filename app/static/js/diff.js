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
			$(".item.right").hide();
			// set left column width to 100%
			$(".item.left").width("100%");
		} else {
			// show right column in section content
			$(".item.right").show();
			// set left column width to 50% again
			$(".item.left").width("50%");
		}
	}
});
