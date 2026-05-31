const url = 'http://127.0.0.1:8000/SIHA/api';


export async function listarTriagens() {
    try {
        const response = await fetch(`${url}/triagens`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao listar triagens:", error);
        throw error;
    }
}


export async function getTriagemPorId(id) {
    try {
        const response = await fetch(`${url}/triagens/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar triagem:", error);
        throw error;
    }
}

export async function getTriagensPorIdUsuario(id_usuario, pesquisa) {

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
            response = await fetch(`${url}/triagens/usuario?id_usuario=${id_usuario}&pesquisa=${pesquisa}`, request);
        } else {
            response = await fetch(`${url}/triagens/usuario?id_usuario=${id_usuario}`, request);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar triagem por ID do usuário:", error);
        throw error;
    }
}


export async function criarTriagem(triagem) {
    try {
        const response = await fetch(`${url}/triagens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(triagem),
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar triagem:", error);
        throw error;
    }
}

export async function atualizarTriagem(id, triagem) {
    try {
        const response = await fetch(`${url}/triagens/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(triagem),
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao atualizar triagem:", error);
        throw error;
    }
}


export async function deletarTriagem(id) {
    try {
        const response = await fetch(`${url}/triagens/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao deletar triagem:", error);
        throw error;
    }
}
