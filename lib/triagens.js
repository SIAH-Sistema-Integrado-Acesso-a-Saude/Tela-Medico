//const url = 'https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api';
const url = 'https://mulberry-carload-example.ngrok-free.dev/';

export async function getTriagensPorCPF(cpf, pesquisa) {

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
            //response = await fetch(`${url}/triagens/usuario?id_usuario=${id_usuario}&pesquisa=${pesquisa}`, request);
            response = await fetch(`${url}/Screenings?cpf=${cpf}&pesquisa=${pesquisa}`, request);
        } else {
            response = await fetch(`${url}/Screenings?cpf=${cpf}`, request);
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
        const response = await fetch(`${url}/Screenings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
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


// export async function listarTriagens() {
//     try {
//         const response = await fetch(`${url}/triagens`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "69420"
//             },
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao listar triagens:", error);
//         throw error;
//     }
// }


// export async function getTriagemPorId(id) {
//     try {
//         const response = await fetch(`${url}/triagens/${id}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "69420"
//             },
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao buscar triagem:", error);
//         throw error;
//     }
// }



// export async function atualizarTriagem(id, triagem) {
//     try {
//         const response = await fetch(`${url}/triagens/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "69420"
//             },
//             body: JSON.stringify(triagem),
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao atualizar triagem:", error);
//         throw error;
//     }
// }


// export async function deletarTriagem(id) {
//     try {
//         const response = await fetch(`${url}/triagens/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "ngrok-skip-browser-warning": "69420"
//             },
//             mode: "cors"
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Erro ao deletar triagem:", error);
//         throw error;
//     }
// }
