import { doc, query, updateDoc} from "firebase/firestore";
import { db, storage } from "lib/firebase";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useUser(id) {
    const q=query(doc(db,"users",id));
    const [user,isLoading]=useDocumentData(q)
    return {user,isLoading}
}
export function useUpdateAvatar(uid){
    const [isLoading,setLoading]=useState(false);
    const [file,setFile]=useState(null);
    const Toast=useToast();
    const navigate=useNavigate();
    async function updateAvatar(){
        if(!file){
            Toast({
                title:"No file selected",
                description:"Please select a file to upload",
                status:"error",
                duration:3000,
                isClosable:true,
            })
            return;
        }
        setLoading(true);
        const fileRef=ref(storage,`avatars/${uid}`);
        await uploadBytes(fileRef,file);
        const avatarURL=await getDownloadURL(fileRef);
        const docRef=doc(db,"users",uid);
        await updateDoc(docRef,{avatar:avatarURL})
        Toast({
            title:"Avatar updated",
            status:"success",
            duration:3000,
            isClosable:true,
        })
        setLoading(false);
        navigate(0)
    }
    return {setFile,updateAvatar,isLoading,fileURL:file?URL.createObjectURL(file):null}
}