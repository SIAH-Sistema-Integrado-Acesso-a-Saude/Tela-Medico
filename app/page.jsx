"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EHRSidebar } from "@/components/ehr-sidebar";
import { PatientCard } from "@/components/patient-card";
import { ConsultationsList } from "@/components/consultations-list";
import { TriageCard } from "@/components/triage-card";
import { ExamsList } from "@/components/exams-list";
import { VaccinesList } from "@/components/vaccines-list";
import { usePatientData } from "@/hooks/usePatientData";

function EHRContent() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("patient");
  const cpf = searchParams.get("cpf");

  const {
    patient,
    consultas,
    triagens,
    exames,
    vacinas,
    loading,
    error,
    reloadConsultas,
    reloadTriagens,
    reloadExames,
    reloadVacinas,
  } = usePatientData(cpf);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground text-sm animate-pulse">
          Carregando prontuário...
        </p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-destructive text-sm">
          {error
            ? "Erro ao carregar dados do paciente."
            : "Paciente não encontrado."}
        </p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "patient":
        return (
          <PatientCard
            patient={patient}
            triages={triagens}
            consultations={consultas}
          />
        );
      case "consultations":
        return (
          <ConsultationsList
            patient={patient}
            consultations={consultas}
            reloadConsultations={reloadConsultas}
          />
        );
      case "triage":
        return (
          <TriageCard
            patient={patient}
            triages={triagens}
            reloadTriages={reloadTriagens}
          />
        );
      case "exams":
        return (
          <ExamsList
            patient={patient}
            exams={exames}
            reloadExames={reloadExames}
          />
        );
      case "vaccines":
        return (
          <VaccinesList
            patient={patient}
            vaccines={vacinas}
            reloadVacinas={reloadVacinas}
          />
        );
      default:
        return (
          <PatientCard
            patient={patient}
            triages={triagens}
            consultations={consultas}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <EHRSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default function EHRPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <p className="text-muted-foreground text-sm animate-pulse">
            Carregando prontuário...
          </p>
        </div>
      }
    >
      <EHRContent />
    </Suspense>
  );
}
