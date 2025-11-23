"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function EHRHeader({ patient }) {
  const handleExport = () => {
    alert("Funcionalidade de exportação em desenvolvimento")
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/10">
            <AvatarImage src={patient.foto_rosto_link || "/placeholder.svg"} alt={patient.nome} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {patient.nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{patient.nome}</h2>
            <p className="text-sm text-muted-foreground">CPF: {patient.cpf}</p>
          </div>
        </div>

        <Button variant="outline" onClick={handleExport} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exportar Prontuário
        </Button>
      </div>
    </header>
  )
}
