# 📱 Perfil Acadêmico e Integração de Serviços

Aplicativo desenvolvido em React Native com Expo para gerenciamento de perfil acadêmico, integração com API externa, captura de imagem utilizando câmera do dispositivo e compartilhamento global de dados utilizando Context API.

---

# 🎓 Instituição

Projeto acadêmico desenvolvido para a instituição:

FIAP

Curso:
Análise e Desenvolvimento de Sistemas

Campus: Paulista

# Vídeo no Youtube

https://youtube.com/shorts/MQQtWuj7Tjk?feature=share

---

# 👨‍💻 Integrantes da Equipe

### Clayton Alves dos Santos

RM: 562285

### Guilherme Sola Garcia

RM: 563674

---

# 📌 Objetivo do Projeto

O objetivo deste projeto é desenvolver um aplicativo mobile utilizando React Native com Expo, aplicando conceitos fundamentais de:

* Context API
* Navegação entre telas
* Consumo de APIs externas
* Manipulação de hardware do dispositivo
* Persistência de dados
* Tratamento de erros
* Estruturação de aplicações mobile modernas

O aplicativo permite que o usuário:

* Realize um cadastro acadêmico
* Busque endereço automaticamente através do CEP
* Capture uma foto utilizando a câmera do celular
* Visualize seu perfil completo
* Navegue entre múltiplas telas
* Compartilhe informações globalmente entre componentes

---

# 🚀 Tecnologias Utilizadas

## Front-end Mobile

* React Native
* Expo
* JavaScript
* Context API
* React Navigation

## Bibliotecas Utilizadas

* `@react-navigation/native`
* `@react-navigation/native-stack`
* `react-native-mask-text`
* `@react-native-async-storage/async-storage`
* `expo-image-picker`

---

# 📂 Estrutura do Projeto

```bash
📦 projeto
 ┣ 📜 App.js
 ┣ 📜 package.json
 ┣ 📜 README.md
```

---

# ⚙️ Funcionalidades Implementadas

# ✅ 1. Context API

Foi implementado um `UserContext` responsável pelo gerenciamento global dos dados do usuário.

## Funcionalidades do Context:

* Compartilhamento de dados entre telas
* Armazenamento do perfil do usuário
* Controle da foto capturada
* Atualização em tempo real das informações

---

# ✅ 2. Navegação Entre Telas

A navegação foi implementada utilizando:

* React Navigation
* Native Stack Navigator

## Telas Disponíveis

### 📄 Tela de Cadastro

Responsável pelo preenchimento dos dados do aluno.

### 👤 Tela de Perfil

Exibe todas as informações cadastradas.

### 👨‍💻 Tela de Desenvolvedores

Apresenta os integrantes do projeto.

---

# ✅ 3. Integração com API Externa

Foi utilizada a API pública:

[ViaCEP API Oficial](https://viacep.com.br?utm_source=chatgpt.com)

## Funcionalidade

Ao digitar o CEP:

* O aplicativo realiza uma requisição HTTP utilizando `fetch`
* Os dados do endereço são preenchidos automaticamente

## Campos preenchidos automaticamente

* Endereço
* Bairro
* Cidade
* Estado

## Tratamento de Erros

O projeto utiliza:

```js
try/catch
```

Para tratar:

* Falhas de conexão
* CEP inválido
* API indisponível

---

# ✅ 4. Uso da Câmera

Foi utilizada a biblioteca:

```bash
expo-image-picker
```

## Funcionalidades

* Solicitação de permissão da câmera
* Captura de imagem
* Definição da foto como avatar do perfil
* Persistência da imagem durante navegação

## Tratamento de Permissões

Caso o usuário negue acesso à câmera:

* O aplicativo exibe uma mensagem de erro amigável

---

# ✅ 5. Persistência de Dados

Foi utilizado:

```bash
AsyncStorage
```

## Objetivo

Salvar localmente:

* Dados do formulário
* Informações do usuário
* Foto capturada

Assim, os dados permanecem salvos mesmo após fechar o aplicativo.

---

# 🧠 Conceitos Aplicados

Durante o desenvolvimento foram aplicados conceitos importantes de desenvolvimento mobile:

* Componentização
* Gerenciamento global de estado
* Hooks (`useState`, `useEffect`, `useContext`)
* Navegação Stack
* Consumo de APIs REST
* Manipulação de hardware
* Persistência local
* Tratamento de exceções

---

# 📱 Fluxo do Aplicativo

## 1️⃣ Cadastro

O usuário preenche:

* Nome
* RM
* CPF
* Telefone
* CEP
* Curso
* Disciplina
* Sobre você

---

## 2️⃣ Busca Automática de CEP

Ao digitar o CEP:

* O aplicativo consulta a API ViaCEP
* Os campos de endereço são preenchidos automaticamente

---

## 3️⃣ Captura de Foto

O usuário pode:

* Abrir a câmera
* Tirar uma foto
* Utilizar a imagem como avatar

---

## 4️⃣ Salvamento dos Dados

Os dados são:

* Armazenados no Context API
* Persistidos no AsyncStorage

---

## 5️⃣ Visualização do Perfil

A tela de perfil apresenta:

* Foto do usuário
* Informações pessoais
* Endereço
* Dados acadêmicos

---

## 6️⃣ Tela de Desenvolvedores

Exibe:

* Nome completo dos integrantes
* RM
* Foto ilustrativa

---

# 🛠️ Instalação do Projeto

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Instalar dependência da câmera

```bash
npx expo install expo-image-picker
```

---

## 4. Executar o projeto

```bash
npx expo start
```

---

# 📦 Dependências do Projeto

```json
{
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-navigation/native": "^7.2.2",
  "@react-navigation/native-stack": "^7.14.11",
  "expo": "~54.0.33",
  "expo-image-picker": "...",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-mask-text": "^0.15.0"
}
```

---

# 📷 Demonstração das Funcionalidades

## ✔ Cadastro de Usuário

* Formulário completo
* Máscaras de CPF e telefone

## ✔ Busca de CEP

* Integração automática com API

## ✔ Captura de Foto

* Integração com câmera do dispositivo

## ✔ Context API

* Compartilhamento global dos dados

## ✔ Navegação

* Fluxo completo entre telas

---

# 📚 Aprendizados Obtidos

Este projeto permitiu aprofundar conhecimentos em:

* Desenvolvimento mobile com React Native
* Gerenciamento de estado global
* Consumo de APIs REST
* Manipulação de permissões do dispositivo
* Persistência de dados locais
* Estruturação de aplicações escaláveis

---

# ✅ Requisitos do CP Atendidos

| Requisito                | Status |
| ------------------------ | ------ |
| Context API              | ✅      |
| Provider Global          | ✅      |
| Navegação entre telas    | ✅      |
| Integração com API       | ✅      |
| Busca automática de CEP  | ✅      |
| Uso da câmera            | ✅      |
| Tratamento de permissões | ✅      |
| Tela de Desenvolvedores  | ✅      |
| Tratamento de erros      | ✅      |
| Persistência de dados    | ✅      |

---

# 📄 Licença

Projeto acadêmico desenvolvido exclusivamente para fins educacionais na FIAP.
