import React, { useEffect } from 'react';
import { retrieveData } from '../LocalConnection/LocalConnection.js';
import { useNavigate } from 'react-router-dom';



function Logincheck() {

    const navigate = useNavigate();
    useEffect(() => {
        const retrieveDatafind = retrieveData("user_email");
        if(retrieveDatafind===null){
            navigate('/login');
        }else{
            navigate('/Welcomepage');
        }
    }, [navigate]);


    return (
        <div>

        </div>
    );
}

export default Logincheck;
