import axios from "axios";

const baseUrl = 'https://localhost:7104'

export const getLessons = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/Lesson/get`,{ // כתובת הפו מסי שארפ
        validateStatus: (status) => {
            return status < 500
        }
    }) // כתובת הפו מסי שארפ
    // console.log("res in service",response);
    
    return { data: response.data, status: response.status }
    } catch (err) {
        throw err
    }
}

export const getLessonById = async (LessonId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/package/GetPackageById`,LessonId,{
            validateStatus: (status) => {
                return status < 500
            }
        }) // כתובת הפו מסי שארפ
        return { data: response.data, status: response.status }

    } catch (error) {
        throw error
    }
}