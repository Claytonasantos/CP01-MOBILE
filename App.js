import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";

export default function App() {

  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [descricao, setDescricao] = useState("");

  const [mostrarDados, setMostrarDados] = useState(false);

  
  const [dados, setDados] = useState(null);

  useEffect(() => {
    console.log("Aplicativo iniciado!");
  }, []);

  const enviarFormulario = () => {
    if (!nome || !curso || !disciplina || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    
    setDados({
      nome,
      curso,
      disciplina,
      descricao
    });

    setMostrarDados(true);

    Alert.alert("Sucesso", "Cadastro enviado!");

  
    setNome("");
    setCurso("");
    setDisciplina("");
    setDescricao("");
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>Formulário de Cadastro</Text>

      <View style={styles.formulario}>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu curso"
          value={curso}
          onChangeText={setCurso}
        />

        <Text style={styles.label}>Disciplina</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
        />

        <Text style={styles.label}>Descricao</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Fale um pouco sobre você"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <View style={styles.botao}>
          <Button
            title="ENVIAR"
            onPress={enviarFormulario}
          />
        </View>

      </View>


      {mostrarDados && dados && (
        <View style={styles.resultado}>
          <Text style={styles.mensagem}>
            Cadastro realizado com sucesso!
          </Text>
          <Text style={styles.subtitulo}>Dados informados:</Text>

          <Text style={styles.textoResultado}>Nome: {dados.nome}</Text>
          <Text style={styles.textoResultado}>Curso: {dados.curso}</Text>
          <Text style={styles.textoResultado}>Disciplina: {dados.disciplina}</Text>
          <Text style={styles.textoResultado}>Descricao: {dados.descricao}</Text>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0f2c" 
  },

  label: {
  color: "#ffffff",
  marginBottom: 5
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff"
  },

  formulario: {
    marginBottom: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#000000"
  },

  textArea: {
    height: 80
  },

  botao: {
    marginTop: 10
  },

  resultado: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#11153a"
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff"
  },

  textoResultado: {
    color: "#ffffff",
    marginBottom: 5
  },

  mensagem: {
    color: "#ff4d4d",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  }

});