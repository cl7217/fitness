import axios from "axios";


const baseUrl = 'https://localhost:7104'


export const getPurchasesByUserId = async (user) => {
    try {
        console.log("Sending request for user:", user);
        const response = await axios.post(`${baseUrl}/api/Purchase/getByUserId`, user, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        console.log("Response from server:", response);
        
        // Transform the data to match our frontend expectations
        const transformedData = response.data.map(purchase => ({
            id: purchase.code,
            code: purchase.code,
            pointsBalance: purchase.pointsBalance,
            date: purchase.date,
            userId: purchase.userId,
            packageId: purchase.packageId,
            packageName: purchase.packageName,
            lessonName: purchase.lessonName || purchase.packageName,
            instructorName: purchase.instructorName,
            status: purchase.status
        }));
        
        return { data: transformedData, status: response.status };
    }
    catch (error) {
        console.error("Error fetching purchases:", error);
        throw error;
    }
}

export const addPurchase = async (purchase) => {
    try {
        const response = await axios.post(`${baseUrl}/api/Purchase/add`, purchase, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        return { data: response.data, status: response.status };

    }
    catch (error) {
        return error.response.status
    }
}

export const updatePurchase = async (purchase,purchaseId) => {
    try {
        const response = await axios.put(`${baseUrl}/api/Purchase/update/${purchaseId}`, purchase, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        return { data: response.data, status: response.status };

    }
    catch (error) {
        return error.response.status
    }
}
