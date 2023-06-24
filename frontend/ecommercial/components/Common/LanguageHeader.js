/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { Combobox, Listbox } from "@headlessui/react";
import { CheckIcon, FaceFrownIcon, GlobeAltIcon, ScaleIcon } from "@heroicons/react/24/outline"
import React from 'react'
import { useState } from "react";
import axios from "axios";


const Language = ({ language, setLanguage, languageData, setLanguageData, languageTypes }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const handleChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        console.log(selectedLanguage.code);
        // axios
        //     .get(`${baseUrl}/language/1.0.0/language/change?locale=${selectedLanguage.code}`)
        //     .then((response) => {
        //         setLanguageData(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };
    return (
        <div className="w-48">
            <Listbox value={language} onChange={handleChange}>
                <div className="relative">
                    <Listbox.Button className=" py-3 pl-3 pr-8 text-left w-full bg-gray-100 rounded-full shadow-sm text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <span className="flex items-center">
                            <GlobeAltIcon className="h-5 w-5 mr-1" />
                            {language.name}
                        </span>

                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {languageTypes.map((item) => (
                            <Listbox.Option
                                key={item.code}
                                value={item}
                                className={({ active }) =>
                                    `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`${selected ? "font-semibold" : "font-normal"}`}>
                                            {item.name}
                                        </span>
                                        {selected && (
                                            <span
                                                className={`${selected ? "text-blue-600" : "text-blue-600"
                                                    }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    )
}

export default Language