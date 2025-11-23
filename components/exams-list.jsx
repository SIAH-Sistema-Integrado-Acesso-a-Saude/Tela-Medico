"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Building2, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { criarExame } from "@/lib/exames"

export function ExamsList({ patient, exams, reloadExams }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    id_usuario: patient.id,
    tipo_exame: "",
    data_realizacao: "",
    resultado_link: "",
    nome_laboratorio: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await criarExame(formData)

      // Reset form
      setFormData({
        id_usuario: patient.id,
        tipo_exame: "",
        data_realizacao: "",
        resultado_link: "",
        nome_laboratorio: "",
      })

      await reloadExams();

      setIsDialogOpen(false)

    } catch (error) {
      console.error("Erro ao cadastrar exame:", error)
      alert("Erro ao cadastrar exame. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white border-b border-cyan-500">
              Adicionar +
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Exame</DialogTitle>
              <DialogDescription>Preencha os dados do exame realizado pelo paciente.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipo_exame">Tipo de Exame *</Label>
                  <Input
                    id="tipo_exame"
                    name="tipo_exame"
                    value={formData.tipo_exame}
                    onChange={handleInputChange}
                    placeholder="Ex: Radiografia, Hemograma, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data_realizacao">Data de Realização *</Label>
                  <Input
                    id="data_realizacao"
                    name="data_realizacao"
                    type="datetime-local"
                    value={formData.data_realizacao}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome_laboratorio">Nome do Laboratório *</Label>
                  <Input
                    id="nome_laboratorio"
                    name="nome_laboratorio"
                    value={formData.nome_laboratorio}
                    onChange={handleInputChange}
                    placeholder="Ex: Laboratório Santa Tereza"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultado_link">Link do Resultado (Opcional)</Label>
                  <Input
                    id="resultado_link"
                    name="resultado_link"
                    type="url"
                    value={formData.resultado_link}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/resultado.pdf"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Exame"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {exams?.length > 0 ? (
        exams.map((exam) => (
          <Card key={exam.id} className="border-none shadow-md">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg text-foreground">{exam.tipo_exame}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="ml-2 bg-transparent" asChild>
                  <a href={exam.resultado_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Ver Resultado
                  </a>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Data de Realização</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(exam.data_realizacao)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Laboratório</p>
                    <p className="text-sm font-medium text-foreground">{exam.nome_laboratorio}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-xm text-muted-foreground pt-4">Paciente não possui exames cadastrados.</p>
      )}
    </div>
  )
}
