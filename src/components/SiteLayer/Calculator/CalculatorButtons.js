export const POWER = "POWER(",
      FACTORIAL = "FACTORIAL"

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

export const calculatorButtons = [

// {
//   name: "square-root",
//   symbol: "√",
//   formula: "Math.sqrt",
//   type: "math_function"
// },
// {
//   name: "square",
//   symbol: "x²",
//   formula: POWER,
//   type: "math_function"
// },

{
  name: "factorial",
  symbol: "×!",
  formula: FACTORIAL,
  type: "math_function"
},
{
  name: "open-parenthesis",
  symbol: "(",
  formula: "(",
  type: "number"
},
{
  name: "close-parenthesis",
  symbol: ")",
  formula: ")",
  type: "number"
},
{
  name: "clear",
  symbol: "C",
  formula: false,
  type: "key"
},
{
  name: "delete",
  symbol: "⌫",
  formula: false,
  type: "key"
},
// {
//   name: "exp",
//   symbol: "exp",
//   formula: "Math.exp",
//   type: "math_function"
// },
{
  name: "ln",
  symbol: "ln",
  formula: "Math.log",
  type: "math_function"
},
{
  name: "7",
  symbol: "7",
  formula: 7,
  type: "number"
},
 {
  name: "8",
  symbol: "8",
  formula: 8,
  type: "number"
}, 
{
  name: "9",
  symbol:  "9",
  formula: 9,
  type: "number"
},
{
  name: "division",
  symbol: "÷",
  formula: "/",
  type: "operator"
},
{
  name: "log",
  symbol: "log",
  formula: "Math.log10",
  type: "math_function"
},
{
  name: "4",
  symbol: "4",
  formula: 4,
  type: "number"
},
{
  name: "5",
  symbol: "5",
  formula: 5,
  type: "number"
},
{
  name: "6",
  symbol: "6",
  formula: 6,
  type: "number"
},
{
  name: "multiplication",
  symbol: "×",
  formula: "*",
  type: "operator"
},
{
  name: "e",
  symbol: "e",
  formula: "Math.E",
  type: "number"
},
{
  name: "1",
  symbol: "1",
  formula: 1,
  type: "number"
},
{
  name: "2",
  symbol: "2",
  formula: 2,
  type: "number"
},
{
  name: "3",
  symbol: "3",
  formula: 3,
  type: "number"
},
{
  name: "subtraction",
  symbol: "–",
  formula: "-",
  type: "operator"
},
{
  name: "power",
  symbol: "xʸ",
  formula: POWER,
  type: "math_function"
},
{
  name: "0",
  symbol: "0",
  formula: 0,
  type: "number"
},
{
  name: "comma",
  symbol: ".",
  formula: ".",
  type: "number"
},
{
  name: "equal",
  symbol: "=",
  formula: "=",
  type: "equal"
},
{
  name: "addition",
  symbol: "+",
  formula: "+",
  type: "operator"
}
];
