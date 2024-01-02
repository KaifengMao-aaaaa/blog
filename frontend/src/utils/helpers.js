export function defaultSolveException(response) {
    response.json().then(result => alert(result.error))
                    .catch(e => alert(e))
}
