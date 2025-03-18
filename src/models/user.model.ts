import { OrderModel } from "./order.model"

export interface UserModel {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    favouriteDestination: string // zameni necim
    password: string
    orders: OrderModel[]
}

