import React from 'react'
import { Triangle } from 'react-loader-spinner'
export function Loader() {
    return (<Triangle
        visible={true}
        height="200"
        width="200"
        color="#f59e0b"
        ariaLabel="triangle-loading"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
       wrapperClass=""
        style={{
          borderRadius: "20px", // rounded edges for spinner wrapper
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
    />)


}