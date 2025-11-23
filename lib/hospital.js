const url = "http://127.0.0.1:8000/SIHA/api";

export async function listarHospitais() {
    
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/hospitais`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao listar hospitais:", error);
        throw error;
    }
}

export async function getHospitalPorId(id) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/hospitais/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar hospital por ID:", error);
        throw error;
    }
}

export async function criarHospital(hospital) {

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hospital),
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/hospitais`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao criar hospital:", error);
        throw error;
    }
}

export async function atualizarHospital(id, hospital) {

    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hospital),
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/hospitais/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao atualizar hospital:", error);
        throw error;
    }
}

export async function deletarHospital(id) {

    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/hospitais/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao deletar hospital:", error);
        throw error;
    }
}
