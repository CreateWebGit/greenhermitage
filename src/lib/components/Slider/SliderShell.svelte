<script>
	import "./styles/slider.scss";
	import Slider from "./Slider.svelte";

	/**
	 * Props for the Slider component
	 * @typedef {Object} SliderProps
	 * @property {string} showIndicators - Toggle indicators
	 * @property {string} dataSource - Where data comes from. local / remote
	 * @property {string} dataUrl - URL for fetch of data
	 * @property {string} variant - Variant of slider
	 */
	/** @type {SliderProps} */

	const props = $props();
	const {
		showIndicators,
		indicatorAlignment,
		dataSource,
		dataUrl,
		variant,
		navigationVariant,
		navigationAlignment,
		imageDescriptions,
		backgroundColor,
		autoPlay,
		stopAutoPlayonInteraction,
	} = props;
</script>

<Slider {...props} />
