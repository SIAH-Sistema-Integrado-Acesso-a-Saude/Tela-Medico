//const url = "https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api";
const url = 'https://mulberry-carload-example.ngrok-free.dev/api';


// export async function listarVacinas() {
//     try {
//         const response = await fetch(`${url}/vacinas`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "69420"
//             },
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao listar vacinas:", error);
//         throw error;
//     }
// }

// export async function getVacinaPorId(id) {
//     try {
//         const response = await fetch(`${url}/vacinas/${id}`, {
//             method: "GET",
//             headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//             },
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao buscar vacina:", error);
//         throw error;
//     }
// }

export async function getVacinasPorCPF(cpf, pesquisa) {

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
            //response = await fetch(`${url}/vacinas/usuario?id_usuario=${id_usuario}&pesquisa=${pesquisa}`, request);
            response = await fetch(`${url}/vacinas?cpf=${cpf}&pesquisa=${pesquisa}`, request);
        } else {
            //response = await fetch(`${url}/vacinas/usuario?cpf=${cpf}`, request);
            response = await fetch(`${url}/vacinas?cpf=${cpf}`, request);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar vacinas por CPF:", error);
        throw error;
    }
}

export async function criarVacina(vacina) {
    try {
        const response = await fetch(`${url}/vacinas`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
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

// export async function atualizarVacina(id, vacina) {
//     try {
//         const response = await fetch(`${url}/vacinas/${id}`, {
//             method: "PUT",
//             headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//             },
//             body: JSON.stringify(vacina),
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao atualizar vacina:", error);
//         throw error;
//     }
// }

// export async function deletarVacina(id) {
//     try {
//         const response = await fetch(`${url}/vacinas/${id}`, {
//             method: "DELETE",
//             headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//             },
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao deletar vacina:", error);
//         throw error;
//     }
// }
