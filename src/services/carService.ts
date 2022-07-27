import { IReturnUpdateCar, Items } from '@/types'
import { http } from './config'

export default {
    get: () => {
        return http.get(`/cars`)
    },
    delete: (id: number) => {
        return http.delete(`/cars/${id}`)
    },
    post: (car: Items) => {
        return http.post("/cars/", car)
    },
    put: ({ id, car }: IReturnUpdateCar) => {
        return http.put(`/cars/${id}`, car)
    }
}