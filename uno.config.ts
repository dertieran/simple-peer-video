import type { CatppuccinFlavor, ColorFormat } from "@catppuccin/palette";

import { flavors } from "@catppuccin/palette";
import {
	defineConfig,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";
import { presetAnimations } from "unocss-preset-animations";

function hsl({ hsl }: ColorFormat) {
	return `${hsl.h} ${hsl.s * 100}% ${hsl.l * 100}%`;
}

function generateFlavorVariables({ colors }: CatppuccinFlavor) {
	const variables = Object.entries(colors)
		.map(([name, color]) => `--${name}: ${hsl(color)};`)
		.join("\n\t");

	return `
	--background: ${hsl(colors.base)};
	--foreground: ${hsl(colors.text)};
	--card: ${hsl(colors.base)};
	--card-foreground: ${hsl(colors.text)};
	--popover: ${hsl(colors.base)};
	--popover-foreground: ${hsl(colors.text)};
	--primary: ${hsl(colors.blue)};
	--primary-foreground: ${hsl(colors.base)};
	--secondary: ${hsl(colors.surface0)};
	--secondary-foreground: ${hsl(colors.text)};
	--muted: ${hsl(colors.surface0)};
	--muted-foreground: ${hsl(colors.subtext0)};
	--accent: ${hsl(colors.surface0)};
	--accent-foreground: ${hsl(colors.text)};
	--destructive: ${hsl(colors.red)};
	--border: ${hsl(colors.surface1)};
	--input: ${hsl(colors.surface1)};
	--ring: ${hsl(colors.text)};

	${variables}
`;
}

function getCSS() {
	return `
:root {
	--radius: 0.5rem;
	${generateFlavorVariables(flavors.latte)}
}

[data-kb-theme="dark"] {
	${generateFlavorVariables(flavors.mocha)}
}

body * {
	border-color: hsl(var(--border));
}

body {
	color: hsl(var(--foreground));
	background: hsl(var(--background));
}

::-webkit-scrollbar {
  width: 16px;
}

::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  border: 4px solid transparent;
  background-clip: content-box;
	background-color: hsl(var(--accent));
}

::-webkit-scrollbar-corner {
  display: none;
}
`;
}

const catppuccin = Object.fromEntries(
	Object.keys(flavors.frappe.colors).map((name) => [
		name,
		`hsl(var(--${name}))`,
	])
);

export default defineConfig({
	presets: [presetWind3(), presetAnimations()],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	preflights: [{ getCSS }],
	theme: {
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},

			...catppuccin,
		},
		borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		},
		animation: {
			keyframes: {
				"accordion-down":
					"{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }",
				"accordion-up":
					"{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }",
				"collapsible-down":
					"{ from { height: 0 } to { height: var(--kb-collapsible-content-height) } }",
				"collapsible-up":
					"{ from { height: var(--kb-collapsible-content-height) } to { height: 0 } }",
				"caret-blink": "{ 0%,70%,100% { opacity: 1 } 20%,50% { opacity: 0 } }",
			},
			timingFns: {
				"accordion-down": "ease-out",
				"accordion-up": "ease-out",
				"collapsible-down": "ease-out",
				"collapsible-up": "ease-out",
				"caret-blink": "ease-out",
			},
			durations: {
				"accordion-down": "0.2s",
				"accordion-up": "0.2s",
				"collapsible-down": "0.2s",
				"collapsible-up": "0.2s",
				"caret-blink": "1.25s",
			},
			counts: {
				"caret-blink": "infinite",
			},
		},
	},
});
