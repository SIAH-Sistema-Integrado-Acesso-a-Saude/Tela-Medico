# SIAH — Tela do Médico

> **Sistema Integrado de Acesso à Saúde**
> Módulo de Prontuário Eletrônico do Paciente (PEP) para uso por profissionais de saúde.

---

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Integração com a API](#integração-com-a-api)
- [Componentes Principais](#componentes-principais)
- [Hooks Customizados](#hooks-customizados)
- [Módulos de Serviço (lib/)](#módulos-de-serviço-lib)
- [Dados Mock](#dados-mock)
- [Como Executar](#como-executar)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## Visão Geral

A **Tela do Médico** é o módulo frontend do SIAH destinado ao uso por profissionais de saúde. Ela exibe o prontuário eletrônico completo de um paciente identificado por CPF, permitindo visualizar e registrar consultas, triagens, exames e vacinas.

A interface é composta por uma barra lateral de navegação e um painel central que renderiza dinamicamente cada seção do prontuário. Todos os dados são carregados a partir de uma API REST backend rodando localmente.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Next.js | 15.5.4 | Framework React com roteamento e SSR |
| React | 19.1.0 | Biblioteca de UI |
| TypeScript | ^5 | Tipagem estática (arquivos de configuração e componentes base) |
| Tailwind CSS | ^4.1.9 | Estilização utilitária |
| shadcn/ui + Radix UI | — | Componentes de UI acessíveis e estilizados |
| Lucide React | ^0.454.0 | Ícones SVG |
| Recharts | 2.15.4 | Gráficos e visualizações |
| React Hook Form | ^7.60.0 | Gerenciamento de formulários |
| Zod | 3.25.76 | Validação de esquemas |
| date-fns | 4.1.0 | Manipulação de datas |
| Vercel Analytics | 1.3.1 | Monitoramento de uso |

---

## Estrutura do Projeto

```
Tela-Medico-main/
├── app/
│   ├── globals.css          # Estilos globais e tokens CSS
│   ├── layout.tsx           # Layout raiz (metadados, fontes, Analytics)
│   └── page.jsx             # Página principal — renderiza o prontuário
│
├── components/
│   ├── ehr-header.jsx       # Cabeçalho com dados do paciente
│   ├── ehr-sidebar.jsx      # Barra lateral de navegação
│   ├── patient-card.jsx     # Seção de dados cadastrais do paciente
│   ├── consultations-list.jsx  # Listagem e cadastro de consultas
│   ├── triage-card.jsx      # Listagem e cadastro de triagens
│   ├── exams-list.jsx       # Listagem e cadastro de exames
│   ├── vaccines-list.jsx    # Listagem e cadastro de vacinas
│   ├── theme-provider.tsx   # Provedor de tema (claro/escuro)
│   └── ui/                  # Componentes base (shadcn/ui)
│
├── hooks/
│   ├── usePatientData.js    # Carregamento e recarga dos dados do paciente
│   ├── useEntityForm.js     # Lógica genérica de formulários
│   ├── use-mobile.ts        # Detecção de viewport mobile
│   └── use-toast.ts         # Sistema de notificações toast
│
├── lib/
│   ├── consultas.js         # Serviços de API — consultas
│   ├── exames.js            # Serviços de API — exames
│   ├── triagens.js          # Serviços de API — triagens
│   ├── vacinas.js           # Serviços de API — vacinas
│   ├── hospital.js          # Serviços de API — hospitais
│   ├── profissionais.js     # Serviços de API — profissionais de saúde
│   ├── usuarios.js          # Serviços de API — usuários/pacientes
│   ├── resumo-ia.js         # Integração com IA (Gemini) para resumo do prontuário
│   ├── mock-data.js         # Dados de exemplo e funções utilitárias
│   └── utils.ts             # Utilitário `cn()` para classes Tailwind
│
├── public/
│   └── Logo_SIAH.png        # Logotipo do sistema
│
├── styles/
│   └── globals.css          # Estilos globais alternativos
│
├── next.config.mjs          # Configuração do Next.js
├── tsconfig.json            # Configuração do TypeScript
├── package.json             # Dependências e scripts
└── components.json          # Configuração do shadcn/ui
```

---

## Funcionalidades

### Identificação do Paciente

O paciente é identificado via parâmetro de URL `?cpf=<CPF>`. Ao acessar a aplicação com esse parâmetro, o sistema busca automaticamente todos os dados do prontuário.

**Exemplo de acesso:**
```
http://localhost:3000/?cpf=123.456.789-00
```

### Seções do Prontuário

**Paciente** — Exibe o cartão de identificação com nome, CPF, data de nascimento, contato, endereço, tipo sanguíneo, alergias, condições crônicas e prontuário narrativo. Inclui um botão de **Resumo por IA**, que envia o prontuário para o endpoint Gemini e exibe um resumo gerado automaticamente.

**Consultas** — Lista todas as consultas do paciente com data, profissional responsável, hospital, motivo, diagnóstico e prescrição. Permite cadastrar novas consultas por meio de formulário modal.

**Triagem** — Exibe os registros de triagem vinculados a consultas, com pressão arterial, temperatura, frequência cardíaca, peso, altura e observações de enfermagem. Permite registrar novas triagens.

**Exames** — Apresenta os exames laboratoriais e de imagem realizados, com tipo, data e laboratório. Permite adicionar novos exames.

**Vacinas** — Histórico vacinal completo com nome da vacina, dose, lote, data de aplicação, hospital e profissional. Permite registrar novas vacinas.

---

## Integração com a API

Todos os módulos em `lib/` se comunicam com o backend REST do SIAH no endereço:

```
http://127.0.0.1:8000/SIHA/api
```

### Endpoints Consumidos

| Recurso | Método | Endpoint |
|---|---|---|
| Buscar paciente por CPF | GET | `/usuarios/cpf/:cpf` |
| Buscar paciente por ID | GET | `/usuarios?id=:id` |
| Consultas do paciente | GET | `/consultas/usuario?id_usuario=:id` |
| Criar consulta | POST | `/consultas` |
| Atualizar consulta | PUT | `/consultas/:id` |
| Deletar consulta | DELETE | `/consultas/:id` |
| Triagens do paciente | GET | `/triagens/usuario?id_usuario=:id` |
| Criar triagem | POST | `/triagens` |
| Exames do paciente | GET | `/exames/usuario?id_usuario=:id` |
| Criar exame | POST | `/exames` |
| Vacinas do paciente | GET | `/vacinas/usuario?id_usuario=:id` |
| Criar vacina | POST | `/vacinas` |
| Listar hospitais | GET | `/hospitais` |
| Listar profissionais | GET | `/profissionais` |
| Resumo por IA (Gemini) | POST | `/gemini` |

Todos os endpoints com listagem por paciente aceitam um parâmetro opcional `&pesquisa=<termo>` para filtragem textual no servidor.

---

## Componentes Principais

### `EHRSidebar`

Barra lateral fixa com navegação entre as seções do prontuário. Exibe o logotipo do SIAH e botões de menu com ícones (Lucide React). Recebe `activeSection` e `onSectionChange` como props.

**Seções disponíveis:** Paciente, Consultas, Triagem, Exames, Vacinas.

### `PatientCard`

Cartão de dados cadastrais e clínicos do paciente. Exibe foto, dados pessoais, informações de saúde (tipo sanguíneo, alergias, condições crônicas) e prontuário narrativo. Contém o botão de **Resumo por IA** que dispara chamada ao endpoint Gemini.

### `ConsultationsList`

Lista paginada das consultas do paciente. Cada item exibe data, profissional, hospital, motivo, diagnóstico e prescrição. Inclui formulário modal para registro de nova consulta com campos para todos esses dados. Suporta busca textual com recarga via `reloadConsultations`.

### `TriageCard`

Exibe triagens associadas a consultas. Mostra sinais vitais (pressão arterial, temperatura, FC, peso, altura) calculando IMC automaticamente. Inclui formulário modal para registro de nova triagem.

### `ExamsList`

Lista de exames realizados com data e laboratório. Permite adicionar novos registros via formulário modal. Suporta busca textual.

### `VaccinesList`

Histórico de vacinação com nome, dose, lote e data. Formulário modal para registro de novas vacinas. Suporta busca textual.

### `EHRHeader`

Cabeçalho com avatar, nome e CPF do paciente. Contém botão de exportação do prontuário (em desenvolvimento).

---

## Hooks Customizados

### `usePatientData(cpf)`

Orquestra o carregamento de todos os dados do paciente em paralelo. Ao receber um CPF, busca primeiro os dados do usuário e depois dispara simultaneamente as requisições de consultas, triagens, exames e vacinas via `Promise.all`.

**Retorno:**

```js
{
  patient,        // dados cadastrais do paciente
  consultas,      // lista de consultas
  triagens,       // lista de triagens
  exames,         // lista de exames
  vacinas,        // lista de vacinas
  loading,        // boolean de carregamento inicial
  error,          // erro de carregamento, se houver
  reloadConsultas,   // função para recarregar consultas (aceita termo de busca)
  reloadTriagens,    // função para recarregar triagens
  reloadExames,      // função para recarregar exames
  reloadVacinas,     // função para recarregar vacinas
}
```

As funções `reload*` são memoizadas com `useCallback` para evitar re-renders desnecessários nos componentes filhos.

### `useEntityForm({ initialValues, onSubmit, onSuccess })`

Hook genérico para gerenciar o estado e a submissão de formulários de cadastro. Centraliza tratamento de erros, estado de submissão e notificações toast de sucesso/erro.

**Retorno:**

```js
{
  formData,            // estado atual dos campos
  handleInputChange,   // handler para inputs de texto
  handleSelectChange,  // handler para selects (name, value)
  handleSubmit,        // handler de submissão com async/await
  isSubmitting,        // boolean de envio em progresso
}
```

---

## Módulos de Serviço (lib/)

Cada módulo expõe funções assíncronas que encapsulam chamadas `fetch` à API REST. O padrão é uniforme em todos os recursos:

```
listar<Recurso>()                     → GET /recurso
get<Recurso>PorId(id)                 → GET /recurso/:id
get<Recurso>PorIdUsuario(id, pesquisa) → GET /recurso/usuario?id_usuario=:id
criar<Recurso>(dados)                 → POST /recurso
atualizar<Recurso>(id, dados)         → PUT /recurso/:id
deletar<Recurso>(id)                  → DELETE /recurso/:id
```

**Módulos disponíveis:** `consultas.js`, `exames.js`, `triagens.js`, `vacinas.js`, `hospital.js`, `profissionais.js`, `usuarios.js`.

### `resumo-ia.js`

Envia o texto do prontuário do paciente para o endpoint `/SIHA/api/gemini` (integração Gemini) e retorna um resumo gerado por IA.

```js
import { resumoIA } from "@/lib/resumo-ia";
const resumo = await resumoIA({ prontuario: "texto do prontuário..." });
```

### Funções Utilitárias em `mock-data.js`

| Função | Descrição |
|---|---|
| `calculateAge(birthDate)` | Calcula idade a partir da data de nascimento |
| `calculateBMI(weight, height)` | Calcula IMC (peso em kg, altura em metros) |
| `getBMICategory(bmi)` | Retorna categoria textual do IMC |
| `formatDate(dateString)` | Formata data para `dd/mm/aaaa` (pt-BR) |
| `formatDateTime(dateString)` | Formata data e hora para `dd/mm/aaaa hh:mm` (pt-BR) |

---

## Dados Mock

O arquivo `lib/mock-data.js` contém estruturas de dados de exemplo para desenvolvimento e testes sem dependência do backend:

- `mockPatient` — paciente de exemplo com dados clínicos completos
- `mockProfessionals` — lista de médicos e enfermeiros
- `mockHospitals` — lista de hospitais e clínicas
- `mockConsultations` — histórico de consultas com diagnósticos e prescrições
- `mockTriages` — triagens com sinais vitais
- `mockExams` — exames laboratoriais e de imagem
- `mockVaccines` — histórico vacinal

---

## Como Executar

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm
- Backend SIAH em execução em `http://127.0.0.1:8000`

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SIAH-Sistema-Integrado-Acesso-a-Saude/Tela-Medico.git
cd Tela-Medico

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

Para acessar o prontuário de um paciente, informe o CPF via query string:

```
http://localhost:3000/?cpf=<CPF_DO_PACIENTE>
```

### Build para Produção

```bash
npm run build
npm run start
```

---

## Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Next.js |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint no projeto |

---

> **Projeto acadêmico** desenvolvido como parte do SIAH — Sistema Integrado de Acesso à Saúde.
