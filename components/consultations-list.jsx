"use client";

import { useEffect, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConsultationsList({ patient, consultations, reloadConsultations }) {
  const [expandedId, setExpandedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profissionais, setProfissionais] = useState([]);
  const [hospitais, setHospitais] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    id_usuario: patient.id,
    id_profissional: "",
    id_hospital: "",
    data_consulta: "",
    motivo_consulta: "",
    diagnostico: "",
    prescricao: "",
    anotacoes_medicas: "",
  });

  useEffect(() => {
    if (isDialogOpen) {
      loadData()
    }
  }, [isDialogOpen])

  const loadData = async () => {
    setIsLoading(true)
    try {
          const [profsData, hospsData] = await Promise.all([
      listarProfissionais(),
      listarHospitais()
    ]);

    setProfissionais(Array.isArray(profsData) ? profsData : []);
    setHospitais(Array.isArray(hospsData) ? hospsData : []);

    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await criarConsulta(formData);

      // Reset form
      setFormData({
        id_usuario: patient.id,
        id_profissional: "",
        id_hospital: "",
        data_consulta: "",
        motivo_consulta: "",
        diagnostico: "",
        prescricao: "",
        anotacoes_medicas: "",
      });
      
      await reloadConsultations();

      // Close dialog
      setIsDialogOpen(false);

      // You might want to refresh the consultations list here
      alert("Consulta criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar consulta:", error);
      alert("Erro ao criar consulta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
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
                  <Label htmlFor="id_profissional">Profissional *</Label>
                  <Select
                    value={formData.id_profissional}
                    onValueChange={(value) => handleSelectChange("id_profissional", value)}
                    disabled={isLoading}
                    className="max-w-60"
                  >
                    <SelectTrigger className="w-55">
                      <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione um profissional"} />
                    </SelectTrigger>
                    <SelectContent>
                      {profissionais.map((prof) => (
                        <SelectItem key={prof.id} value={prof.id}>
                          {prof.nome} - ({prof.crm_coren})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id_hospital">Hospital *</Label>
                  <Select
                    value={formData.id_hospital}
                    onValueChange={(value) => handleSelectChange("id_hospital", value)}
                    disabled={isLoading}
                    className="max-w-60"
                  >
                    <SelectTrigger className="w-55">
                      <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione um profissional"} />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitais.map((hospital) => (
                        <SelectItem key={hospital.id} value={hospital.id}>
                          {hospital.nome_hospital}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data_consulta">Data da Consulta *</Label>
                  <Input
                    id="data_consulta"
                    name="data_consulta"
                    type="datetime-local"
                    value={formData.data_consulta}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo_consulta">Motivo da Consulta *</Label>
                <Input
                  id="motivo_consulta"
                  name="motivo_consulta"
                  value={formData.motivo_consulta}
                  onChange={handleInputChange}
                  placeholder="Ex: Dor abdominal"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnostico">Diagnóstico</Label>
                <Textarea
                  id="diagnostico"
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                  placeholder="Descreva o diagnóstico..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescricao">Prescrição</Label>
                <Textarea
                  id="prescricao"
                  name="prescricao"
                  value={formData.prescricao}
                  onChange={handleInputChange}
                  placeholder="Descreva a prescrição médica..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="anotacoes_medicas">Anotações Médicas</Label>
                <Textarea
                  id="anotacoes_medicas"
                  name="anotacoes_medicas"
                  value={formData.anotacoes_medicas}
                  onChange={handleInputChange}
                  placeholder="Anotações adicionais..."
                  rows={3}
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
                    {consultation.motivo_consulta}
                  </CardTitle>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDateTime(consultation.data_consulta)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-primary" />
                      <span>{consultation.profissional?.nome}</span>
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
                      {consultation.hospital?.nome_hospital}
                    </p>
                    <p className="text-xs text-muted-foreground ml-6">
                      {consultation.hospital?.endereco},{" "}
                      {consultation.hospital?.cidade} -{" "}
                      {consultation.hospital?.estado}
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
                      {consultation.profissional?.nome}
                    </p>
                    <p className="text-xs text-muted-foreground ml-6">
                      {consultation.profissional?.especialidade} -{" "}
                      {consultation.profissional?.crm_coren}
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
                    {consultation.diagnostico}
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
                      {consultation.prescricao}
                    </p>
                  </div>
                </div>

                {consultation.anotacoes_medicas && (
                  <div className="pt-3 border-t border-border">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">
                      Anotações Médicas
                    </h4>
                    <p className="text-sm text-muted-foreground ml-6 whitespace-pre-line">
                      {consultation.anotacoes_medicas}
                    </p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))
      ) : (
        <p className="text-xm text-muted-foreground pt-4">
          Paciente não possui consultas cadastradas.
        </p>
      )}
    </div>
  );
}
