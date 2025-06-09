import type { Bibliography } from "../bibliography/bibliography";

export interface Destination {
	name: string;
	description: string;
	export(bibliography: Bibliography): void;
}
