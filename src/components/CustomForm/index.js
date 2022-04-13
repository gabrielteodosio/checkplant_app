import React, { useEffect, useRef, createElement } from 'react';
import { TextInput } from 'react-native';

export default ({
  register,
  errors,
  setValue,
  validation,
  children,
}) => {
  const Inputs = useRef([])

  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
      if (child.props.name)
        register(child.props.name, validation[child.props.name]);
    });
  }, [register]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, i) => {
          return child.props.name
            ? createElement(child.type, {
              ...{
                ...child.props,
                ref: (e) => {
                  Inputs.current[i] = e
                },
                onChangeText: (v) =>
                  setValue(child.props.name, v, true),
                onSubmitEditing: () => {
                  Inputs.current[i + 1]
                    ? Inputs.current[i + 1].focus()
                    : Inputs.current[i].blur()
                },
                blurOnSubmit: false,
                key: child.props.name,
                error: errors[child.props.name],
              },
            })
            : child
        }
      )}
    </>
  )
}