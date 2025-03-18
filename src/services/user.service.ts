import { OrderModel } from "../models/order.model"
import { UserModel } from "../models/user.model"
import { StHelper } from "../utils/StorageHelper"

export class UserService {

    static retrieveUsers(): UserModel[] {
        if (!StHelper.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    firstName: 'Example',
                    lastName: 'User',
                    phone: '+3816123456789',
                    address: 'Mokroluska 14, Vozdovac',
                    favouriteDestination: 'Banja Luka',
                    password: 'user123',
                    orders: []
                }
            ]
            StHelper.setItem('users', arr);
        }

        return StHelper.getItem('users')
    }

    static createUser(model: UserModel) {
        const users = this.retrieveUsers()

        for (let u of users) {
            if (u.email === model.email)
                return false
        }

        users.push(model)
        StHelper.setItem('users', users);
        return true
    }

    static updateUser(model: UserModel) {
        const users = this.retrieveUsers()
        for (let u of users) {
            if (u.email === model.email) {
                u.firstName = model.firstName
                u.lastName = model.lastName
                u.address = model.address
                u.phone = model.phone
                u.favouriteDestination = model.favouriteDestination
            }
        }

        localStorage.setItem('users', JSON.stringify(users))
    }

    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                StHelper.setItem('active', user.email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): UserModel | null {
        if (!StHelper.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == StHelper.getItem('active')) {
                return user
            }
        }

        return null
    }

    static createOrder(order: OrderModel) {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == StHelper.getItem('active')) {
                user.orders.push(order)
                StHelper.setItem('users', arr)
                return true
            }
        }

        return false
    }

    static changeOrderStatus(state: 'ordered' | 'paid' | 'canceled', id: number) {
        const active = this.getActiveUser()
        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let order of user.orders) {
                        if (order.id == id) {
                            order.status = state
                        }
                    }
                    StHelper.setItem('users', arr)
                    return true
                }
            }
        }
        return false
    }

    static changeRating(r: boolean, id: number) {
        const active = this.getActiveUser()
        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let order of user.orders) {
                        if (order.id == id && order.status == 'paid') {
                            order.rating = r
                        }
                    }
                    StHelper.setItem('users', arr)
                    return true
                }
            }
        }
        return false
    }

    static changePassword(newPassword: string): boolean {

        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == StHelper.getItem('active')) {
                user.password = newPassword
                StHelper.setItem('users', arr)
                return true
            }
        }

        return false
    }
}
