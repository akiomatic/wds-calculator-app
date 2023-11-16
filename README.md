
# 1st React Project: Calculator App

This is my first time working on a project with React. It's a basic calculator app which I developed following a tutorial from [YouTube video](https://www.youtube.com/watch?v=DgRrrOt0Vr8) by Web Dev Simplified. This project helped me understand key React concepts such as component creation, state management, and user interactions. At the same time, I've been able to learn from my small mistakes and have realized the things I need to review, which are listed below.
## Features

- Basic arithmetic operations (Add, Subtract, Multiply, Divide)
- Clear button to reset the current operation
## Installation

To install and run this project locally:

```bash
  git clone https://github.com/akiomatic108/wds-calculator-app.git
  cd wds-calculator-app
  npm install
```

To run the app locally:
```bash
  npm run dev
```
## Learning Journey
- Always use `state.` when **referencing state variables.** For example, use `state.currentOperand` instead of `currentOperand` to avoid 'variable not defined' errors.
- Brush up ES6 features: **named exports** for multiple values and **default exports** for a single primary value from a module.
- The importance of checking for typos in variable names, especially when code **unexpectedly** doesn't work.
- Use '==' instead of '===' when comparing something to null, as 'undefined' is not strictly equal to 'null'.
