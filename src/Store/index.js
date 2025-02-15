import React, { useReducer } from 'react'
import Context from './Context'
import { reduser } from './Reducer'
import { DECLARE_FIELD, EDIT_FIELD, RESET_FORM, SET_TOCUED } from './Types'

const Store = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(reduser, {
    fields: [],
    values: {},
    touched: {},
    errors: {},
    ...props
  })

  const declareField = ({ id, initial, field }) => {
    dispatch({
      type: DECLARE_FIELD,
      payload: {
        id,
        initial,
        field
      }
    })
  }

  const handleReset = () => {
    dispatch({
      type: RESET_FORM
    })
  }

  const handleChange = ({ id, value, e, field }) => {
    if (field && field.hasOwnProperty('onChange'))
      field.onChange({
        id,
        value,
        e,
        field,
        handleChange: handleChange
      })

    dispatch({
      type: EDIT_FIELD,
      payload: {
        ...field,
        value
      }
    })
  }

  const handleBlur = ({ id, value, e, field }) => {
    if (field && field.hasOwnProperty('onBlur'))
      field.onBlur({
        id,
        value,
        e,
        field,
        handleChange: handleChange
      })

    const { type, name } = field
    dispatch({
      type: SET_TOCUED,
      payload: { id, type, name }
    })
  }

  const handleClick = ({ id, value, e, field }) => {
    if (field && field.hasOwnProperty('onClick'))
      field.onClick({
        id,
        value,
        e,
        field,
        handleChange: handleChange
      })
  }

  return (
    <Context.Provider
      value={{
        state,
        actions: {
          declareField,
          handleReset,
          handleChange,
          handleBlur,
          handleClick
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Store
