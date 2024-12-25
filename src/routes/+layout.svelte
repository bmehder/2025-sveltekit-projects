<script>
	import '$lib/style.css'
	import Header from '$lib/Header.svelte'

	let { children } = $props()
</script>

<Header></Header>

<main>
	{@render children()}
</main>
