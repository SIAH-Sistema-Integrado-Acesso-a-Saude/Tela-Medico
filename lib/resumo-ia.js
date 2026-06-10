export async function resumoIA(/*prontuario*/cpf) {
//export async function resumoIA(cpf) {

    //const url = 'https://saucy-delegator-doorstop.ngrok-free.dev'; // Endpoint para POST
    const url = 'https://saucy-delegator-doorstop.ngrok-free.dev'; // Endpoint para GET

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
    };

    try {
        //const response = await fetch(url + "/SIHA/api/gemini", request);
        const response = await fetch(`${url}/api/Rag/summary/${cpf}`, request);
        const data = await response.json();
        console.log("Estrutura da resposta:", JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}