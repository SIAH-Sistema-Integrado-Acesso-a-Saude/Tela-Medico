"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Thermometer,
  Heart,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import {
  calculateBMI,
  getBMICategory,
  calculateAge,
  formatDateTime,
} from "@/lib/mock-data";
import { resumoIA } from "../lib/resumo-ia";
import { useState, useEffect } from "react";

export function PatientCard({ patient, triages, consultations }) {
  const age = calculateAge(patient.data_nascimento);
  const firstTriage = triages && triages.length > 0 ? triages[0] : null;
  const firstConsultation =
    consultations && consultations.length > 0 ? consultations[0] : null;
  const bmi = firstTriage
    ? calculateBMI(firstTriage.peso, firstTriage.altura)
    : "N/A";
  const bmiCategory = getBMICategory(bmi);

  const [avatarFoto, setAvatarFoto] = useState(null);
  const [resumo, setResumo] = useState("");
  const [loadingResumo, setLoadingResumo] = useState(false);
  const [erroResumo, setErroResumo] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchResumo() {
      const cachedResumo = sessionStorage.getItem(
        `resumo_paciente_${patient.cpf}`,
      );
      if (cachedResumo) {
        setResumo(cachedResumo);
        return;
      }
      setLoadingResumo(true);
      setErroResumo("");
      try {
        const prontuario = { patient, triages, consultations };
        //const resposta = await resumoIA(prontuario);
        const resposta = await resumoIA(patient.cpf);
        const textoFinal =
          resposta.resposta || resposta || "Resumo não disponível";
        setResumo(textoFinal);
        sessionStorage.setItem(`resumo_paciente_${patient.cpf}`, textoFinal);
      } catch (err) {
        setErroResumo("Erro ao obter resumo da IA");
      } finally {
        setLoadingResumo(false);
      }
    }

    if (patient.cpf) {
      fetchResumo();
    }
  }, [patient.cpf]);

  useEffect(() => {
    if (patient.images?.length > 0) {
      const supabaseBaseUrl =
        "https://bngwnknyxmhkeesoeizb.supabase.co/storage/v1/object/public/faces";
      const imageUrl = `${supabaseBaseUrl}/${patient.images[0]}`;
      setAvatarFoto(imageUrl);
    }
  }, [patient.images]);

  // Initials fallback for avatar
  const initials = patient.nome
    ? patient.nome
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <main>
      {/* Patient Information */}
      <Card className="border-none shadow-md mb-5">
        <CardContent className="px-6 pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20">
              <AvatarImage
                src={avatarFoto || "/placeholder.svg"}
                alt={patient.nome}
              />
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-bold text-foreground">
                {patient.nome}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(patient.data_nascimento).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-sm font-medium text-foreground">{age} anos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Triage Vitals */}
      <section className="flex flex-wrap gap-3 mb-5">
        <Card className="flex-1 min-w-[180px] border-none shadow-md">
          <CardHeader className="pb-2">
            <HeartPulse className="h-5 w-5 text-primary mb-1" />
            <CardTitle className="text-sm font-semibold text-foreground">
              Pressão Arterial
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <p className="text-base font-medium">
              {firstTriage ? firstTriage.pressao_arterial : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[180px] border-none shadow-md">
          <CardHeader className="pb-2">
            <Thermometer className="h-5 w-5 text-primary mb-1" />
            <CardTitle className="text-sm font-semibold text-foreground">
              Temperatura
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <p className="text-base font-medium">
              {firstTriage ? firstTriage.temperatura : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[180px] border-none shadow-md">
          <CardHeader className="pb-2">
            <Heart className="h-5 w-5 text-primary mb-1" />
            <CardTitle className="text-sm font-semibold text-foreground">
              Freq. Cardíaca
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <p className="text-base font-medium">
              {firstTriage ? firstTriage.frequencia_cardiaca : "N/A"} bpm
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[180px] border-none shadow-md">
          <CardHeader className="pb-2">
            <Activity className="h-5 w-5 text-primary mb-1" />
            <CardTitle className="text-sm font-semibold text-foreground">
              IMC
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4 flex items-center gap-2">
            <p className="text-base font-medium">{bmi}</p>
            {bmiCategory && (
              <Badge variant="secondary" className="text-xs">
                {bmiCategory}
              </Badge>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Alerts & Last Consultation */}
      <section className="flex flex-wrap gap-3 mb-5">
        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <div className="pb-2 border-b border-border">
            <CardHeader>
              <CardTitle className="text-base font-bold text-foreground">
                Alertas
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="px-6 pt-4 space-y-2 text-sm">
            <div>
              <span className="font-semibold">Alergias: </span>
              <span className="text-muted-foreground">
                {patient.alergias || "Nenhuma"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Tipo Sanguíneo: </span>
              <span className="text-muted-foreground">
                {patient.tipo_sanguineo || "—"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Condições Crônicas: </span>
              <span className="text-muted-foreground">
                {patient.condicoes_cronicas || "Nenhuma"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Medicamentos em Uso: </span>
              <span className="text-muted-foreground">
                {patient.medicamentos_em_uso || "Nenhum"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Plano de Saúde: </span>
              <Badge
                variant={patient.possui_plano_saude ? "default" : "secondary"}
                className="text-xs ml-1"
              >
                {patient.possui_plano_saude ? "SIM" : "NÃO"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-2 min-w-[200px] border-none shadow-md">
          <div className="pb-2 border-b border-border">
            <CardHeader>
              <CardTitle className="text-base font-bold text-foreground">
                Última Consulta
                {firstConsultation && (
                  <span className="font-normal text-muted-foreground ml-2 text-sm">
                    {new Date(
                      firstConsultation.data_consulta,
                    ).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="px-6 pt-4 space-y-2 text-sm">
            {firstConsultation ? (
              <>
                <div>
                  <span className="font-semibold">Motivo: </span>
                  <span className="text-muted-foreground">
                    {firstConsultation.motivo_consulta}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Diagnóstico: </span>
                  <span className="text-muted-foreground">
                    {firstConsultation.diagnostico}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Prescrição: </span>
                  <span className="text-muted-foreground">
                    {firstConsultation.prescricao}
                  </span>
                </div>
                {firstConsultation.anotacoes_medicas && (
                  <div>
                    <span className="font-semibold">Observações: </span>
                    <span className="text-muted-foreground">
                      {firstConsultation.anotacoes_medicas}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">
                Nenhuma consulta registrada.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Medical History & AI Summary */}
      <section className="flex flex-wrap gap-3 mb-5">
        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <div className="pb-2 border-b border-border">
            <CardHeader>
              <CardTitle className="text-base font-bold text-foreground">
                Histórico Médico
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="px-6 pt-4">
            {consultations?.length > 0 ? (
              consultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="mb-4 last:mb-0 flex flex-col border-b border-border pb-2"
                >
                  <h3 className="font-semibold text-primary text-sm">
                    {consultation.motivo_consulta}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(consultation.data_consulta)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma consulta registrada.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px] border-none shadow-md border-l-2 border-l-primary">
          <div className="pb-2 border-b border-border">
            <CardHeader>
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Resumo IA
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="px-6 pt-4" style={{ whiteSpace: "pre-line" }}>
            {loadingResumo && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Gerando resumo...
              </p>
            )}
            {erroResumo && (
              <p className="text-sm text-destructive">{erroResumo}</p>
            )}
            {!loadingResumo && !erroResumo && isMounted && (
              <p className="text-sm text-foreground">
                {resumo.replace(/\*\*/g, "")}
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
