const POWER = "POWER";
const FACTORIAL = "FACTORIAL";

export const calculatorButtons = [  
  {
    name: "factorial",
    symbol: "×!",
    formula: "POWER",
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
    type: "e"
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
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number"
  },
  {
    name: "0",
    symbol: "0",
    formula: 0,
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
  