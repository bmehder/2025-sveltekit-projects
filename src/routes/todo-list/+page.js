export async function load() {
	return {
		items: [
			{ name: 'Buy Groceries', isDone: false, id: crypto.randomUUID() },
			{ name: 'Do Laundry', isDone: true, id: crypto.randomUUID() },
			{ name: 'Learn JS', isDone: false, id: crypto.randomUUID() },
		],
	}
}
