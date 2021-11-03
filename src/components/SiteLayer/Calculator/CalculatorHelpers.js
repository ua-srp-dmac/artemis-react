export const POWER = "POWER";
export const FACTORIAL = "FACTORIAL";

// searches array for keyword, returning all indices the keyword appears at
export function search(array, keyword) {
  let search_res = []

  array.forEach((element, index) => {
      if (element == keyword) {
          search_res.push(index)
      }
  })
  return search_res
}


export function powerbasegetter(formula, POWER_SEARCH_RESULT) {

  // here i will store all the bases !

  let powers_base = []

  POWER_SEARCH_RESULT.forEach(power_index => {
      let base = []

      let paren_count = 0

      let prev_idx = power_index - 1

      while (prev_idx >= 0) {

          if (formula[prev_idx] == '(') {
              paren_count -= 1
          }
          if (formula[prev_idx] == ')') {
              paren_count += 1
          }

          let is_operator = false

          OPERATORS.forEach(OPERATOR => {
              if (formula[prev_idx] == OPERATOR) {
                  is_operator = true
              }
          })

          let is_power = formula[prev_idx] == POWER

          if ((is_operator && paren_count == 0) || is_power) {
              break;
          }

          base.unshift(formula[prev_idx])

          prev_idx--;


      }

      powers_base.push(base.join(''))
  })

  return powers_base
}

export function factorialnumgetter(formula, FACTORIAL_SEARCH_RESULT) {

  // store all the numbers in this array
  let numbers = []

  let factorial_sequence = 0

  FACTORIAL_SEARCH_RESULT.forEach(fact_index => {

      // store the current number in this array

      let number = []

      let next_index = fact_index + 1;

      let next_input = formula[next_index]

      if (next_input == FACTORIAL) {
          factorial_sequence += 1
          return
      }

      // if there was a factorial sequence we need to get the index of the very first fact function

      let first_fact_index = fact_index - factorial_sequence;

      let prev_idx = first_fact_index - 1

      let paren_count = 0

      while (prev_idx >= 0) {

          if (formula[prev_idx] == '(') {
              paren_count = paren_count-1
          }
          if (formula[prev_idx] == ')') {
              paren_count = paren_count+ 1
          }

          let is_operator = false

          OPERATORS.forEach(OPERATOR => {
              if (formula[prev_idx] === OPERATOR) {
                  is_operator = true
              }
          })

          if (is_operator && paren_count == 0) {
              break;
          }

          number.unshift(formula[prev_idx])

          prev_idx = prev_idx -1;


      }

      let number_str = number.join('')
      const factorial = "factorial(",
          close_paren = ')'
      let times = factorial_sequence + 1

      let toreplace = number_str + FACTORIAL.repeat(times)

      let replacement = factorial.repeat(times) + number_str + close_paren.repeat(times)

      // pushing the modified object and at the reciving end of the function i'll replace the toreplace with the replacement!

      numbers.push({
          toReplace: toreplace,
          replacement: replacement
      })
      // reset the factorial sequence

      factorial_sequence = 0

      
  })

  return numbers


}

export const OPERATORS = ["+", "-", "*", "/"]

export function factorial(number) {

  // if the number is decimal like 0.5! or so then call the gamma function

  if (number % 1 != 0) {

      return gamma(number + 1)

  }

  if (number == 0 || number == 1) {
      return 1
  }

  let result = 1

  for (let i = 1; i <= number; i++) {
      result *= i
  }
  if (result == Infinity) {
      return Infinity
  }

  return result
}

export function gamma(n) { // accurate to about 15 decimal places
//some magic constants 
var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
} else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
}
}

