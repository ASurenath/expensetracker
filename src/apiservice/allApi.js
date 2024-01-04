import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonStructure"

/////__________________finances____________________//////
/// get all finances
export const getFinancesApi=async()=>{
    return await commonApi('GET',`${BASE_URL}/finances?_sort=id&_order=desc`,{})
}
export const getFinancesExpandApi=async()=>{
    return await commonApi('GET',`${BASE_URL}/finances?_expand=category&_sort=id&_order=desc`,{})
}

//finance add
export const addFinanceApi=async(bodyData)=>{
    return await commonApi('POST',`${BASE_URL}/finances`,bodyData)
}
//finance delete
export const deleteFinanceApi=async(id)=>{
    return await commonApi('DELETE',`${BASE_URL}/finances/${id}`,{})
}
/////__________________categories____________________//////

//get categs
export const getCategsApi=async(bodyData)=>{
    return await commonApi('GET',`${BASE_URL}/categories`,{})
}

//category add
export const addCategApi=async(bodyData)=>{
    return await commonApi('POST',`${BASE_URL}/categories`,bodyData)
}

//get income categs
export const getIncomeCategsApi=async(bodyData)=>{
    return await commonApi('GET',`${BASE_URL}/categories?type=income`,{})
}
//get expense categs
export const getExpenseCategsApi=async(bodyData)=>{
    return await commonApi('GET',`${BASE_URL}/categories?type=expense`,{})
}
export const getCategoriesEmbedApi=async()=>{
    return await commonApi('GET',`${BASE_URL}/categories?_embed=finances`,{})
}

////delete category
export const deleteCategApi=async(id)=>{
    return await commonApi('DELETE',`${BASE_URL}/categories/${id}`,{})
}