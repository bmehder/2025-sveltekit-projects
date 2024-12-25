<script>
	import Accordion from '$lib/Accordion.svelte'

	let { data } = $props()
</script>

<section>
	<div class="outer">
		<div class="inner" style="max-width: 32rem;">
			<Accordion items={data.faqs} name="faqs"></Accordion>
		</div>
	</div>
</section>
