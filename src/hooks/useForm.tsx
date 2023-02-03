import { FormEvent, useState } from "react";

export type FormErrors<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? FormErrors<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends object
      ? FormErrors<Values[K]>
      : string;
};

export type FormTouched<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object // [number] is the special sauce to get the type of array's element. More here https://github.com/Microsoft/TypeScript/pull/21316
      ? FormTouched<Values[K][number]>[]
      : boolean
    : Values[K] extends object
      ? FormTouched<Values[K]>
      : boolean;
};

interface UseFormParams<Values> {
  initialValues: Values,
  initialErrors?: FormErrors<Values>,
  initialTouched?: FormTouched<Values>,
  initialStatus?: {}
  onSubmit: (values: Values) => void;
  validate?: (values: Values) => FormErrors<Values>;
}

export interface FormValues {
  [field: string]: any;
}

export interface Form<Values> {
  values: Values,
  errors: FormErrors<Values>,
  touched: FormTouched<Values>,
  status?: {},
  isSubmitting: boolean,
  submitCount: number,
  setFieldValue: (field: keyof Values, value: any) => void,
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  setTouchedField: (field: keyof Values, touched: boolean) => void
}

export const useForm = <Values extends FormValues>({ initialValues, initialErrors, initialTouched, initialStatus, onSubmit, validate }: UseFormParams<Values>): Form<Values> => {
  const [state, setState] = useState({
    values: initialValues,
    errors: initialErrors || {},
    touched: initialTouched || {},
    status: initialStatus,
    isSubmitting: false,
    submitCount: 0,
  });

  const validateForm = () => {
    const errors = validate ? validate(state.values) : {};
    setState({
      ...state,
      errors
    })

    return errors;
  }

  const setFieldValue = (field: keyof Values, value: any) => {
    const values = { ...state.values };
    values[field] = value;

    validateForm();
    setState((currentState) => {
      return {
        ...currentState,
        values,
      }
    })
  }

  const setTouchedField = (field: keyof Values, touched: boolean) => {
    const touchedCopy = { ...state.touched } as FormTouched<Values>;
    // @ts-ignore
    touchedCopy[field] = touched;

    validateForm()
    setState((currentState) => {
      return {
        ...currentState,
        touched: touchedCopy
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const invalidFields = Object.keys(validateForm());

    if (invalidFields.length === 0) {
      return onSubmit(state.values);
    }

    const fields = Object.keys(initialValues) as Array<keyof Values>;
    const touchedFields = fields.reduce((touched, field) => {
      // @ts-ignore
      touched[field] = true;

      return touched;
    }, {} as FormTouched<Values>);

    setState((currentState) => {
      return {
        ...currentState,
        touched: touchedFields
      }
    })
  }

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    status: state.status,
    isSubmitting: state.isSubmitting,
    submitCount: 0,
    setFieldValue,
    handleSubmit,
    setTouchedField
  }
};