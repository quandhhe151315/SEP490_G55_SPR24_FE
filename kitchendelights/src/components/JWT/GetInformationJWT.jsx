import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function GetInformationJWT(props) {
  const { setId, setEmail, setRole, setName, setAvatar } = props;

    const decodeJWT = () => {
        const token = Cookies.get('jwt');
        if(token != null){
          const decoded = jwtDecode(token);
          if (setId) setId(decoded.id);
          Cookies.set('userId', decoded.id, { expires: 7 });
          if (setEmail) setEmail(decoded.email);
          if (setRole) setRole(decoded.role);
          Cookies.set('role', decoded.role, { expires: 7 });
          if (setName) setName(decoded.name);
          if (setAvatar) setAvatar(decoded.avatar);
        }
      }
    
      useEffect(() => {
        decodeJWT();
      }, []);
      
      return (
        <div></div>
      );
}
export default GetInformationJWT;
