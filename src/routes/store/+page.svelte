<script>
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
	const getProductById = id => products.find(product => product.id === id)
	const getCartItemById = id => cartItems.find(cartItem => cartItem.id === id)
	const getIndexOfCartItem = item => cartItems.indexOf(item)
	const add = (acc, item) => acc + item.price * item.quantity

	// State
	const cartItems = $state([])
	const total = $derived(cartItems.reduce(add, 0))

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
			<ul class="products auto-fit">
				{#each products as product}
					<li>
						<h3>{product.name} ${product.price}</h3>
						<button onclick={() => handleAddToCart(product.id)}>Add to Cart</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="outer">
		<div class="inner flow">
			<h2>Cart</h2>
			<ul class="cart">
				{#each cartItems as cartItem}
					<li>
						{cartItem.name}: ${cartItem.price}
						<input type="number" bind:value={cartItem.quantity} />
						${cartItem.price * cartItem.quantity}
						<button onclick={() => handleRemoveCartItem(cartItem.id)}>X</button>
					</li>
				{/each}
			</ul>
			<div><strong>Total: ${total}</strong></div>
		</div>
	</div>
</section>

<style>
	ul {
		list-style: none;
	}

	input[type='number'] {
		padding: 0.5rem;
	}

	button {
		padding: 0.5rem;
	}

	.products li {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}

	.cart {
		display: grid;
		gap: 0.5rem;

		li {
			display: grid;
			grid-template-columns: 8rem repeat(3, 6ch);
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
