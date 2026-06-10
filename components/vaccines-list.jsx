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
import { Syringe, Calendar, Package, MapPin, User, Search } from "lucide-react";
import { formatDate } from "@/lib/mock-data";
import { criarVacina } from "@/lib/vacinas";
import { listarProfissionais } from "@/lib/profissionais";
import { listarHospitais } from "@/lib/hospital";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEntityForm } from "@/hooks/useEntityForm";

export function VaccinesList({ patient, vaccines, reloadVacinas }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profissionais, setProfissionais] = useState([]);
  const [hospitais, setHospitais] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      reloadVacinas(searchQuery);
    }, 1200); // aguarda 400ms após o usuário parar de digitar

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const initialValues = {
    cpf: patient.cpf,
    idHospital: "",
    idProfissional: "",
    nomeVacina: "",
    dataAplicacao: "",
    dose: "",
    lote: "",
  };

  const {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isSubmitting,
  } = useEntityForm({
    initialValues,
    onSubmit: (data) => criarVacina(data),
    onSuccess: async () => {
      await reloadVacinas();
      setIsDialogOpen(false);
    },
  });

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
              <DialogTitle>Cadastrar Nova Vacina</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idProfissional">Profissional *</Label>
                  <Select
                    value={formData.idProfissional}
                    onValueChange={(value) =>
                      handleSelectChange("idProfissional", value)
                    }
                    disabled={isLoadingData}
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
                  <Label htmlFor="nomeVacina">Nome da Vacina *</Label>
                  <Input
                    id="nomeVacina"
                    name="nomeVacina"
                    value={formData.nomeVacina}
                    onChange={handleInputChange}
                    placeholder="Ex: Tetano, COVID-19, Influenza"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataAplicacao">Data de Aplicação *</Label>
                  <Input
                    id="dataAplicacao"
                    name="dataAplicacao"
                    type="datetime-local"
                    value={formData.dataAplicacao}
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
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Vacina"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar vacinas..."
            className="bg-white pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {vaccines?.length > 0 ? (
        vaccines.map((vaccine) => (
          <Card key={vaccine.id} className="border-none shadow-md">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Syringe className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg text-foreground">
                    {vaccine.nomeVacina}
                  </CardTitle>
                </div>
                {vaccine.dose && (
                  <Badge variant="secondary">{vaccine.dose}</Badge>
                )}
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
                      {formatDate(vaccine.dataAplicacao)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Lote</p>
                    <p className="text-sm font-medium text-foreground">
                      {vaccine.lote || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Local</p>
                    <p className="text-sm font-medium text-foreground">
                      {vaccine.hospital?.nomeHospital}
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
                      {vaccine.profissional?.especialidade}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-muted-foreground pt-4">
          Paciente não possui vacinas cadastradas.
        </p>
      )}
    </div>
  );
}
