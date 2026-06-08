<script>
	let { title, backgroundImage, height = 350 } = $props();
</script>

<section
	class="cw-section--hero-component full-width cw-grid"
	style={`background-image: url(${backgroundImage}); height: ${height / 16}rem;`}
>
	<div class="cw-col-12 cw-col-xs-12">
		<h1 class="text-beige">{title}</h1>
	</div>
</section>
