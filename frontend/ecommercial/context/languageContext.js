
// languageContext.js
import axios from "axios";
import React, { useEffect } from 'react';


const languageTypes = [
    { code: "en", name: "English" },
    { code: "vi", name: "Vietnam" },
];


const LanguageContext = React.createContext({});
export const LanguageContextProvider = ({ children }) => {
    const [language, setLanguage] = React.useState(languageTypes[0]);
    const [languageData, setLanguageData] = React.useState({});
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const getLanguage = async () => {
            const response = await axios.get(`${baseUrl}/language/1.0.0/language/change?locale=${language.code}`);
            setLanguageData(response.data);
        }
        getLanguage();
    }, [language]);

    const context = {
        language,
        setLanguage,
        languageData,
        setLanguageData,
        languageTypes,
    };
    return (
        <LanguageContext.Provider value={context}>
            {children}
        </LanguageContext.Provider>
    );
}
export default LanguageContext;