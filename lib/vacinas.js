const url = "http://127.0.0.1:8000/SIHA/api";

export async function listarVacinas() {
    try {
        const response = await fetch(`${url}/vacinas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao listar vacinas:", error);
        throw error;
    }
}

export async function getVacinaPorId(id) {
    try {
        const response = await fetch(`${url}/vacinas/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar vacina:", error);
        throw error;
    }
}

export async function getVacinasPorIdUsuario(id_usuario, pesquisa) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    };

    try {
        var response;
        if (pesquisa) {
            response = await fetch(`${url}/vacinas/usuario?id_usuario=${id_usuario}&pesquisa=${pesquisa}`, request);
        } else {
            response = await fetch(`${url}/vacinas/usuario?id_usuario=${id_usuario}`, request);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar vacinas por ID do usuário:", error);
        throw error;
    }
}

export async function criarVacina(vacina) {
    try {
        const response = await fetch(`${url}/vacinas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vacina),
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar vacina:", error);
        throw error;
    }
}

export async function atualizarVacina(id, vacina) {
    try {
        const response = await fetch(`${url}/vacinas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vacina),
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao atualizar vacina:", error);
        throw error;
    }
}

export async function deletarVacina(id) {
    try {
        const response = await fetch(`${url}/vacinas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao deletar vacina:", error);
        throw error;
    }
}
