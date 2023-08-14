import { typeOfRecent } from "@/components/types/type";

function minusValChecker(prevValue: number, newValueForDecrement: number) {
    let finalValue = prevValue - newValueForDecrement;
    return finalValue < 0 ? false : true;
}

export function configureValue(state: number, action: { payload: number, method: string }) {
    if (action.method === "add") {
        return state + Number(action.payload)
    } else if (action.method === "remove") {
        if (minusValChecker(state, Number(action.payload))) {
            return state - Number(action.payload)
        } else {
            alert(`Can not decrement ${action.payload} from ${state}`)
            return state
        }
    } else {
        return state;
    }
}
export function recentActivityReducer(state: any, action: { payload: string, method: string, value: number, id?: string }) {
    let userId = window.crypto.getRandomValues(new Uint32Array(action.value)).join("-");
    console.log(userId)
    if (action.payload == "push") {
        let structuredData = {
            name: action.method,
            howMuch: action.value,
            id: userId,
        };
        return [...state, structuredData]
    } else if (action.payload == "remove") {
        let filteredData = state.filter((item: typeOfRecent) => item.id !== action.id)
        return filteredData
    }
    return [
        {
            name: "add",
            howMuch: 1,
            id: "454gfwGsfdgsdgf"
        },
    ]

}