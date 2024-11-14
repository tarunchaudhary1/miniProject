import { useEffect, useState, createContext, useContext } from 'react';

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
    // console.log("useTheme", useContext(ThemeContext));
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function Context({ children }) {

    const [darkTheme, setDarkTheme] = useState(false);
    
    useEffect( () => {
        const localTheme = localStorage.getItem('localTheme') === "false" ? false : true;
        localTheme ? setDarkTheme(localTheme) : setDarkTheme(false);
        // console.log("localTheme", (localTheme), (darkTheme));
    }, [])
    
    useEffect( () => {
        localStorage.setItem('localTheme', (darkTheme));
        // console.log("darkTheme", darkTheme);
    }, [darkTheme])

	function toggleTheme(th) {
		// console.log(th)
		setDarkTheme(th);
	}
	return (
		<ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
            {children}
            </ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	);
}