interface ModuleBase {
	name: string;
	outputs: string[];
}

interface Flipflop extends ModuleBase {
	type: "flipflop";
	state: "on" | "off";
}

interface Conjunction extends ModuleBase {
	type: "conjunction";
	inputs: Map<string, 0 | 1>;
	on_sending_low?: (self: Conjunction) => void;
}

interface Broadcast extends ModuleBase {
	type: "broadcast";
}

interface Output extends ModuleBase {
	type: "output"
	// on_low: () => void;
}

export type Modules = Flipflop | Conjunction | Broadcast | Output;
