import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut,  updateProfile } from 'firebase/auth';
import {auth} from '../fairbase/fairbase.init'


const provider=new GoogleAuthProvider();
const AuthProvider = ({children}) => {

   
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const creatUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const updateUser=(data)=>{
        return updateProfile(auth.currentUser,data);
    }

    const loginUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const signInWithGoogle=()=>{
        return signInWithPopup(auth,provider)
    }

    const forgotPass=(email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        }
        
        )
        return ()=>{
            unSubscribe();
        }
    },[])

    const authData={
        creatUser,
        user,
        setUser,
        logOut,
        loginUser,
        setLoading,
        loading,updateUser,
        signInWithGoogle,
         forgotPass

    }
    
    return (
        <div>
            <AuthContext value={authData}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;