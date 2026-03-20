import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

export default function App() {

  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [descricao, setDescricao] = useState("");

  const [mostrarDados, setMostrarDados] = useState(false);

  useEffect(() => {
    console.log("Aplicativo iniciado!");
  }, []);

  const enviarFormulario = () => {
    setMostrarDados(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Formulário de Cadastro</Text>

      <View style={styles.formulario}>
        <Text>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text>Curso</Text>
        <TextInput style={styles.input} value={curso} onChangeText={setCurso} />

        <Text>Disciplina</Text>
        <TextInput style={styles.input} value={disciplina} onChangeText={setDisciplina} />

        <Text>Descrição</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} multiline />

        <Button title="Enviar" onPress={enviarFormulario} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  formulario: { marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15
  }
});