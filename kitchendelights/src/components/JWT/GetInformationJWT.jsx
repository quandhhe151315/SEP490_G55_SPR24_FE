import React, { useEffect , useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

function GetInformationJWT(props) {
    const {setId, setEmail, setRole, setName, setAvatar} = props;

    const decodeJWT = () => {
        const token = Cookies.get('jwt');
        const decoded = jwtDecode(token);
        if (setId) setId(decoded.id);
        Cookies.set('userId', decoded.id);
        // Cookies.set('username', decoded.username);
    if (setEmail) setEmail(decoded.email);
    if (setRole) setRole(decoded.role);
    if (setName) setName(decoded.name);
    if (setAvatar) setAvatar(decoded.avatar);
    console.log(decoded.email)
      }
    
      useEffect(() => {
        decodeJWT();
      }, []);
      
      return (
        <div>
            
        </div>
      );
}
export default GetInformationJWT;
