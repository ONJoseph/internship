import { useReducer } from "react";

type Values = Record<string, string>;
type Errors = Record<string, string>;

type Action =
  | { type: "CHANGE"; name: string; value: string }
  | { type: "BLUR"; name: string }
  | { type: "SET_ERRORS"; errors: Errors }
  | { type: "RESET"; payload?: Values };

type State = {
  values: Values;
  touched: Record<string, boolean>;
  errors: Errors;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case "BLUR":
      return {
        ...state,
        touched: { ...state.touched, [action.name]: true },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      return {
        values: action.payload ?? {},
        touched: {},
        errors: {},
      };
    default:
      return state;
  }
}

export function useForm(
  initialValues: Values,
  validate: (values: Values) => Errors,
  onSubmit: (values: Values) => void
) {
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    touched: {},
    errors: {},
  });

  const handleChange = (name: string, value: string) => {
    dispatch({ type: "CHANGE", name, value });
  };

  const handleBlur = (name: string) => {
    dispatch({ type: "BLUR", name });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const errors = validate(state.values);
    dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length === 0) onSubmit(state.values);
  };

  const reset = (nextValues?: Values) => dispatch({ type: "RESET", payload: nextValues });

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
