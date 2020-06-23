export const handleResponse = res => res.ok ? res.json() : Promise.reject(res)

export const log = res => console.log(res) || res
