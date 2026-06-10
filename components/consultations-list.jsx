"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  User,
  ChevronDown,
  ChevronUp,
  FileText,
  Pill,
  Search,
} from "lucide-react";
import { formatDateTime } from "@/lib/mock-data";
import { criarConsulta } from "@/lib/consultas";
import { listarProfissionais } from "@/lib/profissionais";
import { listarHospitais } from "@/lib/hospital";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEntityForm } from "@/hooks/useEntityForm";

export function ConsultationsList({
  patient,
  consultations,
  reloadConsultations,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [profissionais, setProfissionais] = useState([]);
  const [hospitais, setHospitais] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const initialValues = {
    idPacient: patient.id,
    idDoctor: "",
    idHospital: "",
    date: "",
    reason: "",
    finalDiagnosis: "",
    medications: "",
    observations: "",
  };

  const {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isSubmitting,
  } = useEntityForm({
    initialValues,
    onSubmit: (data) => criarConsulta(data, patient.cpf),
    onSuccess: async () => {
      await reloadConsultations();
      setIsDialogOpen(false);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      reloadConsultations(searchQuery);
    }, 1200); // aguarda 400ms após o usuário parar de digitar

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (isDialogOpen) loadData();
  }, [isDialogOpen]);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const [profsData, hospsData] = await Promise.all([
        listarProfissionais(),
        listarHospitais(),
      ]);
      setProfissionais(Array.isArray(profsData) ? profsData : []);
      setHospitais(Array.isArray(hospsData) ? hospsData : []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-b border-cyan-500"
            >
              Adicionar +
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Consulta</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="idDoctor">Profissional *</Label>
                  <Select
                    value={formData.idDoctor}
                    onValueChange={(value) =>
                      handleSelectChange("idDoctor", value)
                    }
                    disabled={isLoadingData}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isLoadingData
                            ? "Carregando..."
                            : "Selecione um profissional"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {profissionais.map((prof) => (
                        <SelectItem key={prof.id} value={prof.id}>
                          {prof.nome} - ({prof.especialidade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idHospital">Hospital *</Label>
                  <Select
                    value={formData.idHospital}
                    onValueChange={(value) =>
                      handleSelectChange("idHospital", value)
                    }
                    disabled={isLoadingData}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isLoadingData
                            ? "Carregando..."
                            : "Selecione um hospital"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitais.map((hospital) => (
                        <SelectItem key={hospital.id} value={hospital.id}>
                          {hospital.nomeHospital}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data da Consulta *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo da Consulta *</Label>
                <Input
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Ex: Dor abdominal"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalDiagnosis">Diagnóstico</Label>
                <Textarea
                  id="finalDiagnosis"
                  name="finalDiagnosis"
                  value={formData.finalDiagnosis}
                  onChange={handleInputChange}
                  placeholder="Descreva o diagnóstico..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Prescrição</Label>
                <Textarea
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="Descreva a prescrição médica..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Anotações Médicas</Label>
                <Textarea
                  id="observations"
                  name="observations"
                  value={formData.observations}
                  onChange={handleInputChange}
                  placeholder="Anotações adicionais..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  {isSubmitting ? "Salvando..." : "Salvar Consulta"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar consultas..."
            className="bg-white pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {consultations?.length > 0 ? (
        consultations.map((consultation) => (
          <Card
            key={consultation.id}
            className="border-none shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-b border-cyan-500"
            onClick={() => toggleExpand(consultation.id)}
          >
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 text-foreground">
                    {consultation.reason}
                  </CardTitle>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDateTime(consultation.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-primary" />
                      <span>{consultation.doctor?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-2">
                  {expandedId === consultation.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedId === consultation.id && (
              <CardContent className="pt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm text-foreground">
                        Hospital
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {consultation.hospital?.nameHospital}
                    </p>
                    <p className="text-xs text-muted-foreground ml-6">
                      {consultation.hospital?.street},{" "}
                      {consultation.hospital?.city} -{" "}
                      {consultation.hospital?.state}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm text-foreground">
                        Profissional
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {consultation.doctor?.name}
                    </p>
                    <p className="text-xs text-muted-foreground ml-6">
                      {consultation.doctor?.specialty} -{" "}
                      {consultation.doctor?.typeProfissional}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-sm text-foreground">
                      Diagnóstico
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6 whitespace-pre-line">
                    {consultation.finalDiagnosis}
                  </p>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-sm text-foreground">
                      Prescrição
                    </h4>
                  </div>
                  <div className="ml-6 bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-foreground font-mono whitespace-pre-line">
                      {consultation.medications[0].name || "Nenhuma"}
                    </p>
                  </div>
                </div>

                {consultation.observations && (
                  <div className="pt-3 border-t border-border">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">
                      Anotações Médicas
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6 whitespace-pre-line">
                      {consultation.observations}
                    </p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))
      ) : (
        <p className="text-sm text-muted-foreground pt-4">
          {searchQuery
            ? "Nenhuma consulta encontrada para a pesquisa."
            : "Paciente não possui consultas cadastradas."}
        </p>
      )}
    </div>
  );
}
