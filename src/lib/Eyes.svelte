<script lang="ts">
	type MousePosition = { pageX: number; pageY: number }

	const handleMousemove = ({ pageX, pageY }: MousePosition) => {
		const eyes = document.querySelectorAll('.eye')

		const callbackFn = (eye: HTMLDivElement) => {
			const x = eye.getBoundingClientRect().left + Number(eye.style.width) / 2
			const y = eye.getBoundingClientRect().top + Number(eye.style.height) / 2

			const radian = Math.atan2(pageX - x, pageY - y)
			const rotation = radian * (180 / Math.PI) * -1 + 270

			eye.style.transform = `rotate(${rotation}deg)`
		}

		eyes.forEach(callbackFn)
	}
</script>

<aside class="eyes-app" onmousemove={handleMousemove}>
	<div class="eyes">
		<div class="eye"></div>
		<div class="eye"></div>
	</div>
</aside>

<style>
	.eyes-app {
		min-height: 80dvh;
		display: grid;
		place-items: center;
		/* background-color: #2e7fbd; */
	}

	.eyes {
		display: flex;
		flex-wrap: wrap;
		gap: 4rem;
		padding: 2rem;
	}

	.eye {
		width: 120px;
		height: 120px;
		position: relative;
		background-color: white;
		border-radius: 50%;
	}

	.eye::before,
	.eye::after {
		position: absolute;
		content: '';
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}

	.eye::before {
		width: 45px;
		height: 45px;
		left: 35px;
		background-color: #205179;
		border: 10px solid #2196f3;
	}

	.eye::after {
		width: 10px;
		height: 10px;
		left: 25px;
		background-color: white;
	}
</style>
