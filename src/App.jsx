import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  CHOOSE_OPERATION: "choose-operation",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOpperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOpperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOpperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOpperand: `${state.currentOpperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOpperand: null,
        };
      }

      if (state.currentOpperand == null) return state;
      if (state.currentOpperand.length === 1) {
        return { ...state, currentOpperand: null };
      }

      return {
        ...state,
        currentOpperand: state.currentOpperand.slice(0, -1),
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Do nothing if there is no number to operate on
      if (state.currentOpperand == null && state.previousOpperand == null) {
        return state;
      }

      if (state.currentOpperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOpperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOpperand: state.currentOpperand,
          currentOpperand: null,
        };
      }

      return {
        ...state,
        previousOpperand: evaluate(state),
        operation: payload.operation,
        currentOpperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.previousOpperand == null ||
        state.currentOpperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOpperand: null,
        operation: null,
        currentOpperand: evaluate(state),
      };
    default:
      return state;
  }
}

function evaluate({ currentOpperand, previousOpperand, operation }) {
  const prev = parseFloat(previousOpperand);
  const current = parseFloat(currentOpperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return "";
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOpperand, previousOpperand, operation }, dispatch] =
    useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOpperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOpperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
