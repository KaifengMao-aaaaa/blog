import PATHS from "./paths";
const backendAddress = 'http://localhost:4001';
export async function makeRequest(method, path, options, headers, others) {
    if (PATHS[path] == null) {
        return Promise.reject(new Error("The path does not exist"));
    }
    switch (method) {
        case 'GET' || 'DELETE':
            const queryParameters = new URLSearchParams(options).toString();
            return await fetch(`${backendAddress}${PATHS[path]}?${queryParameters}`,{
                method: 'GET',
                headers,
                ...others,
            })
        case 'POST' || 'PUT':
            return await fetch(`${backendAddress}${PATHS[path]}`,{
                method: 'POST',
                body: JSON.stringify(options),
                headers,
                ...others,
            })
        default:
        console.log('yikes');
    }
}