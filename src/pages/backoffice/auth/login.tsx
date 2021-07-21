import React, {useState} from 'react';
import { NextPageContext } from 'next'
import "react-intl-tel-input/dist/main.css";
import { NextPage } from 'next';
import Sess from "lib/auth_bo";
import { useToasts } from 'react-toast-notifications'
import Swal from 'sweetalert2'
import {useRouter} from 'next/router'
import nookies from 'nookies'
import Auth from 'components/Auth';
import Layout from 'Layouts';

interface iLogin  {
  // any modifications to the default context, e.g. query types
  apiUrl:string;
  otpLength: number;
}
const Login: NextPage<iLogin> = ({}) =>{ 
  const router = useRouter()

  // const cekSess = Sess.getToken();
  // cekSess!==undefined&&router.push('/') 

  const { addToast } = useToasts();
  // const [otp, setOtp] = useState('-');
  // const [counter, setCounter] = React.useState(0);
  // const [startTimer, setStartTimer] = React.useState(false);
  // const [otpInput, setOtpInput] = React.useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const onSubmit = async () =>{

    if(username===''){
      Swal.fire("Peringatan","Username tidak boleh kosong!");
    } else if (password===''){
      Swal.fire("Peringatan","Password tidak boleh kosong!");
    } else {
      Swal.fire({
            title: 'Silahkan tunggu...',
            html: "Mem-verifikasi akun anda.",
            willOpen: () => {
                Swal.showLoading()
            },
            showConfirmButton:false,
            willClose: () => {}
        })

        try {
          const hitLogin=await Sess.http.post(Sess.http.apiClient+'auth', {
              username:username,
              password:password,
          })

          setTimeout(
              function () {
                  Swal.close()
                  // save token to localStorage
                  const datum = hitLogin.data.result;
                  Sess.setUser({
                    id: datum.id,
                    token: datum.token,
                    name: datum.name,
                    username: datum.username,
                    foto: datum.foto,
                    level: datum.level,
                    access_level: datum.access_level,
                    status: datum.status,
                    created_at: datum.created_at,
                    updated_at: datum.updated_at,
                  })
                  Sess.setToken(datum.token);
                  Sess.http.axios.defaults.headers.common["Authorization"] = datum.token;
                  router.push('/backoffice');
                  // if(datum.havePin)
                  // router.push('/');
                  // else  router.push('/auth/pin/'+btoa(datum.id));
            },800)
        } catch (err) {
          setTimeout(
              function () {
                  Swal.close()
                  // save token to localStorage
                  if (err.message === 'Network Error') {
                    addToast("Tidak dapat tersambung ke server!", {
                      appearance: 'error',
                      autoDismiss: true,
                    })
                      
                  }else{
                    if(err.response.data.msg!==undefined){
                      addToast(err.response.data.msg, {
                          appearance: 'error',
                          autoDismiss: true,
                        })
                    }else{
                      addToast("Kesalahan pada server.", {
                          appearance: 'error',
                          autoDismiss: true,
                        })
                    }
        
                  }
            },800)
        
        }
      }

  }


  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Welcome">
         <div className="flex items-center justify-center pt-3 pb-10 px-6 sm:px-12 md:w-full">
                <div className="w-full">
                  <div className="bg-gray-50 dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className="mb-4">
                      <label className="block dark:text-gray-400 text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                      </label>
                      <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      id="username"
                      type="text"
                      placeholder="Username"
                      onChange={e => setUsername(e.target.value)}
                      value={username}/>
                    </div>
                    <div className="mb-6">
                      <label className="block dark:text-gray-400 text-white text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                      className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                      id="password"
                      type="password"
                      placeholder="******************"
                      onChange={e => setPassword(e.target.value)}
                      value={password}/>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                      className="dark:bg-gray-50 bg-gray-900 hover:bg-blue-dark text-light dark:text-dark font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={onSubmit}>
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>

      </Auth>
    </Layout>
  );
}
export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx)
  if(cookies._prowara!==undefined){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { 
    props:{
      cookies,
      apiUrl:Sess.http.apiUrl,
      otpLength:4
    }
  }
}

export default Login
