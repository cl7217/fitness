import axios from "axios";

const baseUrl = 'https://localhost:7104'

export const getRentals = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/Rental/get`,{ // כתובת הפו מסי שארפ
        validateStatus: (status) => {
            return status < 500
        }
    }) // כתובת הפו מסי שארפ
    
    return { data: response.data, status: response.status }
    } catch (err) {
        throw err
    }
}

export const updateRental = async (rentalId,rental) => {
    try {
        const response = await axios.get(`${baseUrl}/api/Rental/update/${rentalId}`,rental,{ // כתובת הפו מסי שארפ
        validateStatus: (status) => {
            return status < 500
        }
    }) // כתובת הפו מסי שארפ
    
    return { data: response.data, status: response.status }
    } catch (err) {
        throw err
    }
}

export const addRental = async (rental) => {
    try {
        const response = await axios.get(`${baseUrl}/api/Rental/add`,rental,{ // כתובת הפו מסי שארפ
        validateStatus: (status) => {
            return status < 500
        }
    }) // כתובת הפו מסי שארפ
    
    return { data: response.data, status: response.status }
    } catch (err) {
        throw err
    }
}
