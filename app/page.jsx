"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
//import { useRouter } from "simple-react-routing"
import { EHRSidebar } from "@/components/ehr-sidebar";
import { EHRHeader } from "@/components/ehr-header";
import { PatientCard } from "@/components/patient-card";
import { ConsultationsList } from "@/components/consultations-list";
import { TriageCard } from "@/components/triage-card";
import { ExamsList } from "@/components/exams-list";
import { VaccinesList } from "@/components/vaccines-list";
import {
  mockPatient,
  mockConsultations,
  mockTriages,
  mockExams,
  mockVaccines,
} from "@/lib/mock-data";
import { getUsuarioPorCPF } from "@/lib/usuarios";
import { getConsultasPorIdUsuario } from "@/lib/consultas";
import { getExamesPorIdUsuario } from "@/lib/exames";
import { getTriagensPorIdUsuario } from "@/lib/triagens";
import { getVacinasPorIdUsuario } from "@/lib/vacinas";

export default function EHRPage() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("patient");
  const [pacient, setPacient] = useState({});
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);
  const [triagens, setTriagens] = useState([]);
  const [vacinas, setVacinas] = useState([]);

  const cpf = searchParams.get("cpf");

  async function carregarUsuario() {
    const usuario = await getUsuarioPorCPF(cpf);
    return usuario;
  }
  useEffect(() => {
    async function carregar() {
      const user = await carregarUsuario();
      setPacient(user);
    }
    carregar();
  }, []);

  console.log("Paciente carregado:", pacient);

  useEffect(() => {
    if (!pacient?.id) return; // impede erros
    carregarConsultas();
  }, [pacient]);
  async function carregarConsultas() {
    const consultas = await getConsultasPorIdUsuario(pacient.id);
    setConsultas(consultas);
  }

  useEffect(() => {
    if (!pacient?.id) return;
    carregarTriagens();
  }, [pacient]);
  async function carregarTriagens() {
    const triagens = await getTriagensPorIdUsuario(pacient.id);
    setTriagens(triagens);
  }

  useEffect(() => {
    if (!pacient?.id) return;
    carregarExames();
  }, [pacient]);
  async function carregarExames() {
    const exames = await getExamesPorIdUsuario(pacient.id);
    setExames(exames);
  }

  useEffect(() => {
    if (!pacient?.id) return;
    carregarVacinas();
  }, [pacient]);
  async function carregarVacinas() {
    const vacinas = await getVacinasPorIdUsuario(pacient.id);
    setVacinas(vacinas);
  }

  const renderContent = () => {
    switch (activeSection) {
      case "patient":
        return (
          <PatientCard
            patient={pacient}
            triages={triagens}
            consultations={consultas}
          />
        );
      case "consultations":
        return (
          <ConsultationsList
            patient={pacient}
            consultations={consultas}
            reloadConsultations={carregarConsultas}
          />
        );
      case "triage":
        return (
          <TriageCard
            patient={pacient}
            triages={triagens}
            reloadTriages={carregarTriagens}
          />
        );
      case "exams":
        return (
          <ExamsList
            patient={pacient}
            exams={exames}
            reloadExams={carregarExames}
          />
        );
      case "vaccines":
        return (
          <VaccinesList
            patient={pacient}
            vaccines={vacinas}
            reloadVaccines={carregarVacinas}
          />
        );
      default:
        return <PatientCard patient={pacient} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <EHRSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <EHRHeader patient={mockPatient} /> */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
