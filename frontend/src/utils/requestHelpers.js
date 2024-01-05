import PATHS from "./paths";
export async function makeRequest(method, path, options, headers, others) {
    if (PATHS[path] == null) {
        return Promise.reject(new Error("The path does not exist"));
    }
    switch (method) {
        case 'DELETE':
        case 'GET':
            const queryParameters = new URLSearchParams(options).toString();
            return await fetch(`${PATHS[path]}?${queryParameters}`,{
                method: method,
                headers,
                ...others,
            })
        case 'PUT':
        case 'POST':
            return await fetch(`${PATHS[path]}`,{
                method: method,
                body: JSON.stringify(options),
                headers,
                ...others,
            })
        default:
        console.log('yikes');
    }
}