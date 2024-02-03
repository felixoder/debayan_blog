import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import { updateStart , updateSuccess , updateFailure , deleteUserStart , deleteUserSuccess , deleteUserFailure } from "../redux/user/userSlice.js";
import {HiOutlineExclamationCircle} from 'react-icons/hi'


export default function DashProfile() {
  const { currentUser , error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const[updateUserSuccess , setUpdateUserSuccess] = useState(null)
  const [updateUserError , setUpdateUserError] = useState(null)
  const [formData, setFormData] = useState({});
  const [showModel , setShowModel] = useState(false)

  const filePickerRef = useRef();
  const dispatch = useDispatch()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false)
        });
      }
    );
  };
const handleChange =(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
}

const handleSubmit = async (e) => {
  setUpdateUserError(null)
  setUpdateUserSuccess(null)
  e.preventDefault();
 
  if (Object.keys(formData).length === 0) {
   setUpdateUserError('No changes are made')
    return;
  }
  if(imageFileUploading){
    setUpdateUserError('Please wait for image to upload')
    return
  }
 
  try {
    dispatch(updateStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      dispatch(updateFailure(data.message));
      setUpdateUserError(data.message)
   
    } else {
      dispatch(updateSuccess(data));
      setUpdateUserSuccess('Users profile is updated successfully')
      
    }
  } catch (error) {
    dispatch(updateFailure(error.message));
    setUpdateUserError(error.message)
    
  }
};

const handleDeleteUser=async ()=>{
  setShowModel(false);
  try {
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',

    })
    const data = await res.json();
    if(!res.ok){
      dispatch(deleteUserFailure(data.message));
    }
    else{
      dispatch(deleteUserSuccess(data))
    }
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
    
  }

}
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgb(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModel(true)} className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign-Out</span>
      </div>
      {updateUserSuccess &&(
        <Alert color='success' className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}{updateUserError &&(
        <Alert color='failure' className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error &&(
        <Alert color='failure' className="mt-5">
          {error}
        </Alert>
      )}
      <Modal show={showModel} onClose={()=> setShowModel(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-grey-500 dark:text-grey-400">Are You sure you want to delete your account</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes I am sure</Button>
              <Button color="grey" onClick={()=> setShowModel(false)}>No, Cancel </Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  );
}
