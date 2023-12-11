import { createContext, useEffect, useState } from 'react'

export let LoginContext = createContext();

export default function LoginContextProvider(props) {


    let [retailerToken, setRetailerToken] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('retailerToken')) {
            setRetailerToken(localStorage.getItem('retailerToken'))
        } else {
            setRetailerToken(null)
        }
    }, [])


    return <LoginContext.Provider value={{ retailerToken, setRetailerToken }}>
        {props.children}
    </LoginContext.Provider>
} 