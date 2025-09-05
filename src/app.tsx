import { ColorModeProvider } from '@kobalte/core/color-mode';
import { createSignal, Show } from 'solid-js';

import { Join } from './pages/join';
import { Room } from './pages/room';

function getRoomId() {
	const id = window.location.hash.substring(1);
	if (id)
		return decodeURIComponent(id);
}

export default function App() {
	const [room, setRoom] = createSignal(getRoomId());
	window.addEventListener('hashchange', () => setRoom(getRoomId()));

	return (
		<ColorModeProvider>
			<main class="min-h-screen p-4">
				<Show when={room()} fallback={<Join />}>
					<Room room={room()} />
				</Show>

			</main>
		</ColorModeProvider>
	);
};
