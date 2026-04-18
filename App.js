import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import {
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MaskedTextInput } from 'react-native-mask-text';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [rm, setRm] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [curso, setCurso] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [sobreVoce, setSobreVoce] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('@perfil_cp2');

        if (dadosSalvos) {
          const dados = JSON.parse(dadosSalvos);

          setNome(dados.nome || '');
          setRm(dados.rm || '');
          setCpf(dados.cpf || '');
          setTelefone(dados.telefone || '');
          setCurso(dados.curso || '');
          setDisciplina(dados.disciplina || '');
          setSobreVoce(dados.sobreVoce || '');
        }
      } catch (e) {
        Alert.alert('Erro', 'Falha ao carregar dados salvos.');
      }
    };

    carregarDados();
  }, []);

  const handleSalvar = async () => {
    if (
      !nome ||
      !rm ||
      !cpf ||
      !telefone ||
      !curso ||
      !disciplina ||
      !sobreVoce
    ) {
      return Alert.alert(
        'Atenção',
        'Por favor, preencha todos os campos obrigatórios!'
      );
    }

    const perfil = {
      nome,
      rm,
      cpf,
      telefone,
      curso,
      disciplina,
      sobreVoce,
    };

    try {
      await AsyncStorage.setItem('@perfil_cp2', JSON.stringify(perfil));
      navigation.navigate('Perfil');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="RM"
          keyboardType="numeric"
          value={rm}
          onChangeText={setRm}
        />

        <MaskedTextInput
          style={styles.input}
          placeholder="CPF"
          mask="999.999.999-99"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
        />

        <MaskedTextInput
          style={styles.input}
          placeholder="Telefone"
          mask="(99) 99999-9999"
          keyboardType="numeric"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={curso}
          onChangeText={setCurso}
        />

        <TextInput
          style={styles.input}
          placeholder="Disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sobre Você"
          multiline
          numberOfLines={4}
          value={sobreVoce}
          onChangeText={setSobreVoce}
        />

        <TouchableOpacity
          style={styles.buttonSalvar}
          onPress={handleSalvar}
        >
          <Text style={styles.buttonText}>Salvar/Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function TelaPerfil({ navigation }) {
  const [perfil, setPerfil] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const carregarPerfil = async () => {
        try {
          const dadosSalvos = await AsyncStorage.getItem('@perfil_cp2');

          if (dadosSalvos) {
            setPerfil(JSON.parse(dadosSalvos));
          }
        } catch (e) {
          Alert.alert('Erro', 'Falha ao carregar perfil.');
        }
      };

      carregarPerfil();
    }, [])
  );

  return (
    <SafeAreaView style={styles.containerPerfil}>
      <ScrollView contentContainerStyle={styles.scrollPerfil}>
        <View style={styles.cardPerfil}>
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/202633746?v=4',
            }}
            style={styles.foto}
          />

          <Text style={styles.nomeText}>{perfil.nome}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={styles.bold}>RM:</Text> {perfil.rm}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.bold}>CPF:</Text> {perfil.cpf}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.bold}>Telefone:</Text> {perfil.telefone}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.bold}>Curso:</Text> {perfil.curso}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.bold}>Disciplina:</Text> {perfil.disciplina}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.bold}>Sobre:</Text> {perfil.sobreVoce}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonVoltar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Voltar para Edição</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen
          name="Cadastro"
          component={TelaCadastro}
        />

        <Stack.Screen
          name="Perfil"
          component={TelaPerfil}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  containerPerfil: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  scrollArea: {
    padding: 24,
  },

  scrollPerfil: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#4A5568',
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  buttonSalvar: {
    backgroundColor: '#3182CE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardPerfil: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#E2E8F0',
  },

  nomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },

  infoBox: {
    width: '100%',
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  infoText: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 8,
  },

  bold: {
    fontWeight: 'bold',
    color: '#2D3748',
  },

  buttonVoltar: {
    backgroundColor: '#A0AEC0',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
});