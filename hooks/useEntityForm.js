// hooks/useEntityForm.js
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useEntityForm({ initialValues, onSubmit, onSuccess }) {
  const [formData, setFormData] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData(initialValues);
      toast({ title: "Sucesso!", description: "Registro salvo com sucesso." });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro",
        description: "Não foi possível salvar. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isSubmitting,
  };
}