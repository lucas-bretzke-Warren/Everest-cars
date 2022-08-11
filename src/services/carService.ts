import { IReturnUpdateCar, ICar } from '@/types'
import { http } from './config'

export default {
    get: async () => {
        const response = await http.get<ICar[]>(`/cars`)
        return response?.data
    },
    delete: async (id: number) => {
        return http.delete(`/cars/${id}`)
    },
    post: async (car: ICar) => {
        return http.post<ICar>("/cars/", car)
    },
    put: async ({ id, car }: IReturnUpdateCar) => {
        return http.put<ICar>(`/cars/${id}`, car)
    }
}