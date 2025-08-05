import axios from "axios";
const baseUrl = 'https://localhost:7104'

export const signIn = async (user) => {
    console.log(user);
    
    try {
        const response =
            await axios.post(`${baseUrl}/api/User/signin`,user, {
                
                
                validateStatus: (status) => {

                    return status < 500
                }
            })
             console.log( { data: response.data, status: response.status })
        return { data: response.data, status: response.status }
    } catch (err) {
        return err.response.status
    }
}

export const signUp = async (user) => {
    try {
        const response = await axios.post(`${baseUrl}/api/User/signup`, user, {
            validateStatus: (status) => {
                return status < 500
            }
        })
        return { data: response.data, status: response.status }
    } catch (err) {
        return err.response.status
    }
}
export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${baseUrl}/api/Users/UpdateUser/${id}`, user, {
            validateStatus: (status) => {
                return status < 500
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        throw error
    }
}

export const getPoints = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/Users/${userId}/points`, {
            validateStatus: (status) => status < 500
        });
        return { data: response.data, status: response.status };
    } catch (error) {
        throw error;
    }
}