"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  NotebookText,
  Activity,
  Thermometer,
  Heart,
  HeartPulse,
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
  const latestTriage = triages.length > 0 ? triages[triages.length - 1] : null;
  const bmi = latestTriage
    ? calculateBMI(latestTriage.peso, latestTriage.altura)
    : "N/A";
  const bmiCategory = getBMICategory(bmi);

  // Estado para armazenar o resumo da IA
  const [resumo, setResumo] = useState("");
  const [loadingResumo, setLoadingResumo] = useState(false);
  const [erroResumo, setErroResumo] = useState("");

  useEffect(() => {
    async function fetchResumo() {
      setLoadingResumo(true);
      setErroResumo("");
      try {
        // Você pode customizar o objeto prontuario conforme necessário
        const prontuario = { patient, triages, consultations };
        const resposta = await resumoIA(prontuario);
        // Supondo que a resposta tenha um campo 'resumo' ou seja string
        setResumo(resposta.resposta || resposta || "Resumo não disponível");
      } catch (err) {
        setErroResumo("Erro ao obter resumo da IA");
      } finally {
        setLoadingResumo(false);
      }
    }
    fetchResumo();
  }, [patient, triages, consultations]);

  return (
    <main>
      {/* Patient Information */}
      <Card className="border-none shadow-md mb-5">
        <CardContent className="px-6">
          <div className="flex flex-line items-center text-left">
            <Avatar className="h-20 w-20 ring-3 mr-6 ring-primary/10">
              <AvatarImage
                src={patient.foto_rosto_link || "/placeholder.svg"}
                alt={patient.nome}
              />
            </Avatar>
            <div className="text-left">
              <p className="text-bold font-bold text-foreground">
                {patient.nome}
              </p>
              <p className="text-xs text-foreground">
                {new Date(patient.data_nascimento).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-sm font-medium text-foreground">{age} anos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Triage Information */}
      <section className="flex flex-wrap gap-3 mb-5">
        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <CardHeader>
            <HeartPulse className="h-6 w-6 text-primary" />
            <h2 className="text-bold font-bold text-foreground">
              Pressão Arterial
            </h2>
          </CardHeader>
          <CardContent className="px-6">
            <p>{latestTriage ? latestTriage.pressao_arterial : "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px] border-none shadow-md ">
          <CardHeader>
            <Thermometer className="h-6 w-6 text-primary" />
            <h2 className="text-bold font-bold text-foreground">Temperatura</h2>
          </CardHeader>
          <CardContent className="px-6">
            <p>{latestTriage ? latestTriage.temperatura : "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <CardHeader>
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-bold font-bold text-foreground">
              Frequência Cardíaca
            </h2>
          </CardHeader>
          <CardContent className="px-6">
            <p>{latestTriage ? latestTriage.frequencia_cardiaca : "N/A"} bpm</p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <CardHeader>
            <Activity className="h-6 w-6 text-primary" />
            <h2 className="text-bold font-bold text-foreground">IMC</h2>
          </CardHeader>
          <CardContent className="flex gap-3 px-6">
            <p>{bmi}</p>
            <Badge variant="secondary" className="text-xs">
              {bmiCategory}
            </Badge>
          </CardContent>
        </Card>
      </section>

      {/* Main complaint and Alerts Information */}
      <section className="flex flex-wrap gap-3 mb-5">
        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <div className="pb-4 border-b border-border">
            <CardHeader>
              <h2 className="text-bold font-bold text-foreground">Alertas</h2>
            </CardHeader>
          </div>
          <CardContent className="px-6">
            <div><b>Alertas: </b>{patient.alergias}</div>
            <div><b>Tipo Sanguíneo: </b>{patient.tipo_sanguineo}</div>
            <div><b>Condições Crônicas: </b>{patient.condicoes_cronicas}</div>
            <div><b>Medicamento em Uso: </b>{patient.medicamentos_em_uso}</div>
            <div><b>Possui Plano de Saúde: </b>{patient.possui_plano_saude ? "SIM" : "NÃO"}</div>
          </CardContent>
        </Card>

        <Card className="flex-2 min-w-[200px] border-none shadow-md ">
          <div className="pb-4 border-b border-border">
            <CardHeader>
              <h2 className="text-bold font-bold text-foreground">
                Queixa Principal
              </h2>
            </CardHeader>
          </div>
          <CardContent className="px-6">
            <p>{patient.prontuario}</p>
          </CardContent>
        </Card>
      </section>

      {/* Summary and History Medical Information */}
      <section className="flex flex-wrap gap-3 mb-5">
        <Card className="flex-1 min-w-[200px] border-none shadow-md">
          <div className="pb-4 border-b border-border">
            <CardHeader>
              <h2 className="text-bold font-bold text-foreground">
                Histórico Médico
              </h2>
            </CardHeader>
          </div>
          <CardContent className="px-6">
          {consultations?.length > 0 ? (
            consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="mb-4 last:mb-0 flex flex-col border-b border-border pb-2"
              >
                <h3 className="font-bold text-cyan-400">
                  {consultation.motivo_consulta}
                </h3>
                <p>{formatDateTime(consultation.data_consulta)}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma consulta registrada.</p>
          )}
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px] border-b border-cyan-500 shadow-md bg-cyan-100">
          <div className="pb-4 border-b border-cyan-500 border-border">
            <CardHeader>
              <h2 className="text-bold font-bold text-foreground">Resumo IA</h2>
            </CardHeader>
          </div>
          <CardContent className="px-6" style={{ whiteSpace: "pre-line" }}>
            {loadingResumo && <p>Carregando resumo...</p>}
            {erroResumo && <p className="text-red-500">{erroResumo}</p>}
            {!loadingResumo && !erroResumo && <p>{resumo.replace(/\*\*/g, "")}</p>}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
