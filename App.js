import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';

const Stack = createNativeStackNavigator();

// ================= CONTEXT API =================

const UserContext = createContext();

function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    nome: '',
    rm: '',
    cpf: '',
    telefone: '',
    curso: '',
    disciplina: '',
    sobreVoce: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    foto: null,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const dados = await AsyncStorage.getItem('@perfil_cp2');

      if (dados) {
        setUserData(JSON.parse(dados));
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar os dados.');
    }
  };

  const salvarDados = async (dados) => {
    try {
      setUserData(dados);
      await AsyncStorage.setItem(
        '@perfil_cp2',
        JSON.stringify(dados)
      );
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        salvarDados,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

// ================= TELA CADASTRO =================

function TelaCadastro({ navigation }) {
  const { userData, setUserData, salvarDados } = useUser();

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        return;
      }

      setUserData((prev) => ({
        ...prev,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      }));
    } catch (error) {
      Alert.alert(
        'Erro',
        'Falha ao conectar com a API do CEP.'
      );
    }
  };

  const tirarFoto = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permissão negada',
          'Você negou acesso à câmera.'
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          quality: 1,
          allowsEditing: true,
          aspect: [1, 1],
        });

      if (!result.canceled) {
        setUserData((prev) => ({
          ...prev,
          foto: result.assets[0].uri,
        }));
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível abrir a câmera.'
      );
    }
  };

  const handleSalvar = async () => {
    const {
      nome,
      rm,
      cpf,
      telefone,
      curso,
      disciplina,
      sobreVoce,
    } = userData;

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
        'Preencha todos os campos obrigatórios.'
      );
    }

    await salvarDados(userData);
    navigation.navigate('Perfil');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.title}>Cadastro</Text>

        <TouchableOpacity
          style={styles.fotoContainer}
          onPress={tirarFoto}
        >
          <Image
            source={
              userData.foto
                ? { uri: userData.foto }
                : {
                    uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                  }
            }
            style={styles.foto}
          />
          <Text style={styles.textoFoto}>
            Tirar Foto
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={userData.nome}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              nome: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="RM"
          keyboardType="numeric"
          value={userData.rm}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              rm: text,
            })
          }
        />

        <MaskedTextInput
          style={styles.input}
          placeholder="CPF"
          mask="999.999.999-99"
          value={userData.cpf}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              cpf: text,
            })
          }
        />

        <MaskedTextInput
          style={styles.input}
          placeholder="Telefone"
          mask="(99) 99999-9999"
          value={userData.telefone}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              telefone: text,
            })
          }
        />

        <MaskedTextInput
          style={styles.input}
          placeholder="CEP"
          mask="99999-999"
          value={userData.cep}
          onChangeText={(text) => {
            setUserData({
              ...userData,
              cep: text,
            });

            buscarCep(text);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={userData.endereco}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={userData.bairro}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={userData.cidade}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={userData.estado}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={userData.curso}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              curso: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Disciplina"
          value={userData.disciplina}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              disciplina: text,
            })
          }
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sobre Você"
          multiline
          value={userData.sobreVoce}
          onChangeText={(text) =>
            setUserData({
              ...userData,
              sobreVoce: text,
            })
          }
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSalvar}
        >
          <Text style={styles.buttonText}>
            Salvar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSec}
          onPress={() =>
            navigation.navigate('Devs')
          }
        >
          <Text style={styles.buttonText}>
            Ver Devs
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= PERFIL =================

function TelaPerfil({ navigation }) {
  const { userData } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.card}>
          <Image
            source={
              userData.foto
                ? { uri: userData.foto }
                : {
                    uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                  }
            }
            style={styles.foto}
          />

          <Text style={styles.nome}>
            {userData.nome}
          </Text>

          <Text>RM: {userData.rm}</Text>
          <Text>CPF: {userData.cpf}</Text>
          <Text>
            Telefone: {userData.telefone}
          </Text>
          <Text>Curso: {userData.curso}</Text>
          <Text>
            Disciplina: {userData.disciplina}
          </Text>
          <Text>CEP: {userData.cep}</Text>
          <Text>
            Endereço: {userData.endereco}
          </Text>
          <Text>Bairro: {userData.bairro}</Text>
          <Text>Cidade: {userData.cidade}</Text>
          <Text>Estado: {userData.estado}</Text>
          <Text>
            Sobre: {userData.sobreVoce}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Cadastro')
            }
          >
            <Text style={styles.buttonText}>
              Voltar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSec}
            onPress={() =>
              navigation.navigate('Devs')
            }
          >
            <Text style={styles.buttonText}>
              Tela Devs
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= DEVS =================

function TelaDevs() {
  const devs = [
    {
      nome: 'Clayton Alves dos Santos',
      rm: 'RM562285',
      foto:
        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      nome: 'Guilherme Sola Garcia',
      rm: 'RM563674',
      foto:
        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.title}>
          Desenvolvedores
        </Text>

        {devs.map((dev, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: dev.foto }}
              style={styles.foto}
            />

            <Text style={styles.nome}>
              {dev.nome}
            </Text>

            <Text>{dev.rm}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= APP =================

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Cadastro"
            component={TelaCadastro}
          />
          <Stack.Screen
            name="Perfil"
            component={TelaPerfil}
          />
          <Stack.Screen
            name="Devs"
            component={TelaDevs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// ================= STYLE =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  scrollArea: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },

  textArea: {
    height: 100,
  },

  fotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  textoFoto: {
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#3182CE',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },

  buttonSec: {
    backgroundColor: '#718096',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});