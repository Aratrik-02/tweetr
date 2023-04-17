import { db } from "lib/firebase";
import {query, collection, where, getDocs} from "firebase/firestore";

export default async function isUsernameExists(username) {
//   const result = await db
//     .collection("users")
//     .where("username", "==", username)
//     .get();
//   return result.docs.length > 0;
    const q=query(collection(db,"users"),where("username","==",username))
    const querySnapshot=await getDocs(q)
    return querySnapshot.docs.length>0
}