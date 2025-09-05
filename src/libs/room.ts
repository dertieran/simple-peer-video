import { createSignal } from "solid-js";
import { joinRoom, selfId } from "trystero";
import type { Room } from "trystero";

const appId = "45456b7b-ceda-4a9f-9d71-f7bc0b8d631a";

export function useRoom() {
	let room: Room | undefined;
	let localStream: MediaStream | undefined;
	const [getPeers, setPeers] = createSignal<Record<string, MediaStream>>({});

	return {
		selfId,

		async join(id: string) {
			if (room) {
				await room.leave();
			}

			setPeers({});
			room = joinRoom({ appId }, id);

			if (localStream) {
				room.addStream(localStream);
			}

			room.onPeerJoin((id) => localStream && room.addStream(localStream, id));
			room.onPeerStream((stream, id) =>
				setPeers((peers) => ({ ...peers, [id]: stream }))
			);
			room.onPeerLeave((id) =>
				setPeers((peers) => {
					const updated = { ...peers };
					delete updated[id];
					return updated;
				})
			);
		},

		async setStream(stream?: MediaStream) {
			if (room) {
				if (localStream) {
					room.removeStream(localStream);
				}

				if (stream)
					await Promise.all(room.addStream(stream));
			}

			localStream = stream;
		},

		getPeers() {
			const peers: Array<{ id: string; stream: MediaStream }> = [];
			for (const [id, stream] of Object.entries(getPeers())) {
				peers.push({ id, stream });
			}
			return peers;
		},
	};
}
