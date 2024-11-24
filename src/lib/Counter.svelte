<script>
	let count = $state(0)

	let isTooHigh = $derived(count > 5)
	let isTooLow = $derived(count < -5)

	const decrement = () => count--
	const increment = () => count++
</script>

<main class="flow">
	<h1>Counter</h1>
	<div class:tomato={isTooHigh} class:dodgerblue={isTooLow}>
		{count}
	</div>
	<div>
		<button onclick={decrement}>-</button>
		<button onclick={increment}>+</button>
	</div>
</main>

<style>
	main {
		min-height: 100dvh;
		display: grid;
		place-content: center;
		text-align: center;
		font-size: 2rem;
	}

	button {
		padding-inline: 1rem;
		font: inherit;
	}

	.tomato {
		color: tomato;
	}

	.dodgerblue {
		color: dodgerblue;
	}
</style>
