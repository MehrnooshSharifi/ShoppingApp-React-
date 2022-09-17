import { useAth } from "../Providers/AuthProvider";

const ProfilePage = () => {
 const  userData = useAth() ;
 console.log(userData)
    return ( 
        <div></div>
     );
}
 
export default ProfilePage;