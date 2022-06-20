import { DependencyList, useEffect, Dispatch, useState } from "react";

export const useAsyncEffect = (effect: () => Promise<void>, deps?: DependencyList) => {
    useEffect(() => {
        effect().catch(console.error)
    }, deps)
}

type AsyncReducer<S, A> = (prevState: S, action: A) => Promise<S>
export const useAsyncReducer = <S, A>(reducer: AsyncReducer<S, A>, initialState: S): [S, Dispatch<A>] => {
    const [state, setState] = useState<S>(initialState)
    const dispatchState = async (action: A) => setState(await reducer(state, action))
    return [state, dispatchState]
}
