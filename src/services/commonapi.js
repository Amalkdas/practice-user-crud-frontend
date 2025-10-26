import axios from "axios";
import { data } from "react-router-dom";

export const commonapi = async(httprequest,url,reqbody)=>{
    const config ={
        method:httprequest,
        url,
        data:reqbody,
        validatestatus:(status)=>{
            return status < 500
        }
    }


    return await axios(config).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}