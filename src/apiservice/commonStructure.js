import axios from "axios";

export const commonApi=async(method,url,data)=>{
    let reqConfig={
        method,
        url,
        data
    }
    return await axios(reqConfig)
    .then(out=>{return out})
    .catch(out=>{return out})
}