import { ComponentProps, createMemo, splitProps } from 'solid-js';
import { encode, QrCodeGenerateData, QrCodeGenerateOptions } from 'uqr';

type QrCodeProps = { data: QrCodeGenerateData } & Omit<QrCodeGenerateOptions, 'onEncoded'> & Omit<ComponentProps<'svg'>, 'viewBox'>;
export function QrCode(props: QrCodeProps) {
	const [local, rest] = splitProps(props, ['data', 'ecc', 'maskPattern', 'boostEcc', 'minVersion', 'maxVersion', 'border', 'invert']);

	const result = createMemo(() => encode(local.data));
	const size = () => result().size;
	function path() {
		let d = '';
		const { size, data } = result();
		for (let x = 0; x < size; x++) {
			for (let y = 0; y < size; y++) {
				if (data[x][y]) {
					d += `M${x},${y}h1v1h-1z`;
				}
			}
		}
		return d;
	}

	return (
		<svg viewBox={`0 0 ${size()} ${size()}`} {...rest}>
			<path fill="currentColor" d={path()} />
		</svg>
	);
}
