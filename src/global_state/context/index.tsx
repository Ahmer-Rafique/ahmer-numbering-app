"use client"
import { useContext, ReactNode, createContext, useReducer, useState } from "react"
import { configureValue, recentActivityReducer } from "./Reducer";
import { typeOfContext, typeOfRecent } from "@/components/types/type";

const contextVal = createContext<typeOfContext | null>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {
    const mathNumber: number = 0;
    
    const recentActivityInitial: any = ([]);
    const [recentActivity, setrecentActivity]: any = useReducer(recentActivityReducer, recentActivityInitial)
    const [valstate, dispatchVal] = useReducer<any>(configureValue, mathNumber,)

    return (
        <contextVal.Provider value={{ valstate, dispatchVal, recentActivity, setrecentActivity }}>
            {children}
        </contextVal.Provider>
    )
};
export function ContextValExtractor() {
    let res = useContext(contextVal);
    return res
}

export default ContextWrapper