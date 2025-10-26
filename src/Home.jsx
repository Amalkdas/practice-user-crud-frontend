import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { adddetailsapi } from "./services/allapi";
import { Link } from "react-router-dom";
adddetailsapi
Link

function Home() {
  const [userdetails, setuserdetails] = useState({
    name: "",
    gender: "",
    age: "",
    image: "",
  });

  const [preview, setpreview] = useState("");

  const handleupload = async (e) => {
    console.log(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);
setuserdetails({...userdetails,image : e.target.files[0]})
    setpreview(url);
  };

  const reset=()=>{
    setuserdetails({...userdetails,
      name:'',
      age:'',
      gender:'',
      image:''
    })
    setpreview("")
  }

  const submit = async () => {
    const { name, gender, age, image } = userdetails;

    if (!name || !gender || !age || !image) {
      toast.warn("Please Fill all Fields");
    } else {

      const reqbody = new FormData()

      for (let key in userdetails){

        reqbody.append(key,userdetails[key])
      }
      try {

        const res = await adddetailsapi(reqbody)
        console.log(res);

        if(res.status===200){
          toast.success("Successfully added")

          setuserdetails({...userdetails,
            name:"",
            age:"",
            gender:"",
            image:""
          })
          setpreview("")
        }
        else if(res.status===402){
          toast.error("User already Exists")
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
  };

  return (
    <>
      <div className="grid-cols-3-[3fr_3fr_3fr] flex w-full py-20">
        <div className="w-[33.3%]"></div>
        <div className="bg-red shadow-lg w-[33.3%] p-10 flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-3  rounded bg-gray-100"
            onChange={(e) =>
              setuserdetails({ ...userdetails, name: e.target.value })
            }
            value={userdetails?.name}
          />
          <input
            type="text"
            placeholder="Gender"
            onChange={(e) =>
              setuserdetails({ ...userdetails, gender: e.target.value })
            }
            value={userdetails?.gender}
            className="px-4 py-3   rounded mt-4 bg-gray-100"
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) =>
              setuserdetails({ ...userdetails, age: e.target.value })
            }

            value={userdetails?.age}
            className="px-4 py-3   rounded mt-4 bg-gray-100"
          />

          {
            preview ? <>
            <img src={preview} className="mt-6 object-cover" alt="" /></>: <>
            <input
            type="file"
            onChange={(e) => handleupload(e)}
            id="upload"
            style={{ display: "none" }}
          />
          <label htmlFor="upload">
            <img
              style={{ height: "100px", width: "100px" }}
              className="mx-auto mt-4"
              src="https://t3.ftcdn.net/jpg/14/54/72/22/360_F_1454722299_cKLpbqWOKNt2sfT3z7vVFim49esoNAeT.jpg"
              alt=""
            />
          </label>
            </>
          }
          
          <div className="w-full flex justify-center gap-4 mt-5">
            <button onClick={submit} className="bg-blue-500 text-white px-6 py-3 rounded">
              Submit
            </button>
            <button onClick={reset} className="bg-red-500 text-white px-6 py-3 rounded">
              Reset
            </button>
          </div>

         
        </div>
        <div className="w-[33.3%] flex justify-center items-center">
          <Link  to={"/display"}>          <button className="bg-blue-500 px-5 py-3 text-white rounded">Display page</button>
 </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
