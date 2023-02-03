import { createContext, FormEvent, ReactNode } from "react";
import { Form } from "../hooks/useForm";

export const FormContext = createContext<Form<any>>({
  values: undefined,
  errors: {},
  touched: {},
  isSubmitting: false,
  submitCount: 0,
  setFieldValue: function (field: string | number | symbol, _value: any): void {
    throw new Error("Function not implemented.");
  },
  handleSubmit: function (_e: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  },
  setTouchedField: function (field: string | number | symbol, _touched: boolean): void {
    throw new Error("Function not implemented.");
  }
});

interface IFormProvider {
  form: Form<any>
  children?: ReactNode;
}

export const FormProvider = (props: IFormProvider) => {
  return (
    <FormContext.Provider value={props.form}>
      { props.children }
    </FormContext.Provider>
  )
}