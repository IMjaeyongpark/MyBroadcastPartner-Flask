import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const client_id = process.env.REACT_APP_CLIENT_KEY;

const Login = () => {
    function setSessionCookie(sessionId) {
        document.cookie = `JSESSIONID=${sessionId}; path=/;`;
    }

    const onSuccess = async (response) => {
        const serverIP = process.env.REACT_APP_GITHUB_IP;
        console.log(1, response);
        console.log("jwt",jwtDecode(response.credential));
        sessionStorage.setItem('userInfo', JSON.stringify(jwtDecode(response.credential)));
        axios.get(`http://${serverIP}:8081/find`,{    // 액세스 토큰을 받아오는 HTTP 요청을 보냅니다.
          params:{
            id_token: String(response.credential),
          }
        }).then((res)=>{
            const sessionId = res.data;
            console.log(res.headers['set-cookie'][0].split(';')[0])
            setSessionCookie(sessionId)
        })
        .catch((Error)=>{console.log(Error)})
        
        window.location.replace("/");
    }   // 로그인 성공 시, 로그인 정보를 가져옵니다.

    const onFailure = (response) => {
        alert("구글 로그인에 실패하였습니다.");
        console.log('FAILED', response);
    } // 로그인 실패 시 작동

    return (
            <GoogleOAuthProvider clientId={client_id}>
                <GoogleLogin
                    buttonText="구글아이디로 로그인하기"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </GoogleOAuthProvider>
    );
}

export default Login;