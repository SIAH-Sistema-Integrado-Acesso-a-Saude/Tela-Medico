"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  Building2,
  ExternalLink,
  Search,
} from "lucide-react";
import { formatDate } from "@/lib/mock-data";
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
import { useState, useEffect } from "react";
import { criarExame } from "@/lib/exames";
import { useEntityForm } from "@/hooks/useEntityForm";

export function ExamsList({ patient, exams, reloadExames }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      reloadExames(searchQuery);
    }, 1200); // aguarda 400ms após o usuário parar de digitar

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const initialValues = {
    idPacient: patient.id,
    exam: "",
    dateExam: "",
    pdfUrl: "",
    nameLaboratory: "",
  };

  const { formData, handleInputChange, handleSubmit, isSubmitting } =
    useEntityForm({
      initialValues,
      onSubmit: (data) => criarExame(data),
      onSuccess: async () => {
        await reloadExames();
        setIsDialogOpen(false);
      },
    });

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
              <DialogTitle>Cadastrar Novo Exame</DialogTitle>
              <DialogDescription>
                Preencha os dados do exame realizado pelo paciente.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="exam">Tipo de Exame *</Label>
                  <Input
                    id="exam"
                    name="exam"
                    value={formData.exam}
                    onChange={handleInputChange}
                    placeholder="Ex: Radiografia, Hemograma, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateExam">Data de Realização *</Label>
                  <Input
                    id="dateExam"
                    name="dateExam"
                    type="datetime-local"
                    value={formData.dateExam}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameLaboratory">Nome do Laboratório *</Label>
                  <Input
                    id="nameLaboratory"
                    name="nameLaboratory"
                    value={formData.nameLaboratory}
                    onChange={handleInputChange}
                    placeholder="Ex: Laboratório Santa Tereza"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdfUrl">Link do Resultado (Opcional)</Label>
                  <Input
                    id="pdfUrl"
                    name="pdfUrl"
                    type="url"
                    value={formData.pdfUrl}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/resultado.pdf"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Exame"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar exames..."
            className="bg-white pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {exams?.length > 0 ? (
        exams.map((exam) => (
          <Card key={exam.id} className="border-none shadow-md">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg text-foreground">
                    {exam.exam}
                  </CardTitle>
                </div>
                {exam.pdfUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 bg-transparent"
                    asChild
                  >
                    <a
                      href={exam.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Ver Resultado
                    </a>
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      Data de Realização
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(exam.dateExam)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      Laboratório
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {exam.nameLaboratory}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-muted-foreground pt-4">
          Paciente não possui exames cadastrados.
        </p>
      )}
    </div>
  );
}
