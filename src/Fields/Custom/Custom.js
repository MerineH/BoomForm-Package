import React, { useEffect, useContext } from 'react'
import context from './../../Store/Context'
import { getFieldValue } from '../../Helpers/global'
import Memoizeable from '../../Memoizeable'

const Custom = ({ id, initial, children, ...props }) => {
  const { state, actions } = useContext(context)
  const { handleChange, handleBlur, handleClick, declareField } = actions
  const { values, errors } = state

  useEffect(() => {
    const actualInitial = initial === undefined ? null : initial
    declareField({
      id,
      initial: actualInitial,
      field: { type: 'custom', ...props }
    })
  }, [id, initial])

  const value = getFieldValue(values, id)
  if (value === undefined) return null

  return (
    <Memoizeable field={{ id, initial, children, value, ...props }}>
      {children({ id, handleChange, handleBlur, handleClick, value, errors })}
    </Memoizeable>
  )
}

export default Custom
