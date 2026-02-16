import React from "react"

export const Lead = () => {
    return (<form style={{ width: "300px" }}>
        <label>Name</label>
        <input
            type="text"

            // onChange={(e) => setname(e.target.value)}
            placeholder="Enter your name"
            style={{ display: "block", width: "100%", margin: "8px 0" }}
        />



        <button type="submit">Submit</button>
    </form>)
}