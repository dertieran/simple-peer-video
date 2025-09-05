import { nanoid } from 'nanoid';
import { createSignal } from 'solid-js';
import VideoIcon from '~icons/ph/video-camera';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextField, TextFieldRoot } from '@/components/ui/textfield';

export function Join() {
	const [roomId, setRoomId] = createSignal(nanoid());
	const getRoomId = () => roomId().trim();
	function joinVideoRoom() {
		const id = getRoomId();
		if (id)
			window.location.hash = `#${encodeURIComponent(id)}`;
	}

	return (
		<Card class="m-auto max-w-md w-full">
			<CardHeader class="text-center">
				<CardTitle class="flex items-center justify-center gap-2">
					<VideoIcon class="h-6 w-6" />
					WebRTC Video Chat
				</CardTitle>
				<CardDescription>Enter a room ID to start or join a video call</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				<div class="space-y-2">
					<TextFieldRoot>
						<TextField
							placeholder="Enter room ID"
							value={roomId()}
							onInput={e => setRoomId(e.currentTarget.value)}
						/>
					</TextFieldRoot>
				</div>
				<Button onClick={joinVideoRoom} class="w-full" disabled={!getRoomId()}>
					Join Room
				</Button>
				<div class="text-center text-xs text-muted-foreground">
					Share the same room ID with others to video chat together
				</div>
			</CardContent>
		</Card>
	);
}
