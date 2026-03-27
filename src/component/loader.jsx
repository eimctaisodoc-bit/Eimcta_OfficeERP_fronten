import React from "react";
import { BallTriangle, Circles, InfinitySpin, Triangle } from "react-loader-spinner";


export function MainLoader() {
  return (
    <div className="flex items-center justify-center h-full ">
      <Triangle
        height={120}
        width={120}
          color="#f59e0b"
        // color={['#e15b64', '#f47e60', '#f8b26a', '#c94a54', '#ffd08a']} // Amber
        ariaLabel="circles-loading"
        wrapperStyle={{}} // No shadow
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
export function ComponentLoader() {
  return (
    <div className="flex items-center justify-center h-full ">
      <InfinitySpin
        height={150}
        width={150}
        color="#f59e0b" // Amber
        ariaLabel="circles-loading"
        wrapperStyle={{}} // No shadow
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}