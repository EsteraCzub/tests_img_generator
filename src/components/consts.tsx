import {h} from "preact";

export const POP_PROMPT = (
	<div>
		Using () in the prompt increases the model's attention to the enclosed word/phrase, and [] decreases it.
	</div>
);
export const POP_NEGATIVE = (
	<div>
		Negative prompt is the second most important parameter after the standard prompt.
	</div>
);
export const POP_GS = (
	<div>
		The Guidance Scale parameter controls how closely Stable Diffusion will follow your prompt when generating
		images.
	</div>
);
export const POP_SEED = (
	<div>
		The seed parameter is responsible for creating the initial noise that is used to generate the image.
	</div>
);
export const MAX_WORD_COUNT = 75;
