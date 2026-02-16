import React from 'react';
import LoginForm from '../pages/loginForm';
import Typewriter from './typeWritter';

const LoginCover = () => {

  return (
    <div className="relative h-screen bg-amber-700 w-full overflow-hidden">
      <div className='bg-transparent absolute top-0 w-full h-90 ' ></div>
      <div className='flex justify-center mt-14'> <Typewriter/></div>
      <div className=" absolute md:-top-32  -top-1 lg:top-14 left-0 w-full h-screen"><LoginForm/> </div>
      <div className='bg-white absolute bottom-0 w-full md:h-8/12 lg:h-90 h-8/12   lg:[clip-path:polygon(0%_0%,50%_120px,100%_0%,100%_100%,0%_100%)]   md:[clip-path:polygon(0%_0%,50%_100px,100%_0%,100%_100%,0%_100%)]  [clip-path:polygon(0%_0%,50%_60px,100%_0%,100%_100%,0%_100%)]'></div>
      <div className='absolute md:bottom-5 bottom-1 lg:bottom-2 sm:flex md:flex lg:flex  justify-center w-full  text-slate-800 text-sm text-center '><p> &copy; {new Date().getFullYear()} Everest International Management Consultancy Agency Pvt. Ltd. All rights reserved.</p></div>
    </div>

  );
};

export default LoginCover;
