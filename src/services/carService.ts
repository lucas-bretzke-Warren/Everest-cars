import { ICar } from '@/types'
import { http } from './config'

export default {
    get: async () => {
        const response = await http.get<ICar[]>(`/cars`)
        return response?.data
    },
    delete: async (id: string) => {
        return http.delete(`/cars/${id}`)
    },
    post: async (request: ICar) => {
        const response = await http.post<ICar>("/cars/", request)
        return response?.data
    },
    put: async (request: ICar) => {
        const response = await http.put<ICar>(`/cars/${request.id}`, request)
        return response?.data
    }
}