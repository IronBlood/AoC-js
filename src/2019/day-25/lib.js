import { createInterface } from "node:readline/promises";

import {
	IntcodeVM,
	STEP_EVENT,
} from "../common/IntcodeVM.js";

import {
	BATCH_MOVE_AND_PICK_ALL,
	BATCH_DROP_ALL,
	TAKABLE_ITEMS,
} from "./cheat.js";

import {
	helper_generate_combo,
} from "./helper.js";

/**
 * @param {number[]} buff
 */
const decode_ascii = (buff) => buff.map(x => String.fromCharCode(x)).join("");

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const EC_PICKALL = "pickall";
const EC_DROPALL = "dropall"
const EC_NEXT    = "next";
const EC_DNN     = "x";

const EXTENDED_COMMANDS_USAGE = [
	{
		cmd: EC_PICKALL,
		usage: "A batch script to traverse and pick all the takable items, and move to the checkpoint",
	},
	{
		cmd: EC_DROPALL,
		usage: "A batch script to drop all items. If one item isn't taken, no side effects.",
	},
	{
		cmd: EC_NEXT,
		usage: "Generate a batch and execute it from with the next combo",
	},
	{
		cmd: EC_DNN,
		usage: "A combination of dropall, next, and north, useful at the checkpoint"
	},
];

const EXTENDED_COMMANDS = EXTENDED_COMMANDS_USAGE.map(x => x.cmd);

const print_help = () => {
	const ANSI = {
		RESET: "\x1b[0m",
		BOLD: "\x1b[1m",
		RED: "\x1b[31m",
	};

	const format = (cmd, usage) => console.log(`${ANSI.BOLD}${ANSI.RED}${cmd}${ANSI.RESET} - ${usage}`);
	console.log("================ Extended Commands ================");
	EXTENDED_COMMANDS_USAGE.forEach(x => {
		format(x.cmd, x.usage);
	});
	format("exit", "quit the program");
};

/**
 * @param {string} data
 * @returns {Promise<string>}
 */
export const exec = async (data) => {
	print_help();
	const program = data.split(",").map(Number);
	const vm = new IntcodeVM(program);

	/** @type {string[]} */
	const cmd_queue = [];

	const combos = helper_generate_combo(TAKABLE_ITEMS);
	let combo_idx = 0;

	/**
	 * @param {string} cmd
	 */
	const send_cmd = (cmd) => {
		for (let i = 0; i < cmd.length; i++) {
			vm.push_input(cmd.charCodeAt(i));
		}
		vm.push_input(10); // newline
	};

	/**
	 * @param {string|string[]} batch
	 */
	const split_and_send_cmd = (batch) => {
		if (typeof batch === "string")
			batch = batch.split("\n")

		batch.forEach(line => cmd_queue.push(line));

		// shift the first command and send to vm
		send_cmd(cmd_queue.shift());
	};

	const handle_extended_cmd = (cmd) => {
		if (cmd === EC_PICKALL) {
			split_and_send_cmd(BATCH_MOVE_AND_PICK_ALL);
		}

		if (cmd === EC_DROPALL) {
			split_and_send_cmd(BATCH_DROP_ALL);
		}

		if (cmd === EC_NEXT) {
			if (combo_idx < combos.length) {
				const combo = combos[combo_idx++];
				const batch = combo.map(item => `take ${item}`);
				split_and_send_cmd(batch);
			}
		}

		/*
		 * DNN stands for Dropall, Next, and North
		 * this can reduce the typing, as each command has been tested
		 */
		if (cmd === EC_DNN) {
			if (combo_idx < combos.length) {
				const combo = combos[combo_idx++];
				const batch = combo.map(item => `take ${item}`);

				split_and_send_cmd([
					BATCH_DROP_ALL,
					batch.join("\n"),
					"north",
				].join("\n"));
			}
		}
	};

	/** @type {number[]} */
	const output = [];

	while (!vm.halted) {
		const step = vm.run_until_event();
		switch (step.type) {
			case STEP_EVENT.OUTPUT:
				output.push(step.value);
				break;
			case STEP_EVENT.INPUT_NEEDED:
				console.log(decode_ascii(output));
				output.length = 0;

				const cmd = cmd_queue.length > 0 ? cmd_queue.shift() : await rl.question("> ");
				if (cmd === "exit") {
					rl.close();
					return "bye";
				}

				if (EXTENDED_COMMANDS.includes(cmd)) {
					handle_extended_cmd(cmd);
				} else {
					send_cmd(cmd);
				}
				break;
		}
	}

	rl.close();
	return output.length > 0 ? decode_ascii(output) : "";
};
