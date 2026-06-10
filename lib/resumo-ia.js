export async function resumoIA(/*prontuario*/cpf) {
//export async function resumoIA(cpf) {


    //const url = 'https://saucy-delegator-doorstop.ngrok-free.dev'; // Endpoint para POST
    const url = 'https://localhost:7294/api'; // Endpoint para POST

    const request = {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(/*prontuario*/),
        mode: "cors"
    };

    try {
        //const response = await fetch(url + "/SIHA/api/gemini", request);
        const response = await fetch(url + "/Rag/summary/" + cpf, request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}