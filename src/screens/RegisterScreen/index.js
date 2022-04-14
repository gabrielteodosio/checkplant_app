import React from 'react'
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Colors } from '../../theme/colors';
import CustomForm from '../../components/CustomForm';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { Creators as AuthActions } from '../../store/ducks/auth';

const validation = {
  email: {
    required: true,
  },
  encrypted_password: {
    required: true,
  },
}

const RegisterScreen = ({ navigation, signUp }) => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      encrypted_password: '',
    },
  })

  const handleCancelRegister = () => {
    navigation.replace('Login')
  }

  const handleRegister = async (data) => {
    await signUp(data, navigation)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.centerContent}>
        <Text style={styles.title}>
          Checkplant Test
        </Text>

        <Text style={styles.subTitle}>
          Registro
        </Text>

        <View style={styles.formContainer}>
          <CustomForm {...{ register, setValue, validation, errors }}>
            <CustomTextInput name="email" label="Email" />
            <CustomTextInput secureTextEntry name="encrypted_password" label="Senha" />
          </CustomForm>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={handleSubmit(handleRegister)}
            style={{ ...styles.buttonRegister, marginRight: 10 }}
          >
            <Text style={styles.confirmButtonText}>
              Cadastrar
            </Text>
          </CustomButton>

          <CustomButton
            style={styles.buttonCancel}
            onPress={handleCancelRegister}
          >
            <Text style={styles.cancelButtonText}>
              Cancelar
            </Text>
          </CustomButton>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darker,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 25,
  },
  subTitle: {
    fontSize: 28,
    marginBottom: 150,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 150,
  },
  buttonRegister: {
    borderRadius: 5,
    width: '35%'
  },
  buttonCancel: {
    borderRadius: 5,
    width: '35%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.lighter,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  ...AuthActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen)
