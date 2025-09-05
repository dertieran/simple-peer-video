import { writeClipboard } from '@solid-primitives/clipboard';
import { createSignal, Show } from 'solid-js';
import IconCheck from '~icons/ph/check';
import IconCopy from '~icons/ph/copy';
import IconShare from '~icons/ph/share';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { QrCode } from './QrCode';
import { Button } from './ui/button';

type ShareRoomProps = { roomId: string };
export function ShareRoom(props: ShareRoomProps) {
	function link() {
		const url = new URL(location.href);
		url.hash = `#${encodeURIComponent(props.roomId)}`;
		return url.href;
	}

	let timeoutId: number | undefined;
	const [isCopied, setCopied] = createSignal(false);
	async function copy() {
		clearTimeout(timeoutId);

		await writeClipboard(link());
		setCopied(true);
		timeoutId = window.setTimeout(() => setCopied(false), 1000);
	}

	return (
		<Dialog>
			<DialogTrigger as={Button} size="icon" variant="secondary"><IconShare class="h-4 w-4" /></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Share Room</DialogTitle>
				</DialogHeader>
				<QrCode data={link()} />
				<DialogFooter>
					<Button onClick={copy} variant="secondary" class={isCopied() ? 'color-green' : ''}>
						<Show
							when={isCopied()}
							fallback={<IconCopy class="mr-2 h-4 w-4" />}
						>
							<IconCheck class="mr-2 h-4 w-4" />
						</Show>
						{isCopied() ? 'Copied' : 'Copy'}
						{' '}
						Link
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
