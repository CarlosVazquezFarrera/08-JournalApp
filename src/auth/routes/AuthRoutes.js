export const parentAuthPath = 'auth'

export const authRoutes = {
    login: 'login',
    register: 'register'
}

export const authRoute= (route)=> {
    return `/${parentAuthPath}/${route}`;
}