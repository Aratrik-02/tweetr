import { useAuthState,useSignOut } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth,db } from "lib/firebase";
import { DASHBOARD, LOGIN } from "lib/routes";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc,getDoc,doc } from "firebase/firestore";
import isUsernameExists from "utils/isUsernameExists";
export function useAuth(){
    // const [authUser, isLoading, error] = useAuthState(auth);
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading,setLoading]=useState(true)
    const [user,setUser]=useState(null)
    useEffect(()=>{
        async function fetchData(){
            setLoading(true)
            const ref=doc(db,"users",authUser.uid)
            const docSnap=await getDoc(ref)
            setUser(docSnap.data())
            setLoading(false)
        }
        if(!authLoading){
            if(authUser){fetchData()}
            else{setLoading(false)}
        }
    },[authLoading])
    return {
        user, isLoading, error
    }
}
export function useLogin(){
    const [isLoading,setLoading]=useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    async function login({email, password,redirectTo=DASHBOARD}){
        setLoading(true)
        try{
            await signInWithEmailAndPassword(auth,email, password)
            toast({
                title: "Login successful",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            navigate(redirectTo)
        }catch(error){
            toast({
                title: "Login failed",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            setLoading(false)
            return false;    
        }
        setLoading(false)
        return true;
    }
    return {
        login, isLoading
    }
}
export function useRegister(){
    const [isLoading,setLoading]=useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    async function register({username,email, password,redirectTo=DASHBOARD}){
        setLoading(true)
        const usernameExists = await isUsernameExists(username)
        if(usernameExists){
            toast({
                title: "Username already exists",
                description: "Please choose another username",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            setLoading(false)
            return false;
        }else{
            try{
                const res = await createUserWithEmailAndPassword(auth,email, password)
                await setDoc(doc(db,"users",res.user.uid),{
                    id:res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date: Date.now()
                })
                toast({
                    title: "Registration successful",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
                navigate(redirectTo)
            }catch(error){
                toast({
                    title: "Registration failed",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                })
                return false;    
            }finally{
                setLoading(false)
            }
        }
        
        return true;
    }
    return {
        register, isLoading
    }
}
export function useLogout(){
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast()
    const navigate = useNavigate()
    async function logout(){
        if(await signOut()){
            toast({
                title: "Logout successful",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            navigate(LOGIN)
        }
    }
    return {logout, isLoading}
}