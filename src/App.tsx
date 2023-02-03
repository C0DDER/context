import { FormProvider } from "./context/FormContext";
import { useForm } from "./hooks/useForm";

import './styles/form.css';
import Field from "./components/Field";
import { useContext } from "react";
import { ThemeContext, Themes } from "./context/ThemeContext";

function App() {
  const { setTheme, theme } = useContext(ThemeContext);

  const form = useForm({
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validate: (values) => {
      const errors: { [k: string]: string } = {}

      if (values.name.length === 0) {
        errors.name = 'name is required';
      }

      if (values.password.length === 0) {
        errors.password = 'password is required'
      }

      return errors;
    }
  })

  const { handleSubmit } = form;

  return (
    <FormProvider form={form}>
      <button onClick={() => setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)}>Change theme</button>

      <form className='form' onSubmit={handleSubmit}>
        <Field label='Name' name='name' type='text' />
        <Field label='Password' name='password' type='password' />
        <button>Save</button>
      </form>
    </FormProvider>
  )
}

export default App
