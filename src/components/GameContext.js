import React, { useEffect } from 'react';
import { usePersistedState } from '../hooks/use-interval.hook'

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState(100, 'num-cookies')
    const [counter, setCounter] = usePersistedState([0,0,0,0], 'counter')

    useEffect(() => {
        localStorage.setItem('num-cookies', numCookies)
    }, [numCookies])
    
    useEffect(() => {
        localStorage.setItem('counter', counter)
    }, [counter])

    

    const calculateCookiesPerTick = () => {
        return counter.map((count, index) => {
            if (index === 0) return count
            if (index === 1) return count*10
            if (index === 2) return count*80
            if (index === 3) return count*0
        }).reduce((total, count) => total+count)
    }

    
    return <GameContext.Provider value={{
        numCookies, setNumCookies, counter, setCounter, cookiesPerSecond: calculateCookiesPerTick()
    }}>{children}</GameContext.Provider>
}