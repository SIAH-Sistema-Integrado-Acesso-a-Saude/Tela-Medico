const url = "https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api";
//const url = 'https://mulberry-carload-example.ngrok-free.dev/';

export async function listarConsultas() {
    
    const request = {
        method: "GET",
        headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/consultas`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao listar consultas:", error);
        throw error;
    }
}

export async function getConsultaPorId(id) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/consultas/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar consulta por ID:", error);
        throw error;
    }
}


export async function getConsultasPorIdUsuario(id_usuario, pesquisa) {

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
            response = await fetch(`${url}/consultas/usuario?id_usuario=${id_usuario}&pesquisa=${pesquisa}`, request);
        } else {
            response = await fetch(`${url}/consultas/usuario?id_usuario=${id_usuario}`, request);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar consulta por ID do usuário:", error);
        throw error;
    }
}

export async function criarConsulta(consulta) {

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(consulta),
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/consultas`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao criar consulta:", error);
        throw error;
    }
}

export async function atualizarConsulta(id, consulta) {

    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(consulta),
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/consultas/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao atualizar consulta:", error);
        throw error;
    }
}

export async function deletarConsulta(id) {

    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/consultas/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao deletar consulta:", error);
        throw error;
    }
}
