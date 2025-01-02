<script>
	import { fly, slide } from 'svelte/transition'

	// Data
	let { data } = $props()

	const GBP = [
		'en-GB',
		{
			style: 'currency',
			currency: 'GBP',
			minimumFractionDigits: 0,
		},
	]

	// Helper functions
	const getProductById = id => data.products.find(product => product.id === id)
	const getCartItemById = id => cartItems.find(cartItem => cartItem.id === id)
	const getCartItemIndex = item => cartItems.indexOf(item)

	const cartItemsTotalReducer = (acc, item) => acc + item.price * item.quantity

	const toGBP = n => new Intl.NumberFormat(...GBP).format(n)

	// State
	const cartItems = $state([])
	const total = $derived(cartItems.reduce(cartItemsTotalReducer, 0))

	// Update state functions
	const addToCart = product => cartItems.push(product)
	const removeFromCart = index => cartItems.splice(index, 1)
	const incrementQuantity = cartItem => cartItem.quantity++

	// Event Handlers
	function handleAddToCart(id) {
		const product = getProductById(id)
		const item = getCartItemById(id)

		if (cartItems.includes(item)) {
			incrementQuantity(item)
		} else {
			addToCart(product)
		}
	}

	function handleRemoveCartItem(id) {
		const item = getCartItemById(id)
		const index = getCartItemIndex(item)

		if (confirm('Are you sure you want to remove this item from the cart?')) {
			removeFromCart(index)
		}
	}
</script>

<section>
	<div class="outer page-title">
		<div class="inner">
			<h1>Store</h1>
		</div>
	</div>
</section>

<section>
	<div class="outer">
		<div class="inner flow">
			<h2>Products</h2>
			<ul class="products flow">
				{#each data.products as product}
					<li class="spread-apart">
						<h3>{product.name}: {toGBP(product.price)}</h3>
						<button onclick={() => handleAddToCart(product.id)}>Add to Cart</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

{#if cartItems.length > 0}
	<section transition:fly={{ x: -800, duration: 300 }}>
		<div class="outer">
			<div class="inner flow">
				<h2>Cart</h2>
				<ul class="cart flow">
					<li>
						<span>Item</span>
						<span>Price</span>
						<span>Quantity</span>
						<span>Item Total</span>
					</li>
					{#each cartItems as cartItem}
						<li transition:slide>
							<span>{cartItem.name}:</span>
							<span>{toGBP(cartItem.price)}</span>
							<input type="number" min="0" bind:value={cartItem.quantity} />
							<span>{toGBP(cartItem.price * cartItem.quantity)}</span>
							<button onclick={() => handleRemoveCartItem(cartItem.id)}>X</button>
						</li>
					{/each}
				</ul>
				<div><strong>Total: {toGBP(total)}</strong></div>
			</div>
		</div>
	</section>
{/if}

<style>
	ul {
		list-style: none;
	}

	input[type='number'] {
		width: 8ch;
		padding: 0.5rem;
	}

	button {
		padding: 0.5rem;
	}

	/* Semantic classes */
	.products {
		width: fit-content;

		li {
			gap: 3rem;
		}
	}

	.cart {
		li {
			width: fit-content;
			display: grid;
			grid-template-columns: repeat(4, 6rem) 1rem;
			justify-items: start;
			align-items: center;
			line-height: 1;

			&:first-child {
				padding-bottom: 0.5rem;
				font-weight: bold;
				border-bottom: 1px solid;
			}

			button {
				justify-self: end;
			}
		}
	}
</style>
