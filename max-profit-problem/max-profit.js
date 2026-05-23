/**
 * Max Profit Problem
 * ------------------
 * Mr. X builds properties one at a time on Mars Land.
 * Given N units of time, find the combination of Theatres (T),
 * Pubs (P), and Commercial Parks (C) that maximizes earnings.
 *
 * Build times:  T = 5, P = 4, C = 10
 * Earnings/unit: T = $1500, P = $1000, C = $2000
 * Constraint:   5T + 4P + 10C <= N
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(1)
 *
 * Test Cases:
 *   N=7  → $3000  (T:1 P:0 C:0 or T:0 P:1 C:0)
 *   N=8  → $4500  (T:1 P:0 C:0)
 *   N=13 → $16500 (T:2 P:0 C:0)
 */

function calculateEarnings(N, T, P, C) {
  let earnings = 0;
  let time_elapsed = 0;

  // Build order: T → P → C (sorted by earnings/build-time ratio)
  for (let i = 0; i < T; i++) {
    time_elapsed += 5;
    earnings += (N - time_elapsed) * 1500;
  }
  for (let j = 0; j < P; j++) {
    time_elapsed += 4;
    earnings += (N - time_elapsed) * 1000;
  }
  for (let k = 0; k < C; k++) {
    time_elapsed += 10;
    earnings += (N - time_elapsed) * 2000;
  }

  return earnings;
}

function maxProfit(N) {
  let max_earnings = 0;
  let best_combinations = [];

  for (let T = 0; T <= Math.floor(N / 5); T++) {
    let remaining_after_T = N - 5 * T;
    let prev_earnings = 0;

    for (let P = 0; P <= Math.floor(remaining_after_T / 4); P++) {
      let remaining_after_P = remaining_after_T - 4 * P;

      // C doesn't need a loop — always use max possible
      let C = remaining_after_P >= 10
        ? Math.floor(remaining_after_P / 10)
        : 0;

      let current_earnings = calculateEarnings(N, T, P, C);

      // Early exit — earnings only go down from here
      if (current_earnings < prev_earnings) break;
      prev_earnings = current_earnings;

      if (current_earnings > max_earnings) {
        max_earnings = current_earnings;
        best_combinations = [{ T, P, C }];
      } else if (current_earnings === max_earnings && current_earnings > 0) {
        best_combinations.push({ T, P, C });
      }
    }
  }

  return { max_earnings, best_combinations };
}

// --- Run ---
const testCases = [7, 8, 13, 25];
testCases.forEach(N => {
  const { max_earnings, best_combinations } = maxProfit(N);
  console.log(`\nN = ${N}`);
  console.log(`Max Earnings: $${max_earnings.toLocaleString()}`);
  best_combinations.forEach((c, i) =>
    console.log(`  ${i + 1}. T:${c.T} P:${c.P} C:${c.C}`)
  );
});

module.exports = { maxProfit, calculateEarnings };
