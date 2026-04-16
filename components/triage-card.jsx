"use client";

import { useState } from "react";
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
} from "lucide-react";
import { calculateBMI, getBMICategory, formatDateTime } from "@/lib/mock-data";
import { criarTriagem } from "@/lib/triagens";

export function TriageCard({ patient, triages, reloadTriages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id_usuario: patient.id,
    pressao_arterial: "",
    temperatura: "",
    frequencia_cardiaca: "",
    peso: "",
    altura: "",
    queixa_principal: "",
    data_hora_triagem: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const triagemData = {
        ...formData,
        frequencia_cardiaca: Number.parseInt(formData.frequencia_cardiaca),
        peso: Number.parseFloat(formData.peso),
        altura: Number.parseFloat(formData.altura),
      };

      await criarTriagem(triagemData);

      // Reset form
      setFormData({
        id_usuario: patient.id,
        pressao_arterial: "",
        temperatura: "",
        frequencia_cardiaca: "",
        peso: "",
        altura: "",
        queixa_principal: "",
        data_hora_triagem: "",
      });

      await reloadTriages();

      setIsOpen(false);
      alert("Triagem cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar triagem:", error);
      alert("Erro ao cadastrar triagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatarPressaoArterial = (valor) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");
    // Limita a 6 dígitos (3 para sistólica + 3 para diastólica)
    valor = valor.slice(0, 6);
    // Se houver mais de 3 dígitos, insere a barra
    if (valor.length > 3) {
      valor = valor.slice(0, 3) + "/" + valor.slice(3);
    }
    // Se já houver diastólica completa, adiciona " mmHg"
    if (valor.length > 4) {
      valor = valor + " mmHg";
    }
    return valor;
  };

  const formatarTemperatura = (valor) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");
    // Limita a 3 dígitos (ex: 365 → 36.5)
    valor = valor.slice(0, 3);
    // Se houver mais de 2 dígitos, insere a vírgula decimal
    if (valor.length > 2) {
      valor = valor.slice(0, 2) + "." + valor.slice(2);
    }
    // Se já houver decimal completo, adiciona "°C"
    if (valor.length >= 4) {
      valor = valor + "°C";
    }
    return valor;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
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
                  <Label htmlFor="pressao_arterial">
                    <Activity className="inline h-4 w-4 mr-1 text-primary" />
                    Pressão Arterial
                  </Label>
                  <Input
                    id="pressao_arterial"
                    name="pressao_arterial"
                    placeholder="140/90 mmHg"
                    value={formData.pressao_arterial}
                    onChange={(e) => {
                      const formatado = formatarPressaoArterial(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        pressao_arterial: formatado,
                      }));
                    }}
                    required
                  />
                </div>

                {/* Temperatura */}
                <div className="space-y-2">
                  <Label htmlFor="temperatura">
                    <Thermometer className="inline h-4 w-4 mr-1 text-primary" />
                    Temperatura
                  </Label>
                  <Input
                    id="temperatura"
                    name="temperatura"
                    placeholder="36.5°C"
                    value={formData.temperatura}
                    onChange={(e) => {
                      const formatado = formatarTemperatura(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        temperatura: formatado,
                      }));
                    }}
                    required
                  />
                </div>

                {/* Frequência Cardíaca */}
                <div className="space-y-2">
                  <Label htmlFor="frequencia_cardiaca">
                    <Heart className="inline h-4 w-4 mr-1 text-primary" />
                    Frequência Cardíaca (bpm)
                  </Label>
                  <Input
                    id="frequencia_cardiaca"
                    name="frequencia_cardiaca"
                    type="number"
                    placeholder="78"
                    value={formData.frequencia_cardiaca}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Peso */}
                <div className="space-y-2">
                  <Label htmlFor="peso">
                    <Weight className="inline h-4 w-4 mr-1 text-primary" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="peso"
                    name="peso"
                    type="number"
                    step="0.1"
                    placeholder="72.5"
                    value={formData.peso}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Altura */}
                <div className="space-y-2">
                  <Label htmlFor="altura">
                    <Ruler className="inline h-4 w-4 mr-1 text-primary" />
                    Altura (m)
                  </Label>
                  <Input
                    id="altura"
                    name="altura"
                    type="number"
                    step="0.01"
                    placeholder="1.65"
                    value={formData.altura}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Data e Hora da Triagem */}
                <div className="space-y-2">
                  <Label htmlFor="data_hora_triagem">
                    <Clock className="inline h-4 w-4 mr-1 text-primary" />
                    Data e Hora
                  </Label>
                  <Input
                    id="data_hora_triagem"
                    name="data_hora_triagem"
                    type="datetime-local"
                    value={formData.data_hora_triagem}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Sintomas Principais */}
              <div className="space-y-2">
                <Label htmlFor="queixa_principal">
                  <FileText className="inline h-4 w-4 mr-1 text-primary" />
                  Queixa Principal
                </Label>
                <Textarea
                  id="queixa_principal"
                  name="queixa_principal"
                  placeholder="Descreva os sintomas principais do paciente..."
                  value={formData.queixa_principal}
                  onChange={handleInputChange}
                  rows={3}
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
        </Dialog>
      </div>

      {triages?.length > 0 ? (
        triages.map((triage) => {
          const bmi = calculateBMI(triage.peso, triage.altura);
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
                    <span>{formatDateTime(triage.data_hora_triagem)}</span>
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
                        {triage.pressao_arterial}
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
                        {triage.temperatura}
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
                        {triage.frequencia_cardiaca} bpm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Weight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Peso</p>
                      <p className="text-sm font-semibold text-foreground">
                        {triage.peso} kg
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
                        {triage.altura} m
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
                        Sintomas Principais
                      </p>
                      <p className="text-sm text-foreground">
                        {triage.queixa_principal}
                      </p>
                    </div>
                  </div>

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
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-xm text-muted-foreground pt-4">
          Paciente não possui triagens cadastradas.
        </p>
      )}
    </div>
  );
}
