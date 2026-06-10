//const url = "https://saucy-delegator-doorstop.ngrok-free.dev/SIHA/api";
const url = 'https://mulberry-carload-example.ngrok-free.dev';


export async function listarHospitais() {
    
    const request = {
        method: "GET",
        headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
        },
        mode: "cors"
    };

    try {
        const response = await fetch(`${url}/Hospitals`, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao listar hospitais:", error);
        throw error;
    }
}


//Não Existem

// export async function getHospitalPorId(id) {

//     const request = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/Hospitals/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao buscar hospital por ID:", error);
//         throw error;
//     }
// }

// export async function criarHospital(hospital) {

//     const request = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         body: JSON.stringify(hospital),
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/hospitais`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao criar hospital:", error);
//         throw error;
//     }
// }

// export async function atualizarHospital(id, hospital) {

//     const request = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         body: JSON.stringify(hospital),
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/hospitais/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao atualizar hospital:", error);
//         throw error;
//     }
// }

// export async function deletarHospital(id) {

//     const request = {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420"
//         },
//         mode: "cors"
//     };

//     try {
//         const response = await fetch(`${url}/hospitais/${id}`, request);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erro ao deletar hospital:", error);
//         throw error;
//     }
// }
