// Mock data
export const mockPatient = {
  id: 1,
  nome: "Maria Silva Santos",
  cpf: "123.456.789-00",
  data_nascimento: "1985-03-15",
  telefone: "(11) 98765-4321",
  email: "maria.silva@email.com",
  endereco: "Rua das Flores, 123 - São Paulo, SP - CEP 01234-567",
  foto_rosto_link: "/professional-woman-portrait.jpg",
  biometria_digital: "Biometria registrada em 15/01/2024",
  tipo_sanguineo: "O+",
  alergias: "Penicilina, Dipirona",
  condicoes_cronicas: "Hipertensão, Diabetes tipo 2",
  prontuario: "Paciente com histórico de hipertensão controlada. Diabetes tipo 2 diagnosticada em 2018. Alergia conhecida a penicilina e dipirona. Medicação atual inclui metformina e losartana. Paciente com histórico de hipertensão controlada. Diabetes tipo 2 diagnosticada em 2018. Alergia conhecida a penicilina e dipirona. Medicação atual inclui metformina e losartana. Paciente com histórico de hipertensão controlada. Diabetes tipo 2 diagnosticada em 2018. Alergia conhecida a penicilina e dipirona. Medicação atual inclui metformina e losartana.",
}

export const mockProfessionals = [
  {
    id: 1,
    nome: "Dr. João Carvalho",
    tipo_profissional: "Médico",
    crm_coren: "CRM 123456",
    especialidade: "Cardiologia",
    telefone: "(11) 3456-7890",
    email: "joao.carvalho@hospital.com",
  },
  {
    id: 2,
    nome: "Dra. Ana Paula Oliveira",
    tipo_profissional: "Médica",
    crm_coren: "CRM 234567",
    especialidade: "Endocrinologia",
    telefone: "(11) 3456-7891",
    email: "ana.oliveira@hospital.com",
  },
  {
    id: 3,
    nome: "Enf. Carlos Santos",
    tipo_profissional: "Enfermeiro",
    crm_coren: "COREN 345678",
    especialidade: "Enfermagem Geral",
    telefone: "(11) 3456-7892",
    email: "carlos.santos@hospital.com",
  },
]

export const mockHospitals = [
  {
    id: 1,
    nome_hospital: "Hospital São Lucas",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    estado: "SP",
  },
  {
    id: 2,
    nome_hospital: "Clínica Saúde Total",
    endereco: "Rua Augusta, 500",
    cidade: "São Paulo",
    estado: "SP",
  },
]

export const mockConsultations = [
  {
    id: 1,
    id_usuario: 1,
    id_profissional: 1,
    id_hospital: 1,
    data_consulta: "2024-10-10T14:30:00",
    motivo_consulta: "Dor no peito e falta de ar",
    diagnostico: "Angina estável. Necessário acompanhamento cardiológico regular.",
    prescricao: "Atenolol 50mg - 1x ao dia\nAAS 100mg - 1x ao dia\nSinvastatina 20mg - 1x ao dia",
    anotacoes_medicas: "Paciente apresenta histórico familiar de doenças cardiovasculares. Recomendado ECG de esforço.",
    profissional: mockProfessionals[0],
    hospital: mockHospitals[0],
  },
  {
    id: 2,
    id_usuario: 1,
    id_profissional: 2,
    id_hospital: 2,
    data_consulta: "2024-09-15T10:00:00",
    motivo_consulta: "Controle de diabetes",
    diagnostico: "Diabetes tipo 2 controlada. HbA1c em 6.8%.",
    prescricao: "Metformina 850mg - 2x ao dia\nGlicazida 30mg - 1x ao dia",
    anotacoes_medicas: "Paciente aderente ao tratamento. Manter dieta e exercícios físicos regulares.",
    profissional: mockProfessionals[1],
    hospital: mockHospitals[1],
  },
  {
    id: 3,
    id_usuario: 1,
    id_profissional: 1,
    id_hospital: 1,
    data_consulta: "2024-08-20T16:00:00",
    motivo_consulta: "Retorno cardiológico",
    diagnostico: "Hipertensão arterial controlada.",
    prescricao: "Losartana 50mg - 1x ao dia\nHidroclorotiazida 25mg - 1x ao dia",
    anotacoes_medicas: "Pressão arterial dentro dos parâmetros. Manter medicação atual.",
    profissional: mockProfessionals[0],
    hospital: mockHospitals[0],
  },
]

