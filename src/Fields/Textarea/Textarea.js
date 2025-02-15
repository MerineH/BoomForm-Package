import React, { useEffect, useContext } from 'react'
import context from './../../Store/Context'
import { getFieldValue } from '../../Helpers/global'
import Memoizeable from '../../Memoizeable'

const Textarea = ({ id, initial, ...props }) => {
  const { state, actions } = useContext(context)
  const { handleChange, handleBlur, handleClick, declareField } = actions
  const { values } = state

  useEffect(() => {
    const actualInitial = initial === undefined ? null : initial
    declareField({
      id,
      initial: actualInitial,
      field: { type: 'textarea', ...props }
    })
  }, [id, initial])

  const value = getFieldValue(values, id)
  if (value === undefined) return null

  return (
    <Memoizeable field={{ id, initial, value, ...props }}>
      <textarea
        {...props}
        value={value || ''}
        onChange={(e) => {
          handleChange({
            id,
            value: e.target.value,
            e,
            field: { id, initial, type: 'textarea', ...props }
          })
        }}
        onBlur={(e) =>
          handleBlur({
            id,
            value: e.target.value,
            e,
            field: { id, initial, type: 'textarea', ...props }
          })
        }
        onClick={(e) =>
          handleClick({
            id,
            value: e.target.value,
            e,
            field: { id, initial, type: 'textarea', ...props }
          })
        }
      ></textarea>
    </Memoizeable>
  )
}

export default Textarea
