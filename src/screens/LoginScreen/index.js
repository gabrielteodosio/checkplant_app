import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Colors } from '../../theme/colors'
import CustomForm from '../../components/CustomForm';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { Creators as AuthActions } from '../../store/ducks/auth';

const validation = {
  email: {
    required: true,
  },
  password: {
    required: true,
  },
}

const LoginScreen = ({ navigation, signIn }) => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleNavigateToRegister = () => {
    navigation.navigate('Register')
  }

  const handleSignIn = async (data) => {
    // TODO: Implement sign in feature
    await signIn(data, navigation)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.centerContent}>
        <Text style={styles.title}>
          Checkplant Test
        </Text>

        <View style={styles.formContainer}>
          <CustomForm {...{ register, setValue, validation, errors }}>
            <CustomTextInput name="email" label="Email" />
            <CustomTextInput secureTextEntry name="password" label="Senha" />
          </CustomForm>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={handleSubmit(handleSignIn)}
            style={{ ...styles.buttons, marginRight: 10 }}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </CustomButton>

          <CustomButton
            style={styles.buttons}
            onPress={handleNavigateToRegister}
          >
            <Text style={styles.buttonText}>Registrar</Text>
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
    marginBottom: 150,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 150,
  },
  buttons: {
    borderRadius: 5,
    width: '35%'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
})

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  ...AuthActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);