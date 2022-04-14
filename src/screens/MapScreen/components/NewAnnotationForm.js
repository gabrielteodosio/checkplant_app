import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { View, Text, StyleSheet } from 'react-native'

import { Colors } from '../../../theme/colors'
import CustomForm from '../../../components/CustomForm';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';

const validation = {
  description: {
    required: true,
  },
  latitude: {
    required: true,
  },
  longitude: {
    required: true,
  },
}

const NewAnnotationForm = ({ newMarker, onClose, onSubmit }) => {
  const { handleSubmit, reset, register, setValue, formState: { errors } } = useForm({
    defaultValues: {
      description: '',
      latitude: newMarker?.latitude,
      longitude: newMarker?.longitude,
    },
  })

  function handleCancel() {
    reset()
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    setValue('latitude', newMarker?.latitude, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    setValue('longitude', newMarker?.longitude, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  }, [newMarker])

  return (
    <View style={styles.bottomSheetContainer}>
      <Text style={styles.bottomSheetTitle}>
        Nova Anotação
      </Text>

      <Text style={styles.bottomSheetSubTitle}>
        Escreva abaixo a anotação desejada
      </Text>

      <View style={styles.formContainer}>
        <CustomForm {...{ register, setValue, validation, errors }}>
          <CustomTextInput inputStyle={{ height: 50 }} name="description" label="Descrição" />
        </CustomForm>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.buttons, marginRight: 10 }}
        >
          <Text style={styles.buttonText}>
            Nova Anotação
          </Text>
        </CustomButton>

        <CustomButton
          onPress={handleCancel}
          style={styles.buttonCancel}
        >
          <Text style={styles.cancelButtonText}>
            Cancelar
          </Text>
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: 10,
    height: '100%',
    backgroundColor: Colors.lighter,
  },
  bottomSheetTitle: {
    fontSize: 24,
    paddingBottom: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dark,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darker,
    width: '100%',
  },
  bottomSheetSubTitle: {
    color: Colors.dark,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttons: {
    borderRadius: 5,
    width: '35%'
  },
  buttonCancel: {
    borderRadius: 5,
    width: '35%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.dark,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark,
    textTransform: 'uppercase',
  },
})

export default NewAnnotationForm
