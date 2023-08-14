export interface typeOfRecent {
    name: string,
    howMuch: number,
    id:string,
}

export interface typeOfContext {
    valstate: any,
    dispatchVal: () => any,
    recentActivity: any,
    setrecentActivity: any,
}