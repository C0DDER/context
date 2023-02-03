import { useContext } from "react";
import { FormContext } from "../context/FormContext";

type Props = {
  type?: 'text' | 'number' | 'password',
  name: string;
  label?: string
}

const Field = ({ type = 'text', name, ...props }: Props) => {
  const { setFieldValue, values, errors, touched, setTouchedField } = useContext(FormContext)

  const hasError = (errors?.[name] && touched?.[name]);

  return (
    <label className={`form-label ${hasError ? 'invalid-field' : ''}`}>
      { props.label }
      <>
        <input
          className='field-input'
          type={type}
          onChange={(e) => {
            setFieldValue(name, e.target.value)
          }}
          onBlur={() => {
            setTouchedField(name, true);
          }}
          value={values?.[name]}
        />
        { hasError ? errors[name] : null }
      </>
    </label>
  )
}

export default Field;