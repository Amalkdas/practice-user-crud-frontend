


import { commonapi } from "./commonapi.js"
import { serverurl } from "./serverurl.js"


// allapis


export const adddetailsapi = async(reqbody)=>{
    return await commonapi('POST',`${serverurl}/adddetails`,reqbody)
}

// get   


export const getdetailsapi = async(reqbody)=>{
    return await commonapi('GET',`${serverurl}/getdetails`,reqbody)
}

export const deletedetailsapi=async(id)=>{
    return await commonapi('DELETE',`${serverurl}/deletepath/${id}`)
}

// get specific

export const getspecificdetailsapi = async(id)=>{
    return await commonapi('GET',`${serverurl}/getspecificpath/${id}`)
}

// updateMany



export const updateapi =async(id,reqbody)=>{
    return await commonapi('PUT',`${serverurl}/updatepath/${id}`,reqbody)
}
// 
