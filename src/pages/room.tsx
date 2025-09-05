import { createStream } from '@solid-primitives/stream';
import { createEffect, createMemo, For } from 'solid-js';
import UsersIcon from '~icons/ph/users';

import { ShareRoom } from '@/components/ShareRoom';
import { Badge } from '@/components/ui/badge';
import { VideoCard } from '@/components/VideoCard';

import { useRoom } from '../libs/room';

export function Room(props: { room: string }) {
	const room = useRoom();
	const peers = createMemo(() => room.getPeers());
	function getPeersInfo() {
		const size = peers().length;
		return `${size + 1} participant${size !== 0 ? 's' : ''}`;
	}

	const [localStream] = createStream({ video: true });
	createEffect(() => {
		const stream = localStream();
		if (stream)
			room.setStream(stream);
	});

	createEffect(() => room.join(props.room));

	return (
		<div class="min-h-screen p-4">
			<div class="mx-auto max-w-6xl space-y-4">
				{/* Header */}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Badge variant="secondary" class="flex items-center gap-1">
							<UsersIcon class="h-3 w-3" />
							Room:
							{' '}
							{props.room}
						</Badge>
						<Badge variant="outline">
							{getPeersInfo()}
						</Badge>
					</div>
					<ShareRoom roomId={props.room} />
				</div>

				{/* Video Grid */}
				<main class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
					{/* Local Video */}
					<VideoCard badge="You" stream={localStream()} />

					{/* Remote Videos */}
					<For each={peers()}>
						{peer => <VideoCard badge={peer.id} stream={peer.stream} />}
					</For>
				</main>
			</div>
		</div>
	);
}
