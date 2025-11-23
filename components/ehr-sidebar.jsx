"use client"

import { Button } from "@/components/ui/button"
import { User, FileText, Activity, FlaskConical, Syringe, Heart } from "lucide-react"

export function EHRSidebar({ activeSection, onSectionChange }) {
  const menuItems = [
    { id: "patient", label: "Paciente", icon: User },
    { id: "consultations", label: "Consultas", icon: FileText },
    { id: "triage", label: "Triagem", icon: Activity },
    { id: "exams", label: "Exames", icon: FlaskConical },
    { id: "vaccines", label: "Vacinas", icon: Syringe },
  ]

  return (
    <aside className="w-50 bg-sidebar border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <img src="/Logo_SIAH.png" alt="LOGO SIAH" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-foreground">SIAH</h1>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">Sistema de Prontuário Eletrônico</p>
      </div>
    </aside>
  )
}
