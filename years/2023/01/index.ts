import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2023;
const DAY = 1;

// solution path: /Users/sriharimurali/Code/advent-of-code/years/2023/01/index.ts
// data path    : /Users/sriharimurali/Code/advent-of-code/years/2023/01/data.txt
// problem url  : https://adventofcode.com/2023/day/1

async function p2023day1_part1(input: string, ...params: any[]) {
	const intRegex = /[0-9]/;
	const lines = input.split("\n");

	let sum = 0;
	for (const line of lines) {
		const revLine = [...line].reverse().join("");
		
		let index = line.match(intRegex);
		const firstNum = index ? index[0] : 0;
		index = revLine.match(intRegex);
		const lastNum = index ? index[0] : firstNum;
		// log(firstNum + ", " + lastNum, + " : " + line);
		
		if (firstNum && lastNum) {
			sum += Number(firstNum + lastNum);
		}
	}
	return sum;
}

function name(input: string) {
	switch(input) {
		case "zero":
			return "0";
		case "one":
			return "1";
		case "two":
			return "2";
		case "three":
			return "3";
		case "four":
			return "4";
		case "five":
			return "5";
		case "six":
			return "6";
		case "seven":
			return "7";
		case "eight":
			return "8";
		case "nine":
			return "9";
	}

	// Since input was non-null, we know a numerical match was found
	return input;
}

async function p2023day1_part2(input: string, ...params: any[]) {
	const intRegex = /zero|one|two|three|four|five|six|seven|eight|nine|[0-9]/
	const revIntRegex = /(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)|(orez)|[0-9]/;
	const lines = input.split("\n");

	let sum = 0;
	for (const line of lines) {
		const revLine = [...line].reverse().join("");
		
		let index = line.match(intRegex);
		const firstNum = index ? name(index[0]) : "0";
		index = revLine.match(revIntRegex);
		const lastNum = index ? name([...index[0]].reverse().join("")) : firstNum;
		// log(firstNum + ", " + lastNum, + " : " + line);
		
		if (firstNum && lastNum) {
			sum += Number(firstNum + lastNum);
		}	
	}
	return sum;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `1abc2
					pqr3stu8vwx
					a1b2c3d4e5f
					treb7uchet`,
			extraArgs: [],
			expected: `142`,
		},
	];	const part2tests: TestCase[] = [
		{
			input: `1abc2
					threepqr4stu8vwx
					aoneb2c3d4e5f
					treb7uchet`,
			extraArgs: [],
			expected: `142`,
		},
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2023day1_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2023day1_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2023day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2023day1_part2(input));
	const part2After = performance.now();

	logSolution(1, 2023, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});