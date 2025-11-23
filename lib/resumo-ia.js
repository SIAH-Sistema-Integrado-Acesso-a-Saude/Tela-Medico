export async function resumoIA(prontuario) {
    const url = 'http://127.0.0.1:8000'; // Endpoint para POST

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prontuario),
        mode: "cors"
    };

    try {
        const response = await fetch(url + "/SIHA/api/gemini", request);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        throw error;
    }
}