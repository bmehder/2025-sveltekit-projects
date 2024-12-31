<script>
	import { fly, slide } from 'svelte/transition'

	// Data
	let { data } = $props()

	// Utilities
	const formatter = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 0,
	})

	// Helper functions
	const getProductById = id => data.products.find(product => product.id === id)
	const getCartItemById = id => cartItems.find(cartItem => cartItem.id === id)
	const getIndexOfCartItem = item => cartItems.indexOf(item)
	const cartItemsReducer = (acc, item) => acc + item.price * item.quantity

	// State
	const cartItems = $state([])
	const total = $derived(cartItems.reduce(cartItemsReducer, 0))
	const formattedTotal = $derived(formatter.format(total))

	// Update state functions
	const addToCart = item => cartItems.push(item)
	const removeFromCart = index => cartItems.splice(index, 1)
	const incrementQuantity = item => item.quantity++

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
		const index = getIndexOfCartItem(item)

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
				{#each data.products as { id, name, price }}
					{@const formattedPrice = formatter.format(price)}
					<li class="spread-apart">
						<h3>{name}: {formattedPrice}</h3>
						<button onclick={() => handleAddToCart(id)}>Add to Cart</button>
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
					{#each cartItems as { id, name, price, quantity }, i}
						{@const formattedPrice = formatter.format(price)}
						{@const formattedItemTotal = formatter.format(price * quantity)}
						<li transition:slide>
							<span>{name}:</span>
							<span>{formattedPrice}</span>
							<input type="number" min="0" bind:value={cartItems[i].quantity} />
							<span>{formattedItemTotal}</span>
							<button onclick={() => handleRemoveCartItem(id)}>X</button>
						</li>
					{/each}
				</ul>
				<div><strong>Total: {formattedTotal}</strong></div>
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
