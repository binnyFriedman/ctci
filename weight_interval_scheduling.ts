import { assert } from "console";

function eliminate_self_and_neighbors(
  i: number,
  arr: number[],
  set: Set<number>
) {
  set.add(i);
  if (i > 0) set.add(i - 1);
  if (i < arr.length - 1) set.add(i + 1);
}

function solve(arr: number[]): number {
  let max_profit = 0;
  // const memo: Record<number, Record<string, number>> = {};
  for (let i = 0; i < arr.length; i++) {
    let profit = arr[i];

    for (let j = i + 2; j < arr.length; j += 1) {
      const eliminated = new Set<number>();
      eliminate_self_and_neighbors(i, arr, eliminated);
      const key = Array.from(eliminated).sort().join(",");
      // if (i in memo && key in memo[i]) {
      // profit = Math.max(profit, memo[i][key]);
      // } else {
      // if (!(i in memo)) memo[i] = {};
      // memo[i][key] = explore_array(j, arr, eliminated, memo) + arr[i];
      profit = Math.max(profit, explore_array(j, arr, eliminated));
    }

    max_profit = Math.max(max_profit, profit);
  }

  return max_profit;
}

function explore_array(
  i: number,
  arr: number[],
  eliminated: Set<number>
): number {
  eliminate_self_and_neighbors(i, arr, eliminated);
  let profit = arr[i];
  if (eliminated.size === arr.length) return profit;
  for (let j = 0; j < arr.length; j += 1) {
    if (!eliminated.has(j)) {
      profit += explore_array(j, arr, eliminated);
    }
  }

  return profit;
}

assert(solve([1, 2, 3]) === 4);
assert(solve([3, 2, 1, 4, 10]) === 14);

console.log(solve([1, 2, 3, 6, 12, 11, 32, 54, 63, 28, 50, 33, 56, 99]));
