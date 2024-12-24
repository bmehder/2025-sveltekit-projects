<script>
	const teachers = [
		{
			name: 'Jana Bontranger',
			classes: [
				'6th Grade English',
				'7th Grade English',
				'8th Grade English',
				'Intro to Literary Analysis',
			],
		},
		{
			name: 'Gayle Foley',
			classes: [
				'American Literature',
				'Writing ER',
				'Intermediate Comp',
				'Writing a Research Paper',
			],
		},
		{
			name: 'Faith Cruz',
			classes: ['British Literature', 'German 1', 'German 2', 'German 3'],
		},
		{
			name: 'Sarah Westcott',
			classes: ['Consumer Math', 'Economics'],
		},
		{
			name: 'Becky Coffey',
			classes: [
				'American Government and Civics',
				'Exploring US History',
				'High School US History',
				'World History',
				'World Geography',
			],
		},
		{
			name: 'John Hill',
			classes: ['Psychology'],
		},
		{
			name: 'Haley Hill',
			classes: ['Write Shop 1', 'Write Shop 2'],
		},
		{
			name: 'Christine Filipeck',
			classes: [
				'Health Science',
				'Pre-Physics',
				'Creation Science',
				'Dinosaurs',
				'Young Scientist Marine Science',
			],
		},
		{
			name: 'Claire Hamilton',
			classes: ['Informal Logic'],
		},
	]

	let index = $state()

	function onclick() {
		index = Math.floor(Math.random() * teachers.length)
	}

	onclick()
</script>

{#key index}
	<div class="flow">
		<h2>New MFS Teachers Flash Cards</h2>
		<button {onclick}>New Teacher</button>
		<details class="flow">
			<summary>
				<h3>{teachers[index].name}</h3>
			</summary>

			<ul>
				{#each teachers[index].classes as course}
					<li>{course}</li>
				{/each}
			</ul>
		</details>
	</div>
{/key}

<style>
	div {
		display: grid;
		width: min(24rem, 100%);
		margin-inline: auto;
	}

	h2 {
		text-align: center;
	}

	h3 {
		display: inline;
		padding-inline-start: 0.5rem;
	}

	ul {
		padding-inline-start: 2.5rem;
	}

	button {
		padding-block: 0.5rem;
		padding-inline: 1rem;
	}
</style>
