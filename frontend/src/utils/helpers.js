export function defaultSolveException(response) {
    response.json().then(result => alert(result.error))
                    .catch(e => alert(e))
}
export function timeStampToDate(time) {
    const date = new Date(time);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}