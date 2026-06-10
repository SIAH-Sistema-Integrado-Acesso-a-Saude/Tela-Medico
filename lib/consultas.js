//const url = "https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api";
const url = 'https://mulberry-carload-example.ngrok-free.dev';

export async function getConsultasPorCPF(cpf, pesquisa) {

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
            response = await fetch(`${url}/Consultations?cpf=${cpf}&pesquisa=${pesquisa}`, request);
        } else {
            response = await fetch(`${url}/Consultations?cpf=${cpf}`, request);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar consulta por ID do usuário:", error);
        throw error;
    }
}

export async function criarConsulta(consulta, cpf) {

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
        const response = await fetch(`${url}/Consultations`, request);
        const data = await response.json();

        //Caso a consulta seja criada com sucesso, busca o ticket do paciente e finaliza para liberar a fila
        const ticketResult = await buscarTicket(cpf);
        if (ticketResult.status === 200) {
            await finalizarTicket(ticketResult.data.ticketId);
        }

        return data;
    } catch (error) {
        console.error("Erro ao criar consulta:", error);
        throw error;
    }
}

export async function buscarTicket(cpf) {

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/queue/my-ticket?cpf=${cpf}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar ticket:", error);
        throw error;
    }
}

export async function finalizarTicket(ticketId) {

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/queue/finish/${ticketId}`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao finalizar ticket:", error);
        throw error;
    }
}






// export async function listarConsultas() {
    
//     const request = {
//         method: "GET",
//         headers: {
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "69420"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/consultas`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao listar consultas:", error);
//         throw error;
//     }
// }

// export async function getConsultaPorId(id) {

//     const request = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/consultas/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao buscar consulta por ID:", error);
//         throw error;
//     }
// }




// export async function atualizarConsulta(id, consulta) {

//     const request = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         body: JSON.stringify(consulta),
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/consultas/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao atualizar consulta:", error);
//         throw error;
//     }
// }

// export async function deletarConsulta(id) {

//     const request = {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/consultas/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao deletar consulta:", error);
//         throw error;
//     }
// }
