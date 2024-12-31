<script>
	import { fly } from 'svelte/transition'

	// Data
	const products = [
		{
			id: 1,
			name: 'Apples',
			price: 1,
			quantity: 1,
		},
		{
			id: 2,
			name: 'Bananas',
			price: 2,
			quantity: 1,
		},
		{
			id: 3,
			name: 'Oranges',
			price: 3,
			quantity: 1,
		},
	]

	// Helpers functions
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	})
	const getProductById = id => products.find(product => product.id === id)
	const getCartItemById = id => cartItems.find(cartItem => cartItem.id === id)
	const getIndexOfCartItem = item => cartItems.indexOf(item)
	const add = (acc, item) => acc + item.price * item.quantity

	// State
	const cartItems = $state([])
	const total = $derived(cartItems.reduce(add, 0))
	const formattedTotal = $derived(formatter.format(total))

	// Update state functions
	const addToCart = item => cartItems.push(item)
	const removeFromCart = index => cartItems.splice(index, 1)

	// Event Handlers
	function handleAddToCart(id) {
		const product = getProductById(id)
		const item = getCartItemById(id)

		if (cartItems.includes(item)) {
			item.quantity++
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
				{#each products as { id, name, price }}
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
				<ul class="cart">
					<li>
						<span>Item</span>
						<span>Price</span>
						<span>Quantity</span>
						<span>Item Total</span>
					</li>
					{#each cartItems as { id, name, price, quantity }, i}
						{@const formattedPrice = formatter.format(price)}
						{@const formattedItemTotal = formatter.format(price * quantity)}
						<li>
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

	.products {
		width: fit-content;

		li {
			gap: 3rem;
		}
	}

	.cart {
		display: grid;
		gap: 1rem;

		li {
			width: fit-content;
			display: grid;
			grid-template-columns: 6rem 4rem 6rem 6rem 1rem;
			justify-items: start;
			align-items: center;
			gap: 1rem;

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