export const mockTriages = [
  {
    id: 1,
    id_consulta: 1,
    pressao_arterial: "140/90 mmHg",
    temperatura: "36.5°C",
    frequencia_cardiaca: 78,
    peso: 72.5,
    altura: 1.65,
    sintomas_principais: "Dor torácica, dispneia aos esforços",
    observacoes_enfermagem: "Paciente consciente e orientada. Sinais vitais estáveis.",
    data_hora_triagem: "2024-10-10T14:00:00",
  },
  {
    id: 2,
    id_consulta: 2,
    pressao_arterial: "130/85 mmHg",
    temperatura: "36.7°C",
    frequencia_cardiaca: 72,
    peso: 71.8,
    altura: 1.65,
    sintomas_principais: "Assintomática - consulta de rotina",
    observacoes_enfermagem: "Paciente em bom estado geral.",
    data_hora_triagem: "2024-09-15T09:45:00",
  },
  {
    id: 3,
    id_consulta: 3,
    pressao_arterial: "125/80 mmHg",
    temperatura: "36.6°C",
    frequencia_cardiaca: 70,
    peso: 71.0,
    altura: 1.65,
    sintomas_principais: "Assintomática - retorno",
    observacoes_enfermagem: "Paciente apresenta melhora nos parâmetros vitais.",
    data_hora_triagem: "2024-08-20T15:45:00",
  },
]

export const mockExams = [
  {
    id: 1,
    id_usuario: 1,
    tipo_exame: "Hemograma Completo",
    data_realizacao: "2024-10-05",
    resultado_link: "#",
    nome_laboratorio: "Laboratório Diagnóstico",
  },
  {
    id: 2,
    id_usuario: 1,
    tipo_exame: "Glicemia em Jejum",
    data_realizacao: "2024-09-10",
    resultado_link: "#",
    nome_laboratorio: "Laboratório Diagnóstico",
  },
  {
    id: 3,
    id_usuario: 1,
    tipo_exame: "Hemoglobina Glicada (HbA1c)",
    data_realizacao: "2024-09-10",
    resultado_link: "#",
    nome_laboratorio: "Laboratório Diagnóstico",
  },
  {
    id: 4,
    id_usuario: 1,
    tipo_exame: "Eletrocardiograma (ECG)",
    data_realizacao: "2024-08-15",
    resultado_link: "#",
    nome_laboratorio: "Clínica Cardio",
  },
  {
    id: 5,
    id_usuario: 1,
    tipo_exame: "Colesterol Total e Frações",
    data_realizacao: "2024-08-10",
    resultado_link: "#",
    nome_laboratorio: "Laboratório Diagnóstico",
  },
]

export const mockVaccines = [
  {
    id: 1,
    id_usuario: 1,
    nome_vacina: "COVID-19 (Pfizer)",
    data_aplicacao: "2024-03-15",
    dose: "Reforço",
    lote: "FG7823",
    id_hospital: 1,
    id_profissional: 3,
    hospital: mockHospitals[0],
    profissional: mockProfessionals[2],
  },
  {
    id: 2,
    id_usuario: 1,
    nome_vacina: "Influenza (Gripe)",
    data_aplicacao: "2024-04-20",
    dose: "Dose Anual",
    lote: "INF2024",
    id_hospital: 2,
    id_profissional: 3,
    hospital: mockHospitals[1],
    profissional: mockProfessionals[2],
  },
  {
    id: 3,
    id_usuario: 1,
    nome_vacina: "Hepatite B",
    data_aplicacao: "2023-06-10",
    dose: "3ª Dose",
    lote: "HEP456",
    id_hospital: 1,
    id_profissional: 3,
    hospital: mockHospitals[0],
    profissional: mockProfessionals[2],
  },
  {
    id: 4,
    id_usuario: 1,
    nome_vacina: "Tétano e Difteria (dT)",
    data_aplicacao: "2022-01-15",
    dose: "Reforço",
    lote: "TET789",
    id_hospital: 1,
    id_profissional: 3,
    hospital: mockHospitals[0],
    profissional: mockProfessionals[2],
  },
]

// Utility functions
export function calculateAge(birthDate) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function calculateBMI(weight, height) {
  return Number((weight / (height * height)).toFixed(1))
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return "Abaixo do peso"
  if (bmi < 25) return "Peso normal"
  if (bmi < 30) return "Sobrepeso"
  return "Obesidade"
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function formatDateTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
