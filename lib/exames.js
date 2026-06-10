const url = "https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api";
//const url = 'https://mulberry-carload-example.ngrok-free.dev/';


export async function listarExames() {
    try {
        const response = await fetch(`${url}/exames`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao listar exames:", error);
        throw error;
    }
}

export async function getExamePorId(id) {
    try {
        const response = await fetch(`${url}/exames/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar exame:", error);
        throw error;
    }
}

export async function getExamesPorIdUsuario(id_usuario, pesquisa) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        var response;
        if (pesquisa) {
            response = await fetch(`${url}/exames/usuario?id_usuario=${id_usuario}&pesquisa=${pesquisa}`, request);
        } else {
            response = await fetch(`${url}/exames/usuario?id_usuario=${id_usuario}`, request);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar exames por ID do usuário:", error);
        throw error;
    }
}

export async function criarExame(exame) {
    try {
        const response = await fetch(`${url}/exames`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify(exame),
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar exame:", error);
        throw error;
    }
}

export async function atualizarExame(id, exame) {
    try {
        const response = await fetch(`${url}/exames/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify(exame),
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao atualizar exame:", error);
        throw error;
    }
}

export async function deletarExame(id) {
    try {
        const response = await fetch(`${url}/exames/${id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao deletar exame:", error);
        throw error;
    }
}
