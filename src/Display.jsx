import React, { useEffect, useState } from "react";
import {
  deletedetailsapi,
  getdetailsapi,
  getspecificdetailsapi,
  updateapi,
} from "./services/allapi";
import { serverurl } from "./services/serverurl";
deletedetailsapi;
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
Link;
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
getspecificdetailsapi;
updateapi

useState;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "",
  boxShadow: 24,
  p: 4,
};

function Display() {
  const [preview, setpreview] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id,setid]= useState("")

  const getdetails = async () => {
    try {
      const res = await getdetailsapi();
      console.log(res);
      if (res.status == 200) {
        setdetails(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [formodal, setformdal] = useState({
    name: "",
    gender: "",
    age: "",
    image: "",
  });

  const getspecificdetails = async (id) => {
    try {
      const res = await getspecificdetailsapi(id);
      console.log(res);

      setformdal({
        ...formodal,

        name: res.data.name,
        gender: res.data.gender,
        age: res.data.age,
        image: res.data.img,
      });

      setid(res.data._id)
    } catch (err) {
      console.log(err);
    }
  };

  const [details, setdetails] = useState([]);

  useEffect(() => {
    getdetails();
  }, []);

  useEffect(() => {
    getspecificdetails();
  }, []);

  const deletedetails = async (id) => {
    console.log(id);

    const res = await deletedetailsapi(id);
    console.log(res);

    if (res.status == 200) {
      toast.success("Successflly deleted");
      getdetails();
    } else {
      toast.error("Soemthing went wrong");
    }
  };
  const handleupload = (e) => {
    console.log(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);

    setpreview(url);
    setformdal({ ...formodal, image: e.target.files[0] });
  };


  const submitdetails =async()=>{


    const reqbody = new FormData()

    for(let key in formodal){
      reqbody.append(key,formodal[key])
    }

    try{

      if(preview){

          const res = await updateapi(id,reqbody)
      console.log(res);

      
      if(res.status==200){
        toast.success("Updated Successfully")
        handleClose()
        setid("")
        getspecificdetails()
        getdetails()
      }
      else{
        toast.error("Something went wrong")
      }

      }

      else{

        const res =  await updateapi(id,{name : formodal.name , gender : formodal.gender , age : formodal.age  , image : formodal.image})

console.log(res);

        if(res.status==200){
        toast.success("Updated Successfully")
        handleClose()
        setid("")
      }
      else{
        toast.error("Something went wrong")
      }
      }

    

      

    }
    catch(err){

    }

  }

  const cancel = () => {
    handleClose();
    setpreview("")
    setid("")
  };
  return (
    <>
      <div className=" p-30 flex flex-wrap gap-10 justify-center">
        {details?.length > 0 ? (
          details.map((item, index) => {
            return (
              <div className="relative gap-10 border p-20 shadow-lg flex">
                <img
                  src={`${serverurl}/imagepath/${item.img}`}
                  className="rounded-full object-cover"
                  style={{ height: "200px", width: "200px" }}
                  alt=""
                />
                <div className="flex  gap-4 flex-col ">
                  <h1 className="flex items-center  w-90">
                    <span className="w-20">Name : </span>{" "}
                    <input
                      type="text"
                      className="bg-gray-100 flex-grow py-3 px-4 rounded ml-4"
                      value={item?.name}
                    />
                  </h1>
                  <h1 className="flex items-center  w-90">
                    <span className="w-20">Gender : </span>{" "}
                    <input
                      type="text"
                      className="bg-gray-100 py-3 px-4 flex-grow rounded ml-4 "
                      value={item?.gender}
                    />
                  </h1>
                  <h1 className="flex items-center  w-90">
                    <span className="w-20">Age : </span>{" "}
                    <input
                      type="text"
                      className="bg-gray-100 py-3 px-4 flex-grow rounded ml-4 "
                      value={item?.age}
                    />
                  </h1>

                  <div className="flex gap-5 mt-5 ">
                    <button
                      onClick={() => {
                        handleOpen();
                        getspecificdetails(item?._id);
                      }}
                      className="bg-blue-500 rounded px-8 py-2 text-white"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => deletedetails(item?._id)}
                      className="bg-red-500 rounded px-8 py-2 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center mx-auto">
            <p>NO details</p>

            <Link to={"/"}>
              {" "}
              <button className="bg-blue-600 rounded  mt-5 text-white px-6 py-3">
                Back to home page
              </button>
            </Link>
          </div>
        )}

        {/* modal */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col gap-6">
              <input
                type="text"
                value={formodal?.name}
                onChange={(e) =>
                  setformdal({ ...formodal, name: e.target.value })
                }
                className="bg-gray-200 rounded px-4 py-3"
              />
              <input
                type="text"
                value={formodal?.gender}
                onChange={(e) =>
                  setformdal({ ...formodal, gender: e.target.value })
                }
                className="bg-gray-200 rounded px-4 py-3"
              />
              <input
                type="text"
                value={formodal?.age}
                onChange={(e) =>
                  setformdal({ ...formodal, age: e.target.value })
                }
                className="bg-gray-200 rounded px-4 py-3"
              />{


                preview ? 

                <>
                
                <img src={preview} className="w-full object-cover"
                  style={{ height: "200px" }} alt="" /></> :  <>


                  <input
                type="file"
                onChange={(e) => handleupload(e)}
                id="updateimg"
                style={{ display: "none" }}
              />
              <label htmlFor="updateimg" id="">
                {" "}
                <img
                  src={`${serverurl}/imagepath/${formodal?.image}`}
                  className="w-full object-cover"
                  style={{ height: "200px" }}
                  alt=""
                />
              </label>
                  
                  
                  
                  </>
              }
              

              <div className="flex justify-center gap-4">
                <button onClick={()=>submitdetails(formodal?._id)} className="bg-blue-500 text-white rounded px-6 py-3">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white rounded px-6 py-3"
                  onClick={cancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Display;
