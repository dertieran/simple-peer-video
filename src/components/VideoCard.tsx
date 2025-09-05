import { createEffect } from 'solid-js';

import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';

type VideoCardProps = { stream: MediaStream; badge: string };
export function VideoCard(props: VideoCardProps) {
	let videoEl: HTMLVideoElement;
	createEffect(() => {
		videoEl.srcObject = props.stream;
	});

	return (
		<Card class="overflow-hidden">
			<CardContent class="p-0">
				<video ref={videoEl} autoplay muted playsinline class="m-0 h-64 w-full object-cover" />
			</CardContent>
			<CardFooter class="flex-row-reverse p-2">
				<Badge variant="secondary">{props.badge}</Badge>
			</CardFooter>
		</Card>
	);
}
