//const url = "https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api";
const url = 'https://mulberry-carload-example.ngrok-free.dev/';

export async function listarProfissionais() {
    
    const request = {
        method: "GET",
        headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/doctors`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao listar profissionais:", error);
        throw error;
    }
}

export async function getProfissionalPorId(id) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/doctors/${id}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar profissional por ID:", error);
        throw error;
    }
}

// export async function criarProfissional(profissional) {

//     const request = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         body: JSON.stringify(profissional),
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/profissionais`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao criar profissional:", error);
//         throw error;
//     }
// }

// export async function atualizarProfissional(id, profissional) {

//     const request = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         body: JSON.stringify(profissional),
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/profissionais/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao atualizar profissional:", error);
//         throw error;
//     }
// }

// export async function deletarProfissional(id) {

//     const request = {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/profissionais/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao deletar profissional:", error);
//         throw error;
//     }
// }
