import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
    // fetch accepts an options obj as the 2 arg
    // used to include a data payload, set headers, etc
    const options = {method};
    if (payload) {
        options.headers = {"Content-Type": "application/json"};
        options.body = JSON.stringify(payload)
    }
    const token = getToken();
    if (token) {
        // ensure the headers obj exists
        options.headers = options.headers || {}
        // add token to an Authorization header
        // Prefacing with 'Bearer ; is recommended in the HTTP specifications
        options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    // res.ok will be false if status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error("Bad Request")
}