// hooks/usePatientData.js
import { useState, useEffect, useCallback } from "react";
import { getUsuarioPorCPF } from "@/lib/usuarios";
import { getConsultasPorIdUsuario } from "@/lib/consultas";
import { getTriagensPorIdUsuario } from "@/lib/triagens";
import { getExamesPorIdUsuario } from "@/lib/exames";
import { getVacinasPorIdUsuario } from "@/lib/vacinas";

export function usePatientData(cpf) {
  const [patient, setPatient] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [triagens, setTriagens] = useState([]);
  const [exames, setExames] = useState([]);
  const [vacinas, setVacinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cpf) return;
    setLoading(true);
    setError(null);

    getUsuarioPorCPF(cpf)
      .then((user) => {
        setPatient(user);
        // Todos os fetches em paralelo — não espera um terminar para iniciar o próximo
        return Promise.all([
          getConsultasPorIdUsuario(user.id),
          getTriagensPorCPF(user.cpf),
          getExamesPorIdUsuario(user.id),
          getVacinasPorCPF(user.cpf),
          // getConsultasPorIdUsuario(user.cpf),
          // getTriagensPorIdUsuario(user.cpf),
          // getExamesPorIdUsuario(user.cpf),
          // getVacinasPorIdUsuario(user.cpf),
        ]);
      })
      .then(([c, t, e, v]) => {
        setConsultas(c);
        setTriagens(t);
        setExames(e);
        setVacinas(v);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [cpf]);

  // useCallback garante que as funções de reload não mudam de referência
  // a cada render, evitando re-renders desnecessários nos filhos
const reloadConsultas = useCallback(async (pesquisa = "") => {
  if (!patient?.id) return;
  setConsultas(await getConsultasPorIdUsuario(patient.id, pesquisa));
}, [patient?.id]);

  const reloadTriagens = useCallback(async (pesquisa = "") => {
    if (!patient?.id) return;
    setTriagens(await getTriagensPorCPF(patient.cpf, pesquisa));
  }, [patient?.id]);

  const reloadExames = useCallback(async (pesquisa = "") => {
    if (!patient?.id) return;
    setExames(await getExamesPorIdUsuario(patient.id, pesquisa));
  }, [patient?.id]);

  const reloadVacinas = useCallback(async (pesquisa = "") => {
    if (!patient?.id) return;
    setVacinas(await getVacinasPorCPF(patient.cpf, pesquisa));
  }, [patient?.id]);

  return {
    patient,
    consultas,
    triagens,
    exames,
    vacinas,
    loading,
    error,
    reloadConsultas,
    reloadTriagens,
    reloadExames,
    reloadVacinas,
  };
}