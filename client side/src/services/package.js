import axios from "axios";

const baseUrl = 'https://localhost:7104'

export const getPackages = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/Package/get`,{ // כתובת הפו מסי שארפ
        validateStatus: (status) => {
            return status < 500
        }
    }) // כתובת הפו מסי שארפ
    return { data: response.data, status: response.status }
    } catch (err) {
        throw err
    }
}

export const getPackageById = async (packageId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/Package/GetPackageById`,packageId,{
            validateStatus: (status) => {
                return status < 500
            }
        }) // כתובת הפו מסי שארפ
        return { data: response.data, status: response.status }

    } catch (error) {
        throw error
    }
}