"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Syringe, Calendar, Package, MapPin, User } from "lucide-react";
import { formatDate } from "@/lib/mock-data";
import { criarVacina } from "@/lib/vacinas";
import { listarProfissionais } from "@/lib/profissionais";
import { listarHospitais } from "@/lib/hospital";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function VaccinesList({ patient, vaccines, reloadVaccines }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [profissionais, setProfissionais] = useState([]);
  const [hospitais, setHospitais] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id_usuario: patient.id,
    id_hospital: "",
    id_profissional: "",
    nome_vacina: "",
    data_aplicacao: "",
    dose: "",
    lote: "",
  });

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await criarVacina(formData);

      toast({
        title: "Sucesso!",
        description: "Vacina cadastrada com sucesso.",
      });

      // Resetar formulário
      setFormData({
        id_usuario: patient.id,
        id_hospital: "",
        id_profissional: "",
        nome_vacina: "",
        data_aplicacao: "",
        dose: "",
        lote: "",
      });

      await reloadVaccines();

      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar a vacina. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log("VaccinesList vaccines:", vaccines);
  console.log(hospitais);
  console.log(profissionais);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <Dialog open={open} onOpenChange={setOpen}>
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
              <DialogTitle>Cadastrar Nova Vacina</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id_profissional">Profissional *</Label>
                  <Select
                    value={formData.id_profissional}
                    onValueChange={(value) =>
                      handleSelectChange("id_profissional", value)
                    }
                    disabled={isLoading}
                    className="max-w-60"
                  >
                    <SelectTrigger className="w-55">
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Carregando..."
                            : "Selecione um profissional"
                        }
                      />
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
                    onValueChange={(value) =>
                      handleSelectChange("id_hospital", value)
                    }
                    disabled={isLoading}
                    className="max-w-60"
                  >
                    <SelectTrigger className="w-55">
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Carregando..."
                            : "Selecione um profissional"
                        }
                      />
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
                  <Label htmlFor="nome_vacina">Nome da Vacina *</Label>
                  <Input
                    id="nome_vacina"
                    name="nome_vacina"
                    value={formData.nome_vacina}
                    onChange={handleInputChange}
                    placeholder="Ex: Tetano, COVID-19, Influenza"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data_aplicacao">Data de Aplicação *</Label>
                  <Input
                    id="data_aplicacao"
                    name="data_aplicacao"
                    type="datetime-local"
                    value={formData.data_aplicacao}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dose">Dose</Label>
                  <Input
                    id="dose"
                    name="dose"
                    value={formData.dose}
                    onChange={handleInputChange}
                    placeholder="Ex: 1ª dose, 2ª dose, Reforço"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lote">Lote</Label>
                  <Input
                    id="lote"
                    name="lote"
                    value={formData.lote}
                    onChange={handleInputChange}
                    placeholder="Ex: L12345"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar Vacina"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {vaccines?.length > 0 ? (
        vaccines.map((vaccine) => (
          <Card key={vaccine.id} className="border-none shadow-md">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Syringe className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg text-foreground">
                    {vaccine.nome_vacina}
                  </CardTitle>
                </div>
                <Badge variant="secondary">{vaccine.dose}</Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      Data de Aplicação
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(vaccine.data_aplicacao)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Lote</p>
                    <p className="text-sm font-medium text-foreground">
                      {vaccine.lote}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Local</p>
                    <p className="text-sm font-medium text-foreground">
                      {vaccine.hospital?.nome_hospital}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vaccine.hospital?.cidade} - {vaccine.hospital?.estado}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      Aplicado por
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {vaccine.profissional?.nome}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vaccine.profissional?.crm_coren}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-xm text-muted-foreground pt-4">
          Paciente não possui vacinas cadastradas.
        </p>
      )}
    </div>
  );
}
