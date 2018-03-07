import styles from '../css/header-constants.scss'

const screenMed = parseInt(styles.screenMed);

$(function () {

	// this variable will control whether 2 panes are visible
	var twoPanes = true;
	// set default view based on current screen size
	if ($(window).innerWidth() <= screenMed) {
		twoPanes = false;
	}

	// onclick, change dropdown display to current selection
	$(".left .dropdown-menu a").click(function(){
		changeClauseDisplay('.left', $(this));
	});

	$(".right .dropdown-menu a").click(function(){
		changeClauseDisplay('.right', $(this));
	});

	// initialize with before on left and markup class on right
	defaultTwoPaneView();

	// set proper screen display initially based on screen size
	setPanes(twoPanes);

	// add an onclick function to the toggle button
	$("#pane-button").click(function () {
		twoPanes = !twoPanes;
		setPanes(twoPanes);
	});

	// if screen suddenly gets small, make sure only one column is vis
	$(window).resize(function() {
		if ($(window).innerWidth() <= screenMed) {
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
			defaultTwoPaneView();
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
	
	function defaultTwoPaneView() {
		$("#leftInitial").click();
		$("#rightInitial").click();
	}
});
