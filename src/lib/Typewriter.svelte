<script>
	// Import statements
	import { fade } from 'svelte/transition'
	import Icon from '@iconify/svelte'

	// Props
	let { message = 'Add a message prop!', speed = 1000 } = $props()

	// State (including derived state)
	let output = $state([])
	let isDone = $derived(output.length === message.length)
	let formattedOutput = $derived(output.join(''))

	// Just variables - not state
	let currentIndex = 0
	let intervalId
	const delay = 1000

	// Procedures (Side effects)
	function typeLetter() {
		output.push(message[currentIndex])
		currentIndex++
	}

	function startTyping() {
		currentIndex = 0
		output = []
		intervalId = setInterval(typeLetter, speed)
	}

	// Event handler (callback function)
	function handleClick() {
		setTimeout(startTyping, delay)
	}

	setTimeout(startTyping, delay)

	// Does side effects based on state (including derived state)
	$effect(() => {
		if (isDone) {
			clearInterval(intervalId)
		}
	})

	$inspect(output)
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div>
	{formattedOutput}
	{#if isDone}
		<button onclick={handleClick} in:fade>
			<Icon icon="tabler:reload" width="32" height="32" />
		</button>
	{/if}
</div>

<style>
	div {
		font-family: 'Special Elite', system-ui;
		font-size: 3rem;
		line-height: 1.2;
		letter-spacing: 1px;
	}

	button {
		background: none;
		border: none;
	}

	button:hover {
		opacity: 0.8;
	}
</style>
