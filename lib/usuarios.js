//const url = 'https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api';
const url = 'https://mulberry-carload-example.ngrok-free.dev';

export async function getUsuarioPorCPF(cpf) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true'
        },
        mode: "cors"
    };

    try {
        //const response = await fetch(`${url}/usuarios/cpf/${cpf}`, request);
        const response = await fetch(`${url}/Pacient/${cpf}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar usuário por CPF:", error);
        throw error;
    }
}


// export async function getUsuarioPorId(id) {
//     const request = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420",
//             "ngrok-agent-ips": "2804:1254:20a3:f800:dc96:344b:cf35:4c1c"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/Pacient/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao buscar usuário por ID:", error);
//         throw error;
//     }
// }
