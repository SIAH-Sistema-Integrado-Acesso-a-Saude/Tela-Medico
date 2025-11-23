const url = 'http://127.0.0.1:8000/SIHA/api';

export async function getUsuarioPorCPF(cpf) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/usuarios/cpf/${cpf}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar usuário por CPF:", error);
        throw error;
    }
}


export async function getUsuarioPorId(id) {
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/usuarios?id=${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        throw error;
    }
}
