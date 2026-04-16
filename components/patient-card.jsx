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
  const firstTriage = triages && triages.length > 0 ? triages[0] : null;
  const firstConsultation =
    consultations && consultations.length > 0 ? consultations[0] : null;
  const bmi = firstTriage
    ? calculateBMI(firstTriage.peso, firstTriage.altura)
    : "N/A";
  const bmiCategory = getBMICategory(bmi);

  // Estado para armazenar o resumo da IA
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
      // 2. Tente pegar do cache logo no início do efeito (executa apenas no cliente)
      const cachedResumo = sessionStorage.getItem(
        `resumo_paciente_${patient.id}`,
      );

      if (cachedResumo) {
        setResumo(cachedResumo);
        return; // Se achou no cache, para aqui
      }

      // 3. Se não houver cache, busca na IA
      setLoadingResumo(true);
      setErroResumo("");
      try {
        const prontuario = { patient, triages, consultations };
        const resposta = await resumoIA(prontuario);
        const textoFinal =
          resposta.resposta || resposta || "Resumo não disponível";

        setResumo(textoFinal);
        sessionStorage.setItem(`resumo_paciente_${patient.id}`, textoFinal);
      } catch (err) {
        setErroResumo("Erro ao obter resumo da IA");
      } finally {
        setLoadingResumo(false);
      }
    }

    if (patient.id) {
      fetchResumo();
    }
  }, [patient.id]); // Mude a dependência para o ID do paciente para evitar loops

  useEffect(() => {
    if (patient.images?.length > 0) {
      const supabaseBaseUrl =
        "https://bngwnknyxmhkeesoeizb.supabase.co/storage/v1/object/public/faces";
      const imageUrl = `${supabaseBaseUrl}/${patient.images[0]}`;
      console.log(imageUrl);
      setAvatarFoto(imageUrl);
    }
  }, [patient.images]);

  return (
    <main>
      {/* Patient Information */}
      <Card className="border-none shadow-md mb-5">
        <CardContent className="px-6">
          <div className="flex flex-line items-center text-left">
            <Avatar className="h-20 w-20 ring-3 mr-6 ring-primary/10">
              <AvatarImage
                src={avatarFoto || "/placeholder.svg"}
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
            <p>{firstTriage ? firstTriage.pressao_arterial : "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[200px] border-none shadow-md ">
          <CardHeader>
            <Thermometer className="h-6 w-6 text-primary" />
            <h2 className="text-bold font-bold text-foreground">Temperatura</h2>
          </CardHeader>
          <CardContent className="px-6">
            <p>{firstTriage ? firstTriage.temperatura : "N/A"}</p>
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
            <p>{firstTriage ? firstTriage.frequencia_cardiaca : "N/A"} bpm</p>
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
            <div>
              <b>Alertas: </b>
              {patient.alergias}
            </div>
            <div>
              <b>Tipo Sanguíneo: </b>
              {patient.tipo_sanguineo}
            </div>
            <div>
              <b>Condições Crônicas: </b>
              {patient.condicoes_cronicas}
            </div>
            <div>
              <b>Medicamento em Uso: </b>
              {patient.medicamentos_em_uso}
            </div>
            <div>
              <b>Possui Plano de Saúde: </b>
              {patient.possui_plano_saude ? "SIM" : "NÃO"}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-2 min-w-[200px] border-none shadow-md ">
          <div className="pb-4 border-b border-border">
            <CardHeader>
              <h2 className="text-bold font-bold text-foreground">
                Ultima Consulta{" "}
                {firstConsultation
                  ? `- ${new Date(firstConsultation.data_consulta).toLocaleDateString("pt-BR")}`
                  : ""}
              </h2>
            </CardHeader>
          </div>
          <CardContent className="px-6">
            <p className="text-lg">
              <b>Motivo:</b>{" "}
              {firstConsultation ? firstConsultation.motivo_consulta : "N/A"}
            </p>
            <p className="text-lg">
              <b>Diagnóstico:</b>{" "}
              {firstConsultation ? firstConsultation.diagnostico : "N/A"}
            </p>
            <p className="text-lg">
              <b>Prescrição:</b>{" "}
              {firstConsultation ? firstConsultation.prescricao : "N/A"}
            </p>
            <p className="text-lg">
              <b>Observações:</b>{" "}
              {firstConsultation ? firstConsultation.anotacoes_medicas : "N/A"}
            </p>
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
            {!loadingResumo && !erroResumo && isMounted && (
              <p>{resumo.replace(/\*\*/g, "")}</p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
