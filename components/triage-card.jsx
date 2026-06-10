"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  Thermometer,
  Heart,
  Weight,
  Ruler,
  FileText,
  Clock,
  Search,
} from "lucide-react";
import { calculateBMI, getBMICategory, formatDateTime } from "@/lib/mock-data";
import { criarTriagem } from "@/lib/triagens";
import { useEntityForm } from "@/hooks/useEntityForm";

export function TriageCard({ patient, triages, reloadTriages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      reloadTriages(searchQuery);
    }, 1200); // aguarda 400ms após o usuário parar de digitar

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const formatarPressaoArterial = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 6);
    if (valor.length > 3) {
      valor = valor.slice(0, 3) + "/" + valor.slice(3);
    }
    return valor;
  };

  const formatarTemperatura = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 3);
    if (valor.length > 2) {
      valor = valor.slice(0, 2) + "." + valor.slice(2);
    }
    return valor;
  };

  const initialValues = {
    cpf: patient.cpf,
    bloodPressure: "",
    temperature: "",
    heartRate: "",
    weight: "",
    height: "",
    complaint: "",
    dateScreening: "",
  };

  const {
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  } = useEntityForm({
    initialValues,
    onSubmit: (data) =>
      criarTriagem({
        ...data,
        heartRate: parseInt(data.heartRate),
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
      }),
    onSuccess: async () => {
      await reloadTriages();
      setIsOpen(false);
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <DialogTitle>Nova Triagem</DialogTitle>
              <DialogDescription>
                Preencha os dados da triagem do paciente
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Pressão Arterial */}
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">
                    <Activity className="inline h-4 w-4 mr-1 text-primary" />
                    Pressão Arterial
                  </Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    placeholder="120/80"
                    value={formData.bloodPressure}
                    onChange={(e) => {
                      const formatado = formatarPressaoArterial(e.target.value);
                      handleInputChange({
                        target: { name: "bloodPressure", value: formatado },
                      });
                    }}
                    required
                  />
                </div>

                {/* Temperatura */}
                <div className="space-y-2">
                  <Label htmlFor="temperature">
                    <Thermometer className="inline h-4 w-4 mr-1 text-primary" />
                    Temperatura
                  </Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    placeholder="36.5°C"
                    value={formData.temperature}
                    onChange={(e) => {
                      const formatado = formatarTemperatura(e.target.value);
                      handleInputChange({
                        target: { name: "temperature", value: formatado },
                      });
                    }}
                    required
                  />
                </div>

                {/* Frequência Cardíaca */}
                <div className="space-y-2">
                  <Label htmlFor="heartRate">
                    <Heart className="inline h-4 w-4 mr-1 text-primary" />
                    Frequência Cardíaca (bpm)
                  </Label>
                  <Input
                    id="heartRate"
                    name="heartRate"
                    type="number"
                    placeholder="78"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Peso */}
                <div className="space-y-2">
                  <Label htmlFor="weight">
                    <Weight className="inline h-4 w-4 mr-1 text-primary" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    placeholder="72.5"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Altura */}
                <div className="space-y-2">
                  <Label htmlFor="height">
                    <Ruler className="inline h-4 w-4 mr-1 text-primary" />
                    Altura (m)
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.01"
                    placeholder="1.65"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Data e Hora da Triagem */}
                <div className="space-y-2">
                  <Label htmlFor="dateScreening">
                    <Clock className="inline h-4 w-4 mr-1 text-primary" />
                    Data e Hora
                  </Label>
                  <Input
                    id="dateScreening"
                    name="dateScreening"
                    type="datetime-local"
                    value={formData.dateScreening}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Queixa Principal */}
              <div className="space-y-2">
                <Label htmlFor="complaint">
                  <FileText className="inline h-4 w-4 mr-1 text-primary" />
                  Queixa Principal
                </Label>
                <Textarea
                  id="complaint"
                  name="complaint"
                  placeholder="Descreva os sintomas principais do paciente..."
                  value={formData.complaint}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Triagem"}
                </Button>
              </div>
            </form>
          </DialogContent>

          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar exames..."
              className="bg-white pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Dialog>
      </div>

      {triages?.length > 0 ? (
        triages.map((triage) => {
          const bmi = calculateBMI(triage.weight, triage.height);
          const bmiCategory = getBMICategory(bmi);

          return (
            <Card key={triage.id} className="border-none shadow-md">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">
                    Triagem
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{formatDateTime(triage.dateScreening)}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Pressão Arterial
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {triage.bloodPressure}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Thermometer className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Temperatura
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {triage.temperature}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Frequência Cardíaca
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {triage.heartRate} bpm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Weight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Peso</p>
                      <p className="text-sm font-semibold text-foreground">
                        {triage.weight} kg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ruler className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Altura
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {triage.height} m
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">IMC</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {bmi}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {bmiCategory}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Queixa Principal
                      </p>
                      <p className="text-sm text-foreground">
                        {triage.complaint}
                      </p>
                    </div>
                  </div>

                  {/* {triage.observacoes_enfermagem && (
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          Observações de Enfermagem
                        </p>
                        <p className="text-sm text-foreground">
                          {triage.observacoes_enfermagem}
                        </p>
                      </div>
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-sm text-muted-foreground pt-4">
          Paciente não possui triagens cadastradas.
        </p>
      )}
    </div>
  );
}
