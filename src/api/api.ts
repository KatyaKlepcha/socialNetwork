import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "66998eb2-78da-4090-8cd5-d615a3d33aa4"
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {


        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(userId: number) {
        return instance.post(`/follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`/follow/${userId}`)
    },
    getProfile(userId: string) {
        return instance.get(`/profile/` + userId)

    }
}

export const authAPI = {
    me(){
        return instance.get(`auth/me`)
    }
}



export const getUsers2 = (currentPage: number, pageSize: number) => {


    return instance.get(`follow?page=${currentPage}&count=${pageSize}`).then(response => {
        return response.data
    })
}