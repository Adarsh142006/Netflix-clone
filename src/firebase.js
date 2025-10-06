import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc,collection,getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 
 
const firebaseConfig = {
  apiKey: "AIzaSyAid-GLT2-qgeOX6qlBkZ4U5ftJ2tqWfOU",
  authDomain: "netflix-clone-68900.firebaseapp.com",
  projectId: "netflix-clone-68900",
  storageBucket: "netflix-clone-68900.firebasestorage.app",
  messagingSenderId: "101484230079",
  appId: "1:101484230079:web:b55aa19102cabd5cbd5d0a"
};

 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
 
const db = getFirestore(app);

const signup = async(name,email,password)=>{
   try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
         uid:user.uid,
         name,
         authProvider:"local",
         email,
    });
   }catch(error){
    console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const login = async (email,password)=>{
    try{
            await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
         console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};