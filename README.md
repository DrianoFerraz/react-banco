# Sistema de Gerenciamento de Contas Bancárias

**Descrição:**  
Este é um sistema de gerenciamento de contas bancárias que consome dados de uma planilha Google Sheets em formato CSV. Ele oferece uma interface para listar clientes, contas e agências, com filtros, paginação e responsividade. A aplicação foi desenvolvida utilizando **React**, **TypeScript** e **Vite**.

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Usadas](#tecnologias-usadas)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação e Execução](#instalação-e-execução)
5. [Uso](#uso)

---

## Visão Geral

Este sistema permite aos usuários consultar informações sobre clientes bancários, contas e agências. Ele carrega os dados de uma planilha pública do Google Sheets e apresenta os seguintes recursos:

- Listagem de clientes, contas e agências.
- Filtros para facilitar a busca.
- Paginação para uma visualização organizada.
- Responsividade para ser acessível em dispositivos móveis.

---

## Tecnologias Usadas

- **Frontend:**  
  - React
  - TypeScript
  - Vite
- **Bibliotecas:**
  - PapaParse (para parsing de arquivos CSV)
  - React Router DOM (para navegação)
  - Axios (se necessário para requisições HTTP)
- **Estilos:**  
  - SCSS/CSS

---

## Pré-requisitos

Antes de começar, certifique-se de que você tenha as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/) (gerenciadores de pacotes)

---

## Instalação e Execução

1. **Clone o repositório:**

   git clone https://github.com/DrianoFerraz/react-banco
   cd react-banco

2. **Instale as dependências:**

Se estiver usando npm:
npm install

Se estiver usando Yarn:
yarn install

3. **Inicie o servidor de desenvolvimento:**

Com npm:
npm run dev

Com Yarn:
yarn dev

---

## Uso

**Após a inicialização, o sistema carregará dados dos seguintes sheets do Google Sheets:**

Clientes: Exibe os dados dos clientes.

Contas: Exibe informações sobre as contas bancárias dos clientes.

Agências: Exibe informações sobre as agências bancárias.

O usuário pode interagir com os dados através de filtros, e a interface se adapta automaticamente para dispositivos móveis.
