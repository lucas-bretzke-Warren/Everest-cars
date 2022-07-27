import { http } from './config'

export default {
    get: () => {
        return http.get()
    },
    deletar: (id) => {
        return http.delete(`/${id}`)
    },
    post: (car) => {
        return http.post("/", car)
    },
    put: (car, id) => {
        return http.put(`/${id}`, car)
    }
}