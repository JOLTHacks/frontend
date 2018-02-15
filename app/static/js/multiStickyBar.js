// TODO: need to replace all instances of window.scrollTop with the header combined height

// js/animation.js
import styles from '../css/header-constants.scss'

const headerHeightBig = parseInt(styles.headerHeightBig);
const headerHeightSmall = parseInt(styles.headerHeightSmall);
const headerHeightShrinkBig = parseInt(styles.headerHeightShrinkBig);
const headerHeightShrinkSmall = parseInt(styles.headerHeightShrinkSmall);
const screenMed = parseInt(styles.screenMed);

var stickyHeaders = (function () {

	var $window = $(window),
		$stickies;

	var load = function (stickies) {

		if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

			$stickies = stickies.each(function () {

				var $thisSticky = $(this).wrap('<div class="followWrap" />');

				$thisSticky
					.data('originalPosition', $thisSticky.offset().top)
					.data('originalHeight', $thisSticky.outerHeight())
					.parent()
					.height($thisSticky.outerHeight());
			});

			$window.off("scroll.stickies").on("scroll.stickies", function () {
				_whenScrolling();
			});
		}
	};

	var _whenScrolling = function () {

		$stickies.each(function (i) {

			var $thisSticky = $(this),
				$stickyPosition = $thisSticky.data('originalPosition');

			var headerHeight;
			var screenBig = $window.width() >= screenMed;
			var isShrunk = $("#nav").hasClass("shrink");
			
			if (screenBig && !isShrunk) {
				headerHeight = headerHeightBig;
			} else if (screenBig && isShrunk) {
				headerHeight = headerHeightShrinkBig;
			} else if (!screenBig && !isShrunk) {
				headerHeight = headerHeightSmall;
			} else {
				headerHeight = headerHeightShrinkSmall;
			}

			var scrollComparison = $window.scrollTop() + headerHeight + $thisSticky.data("originalHeight");

			if ($stickyPosition <= scrollComparison) {

				var $nextSticky = $stickies.eq(i + 1),
					$nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');

				$thisSticky.addClass("fixed");

				if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {

					$thisSticky.addClass("absolute").css("top", $nextStickyPosition);
				}

			} else {

				var $prevSticky = $stickies.eq(i - 1);

				$thisSticky.removeClass("fixed");

				if ($prevSticky.length > 0 && scrollComparison <= $thisSticky.data('originalPosition') + $thisSticky.data('originalHeight')) {

					$prevSticky.removeClass("absolute").removeAttr("style");
				}
			}
		});
	};

	return {
		load: load
	};
})();

$(function () {
	stickyHeaders.load($(".section-bar"));
});