import React, { useEffect , useState } from 'react';
import Appbar from '../components/Homepage/Appbar';
import GetInformationJWT from '../components/JWT/GetInformationJWT';

function HomePage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  return (
    <div>
        <Appbar />
        <h1>Trang chủ</h1>
    </div>
  );
}

export default HomePage;
