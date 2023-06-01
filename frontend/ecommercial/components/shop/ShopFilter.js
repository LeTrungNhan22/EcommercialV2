import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
import React, { Fragment, useState } from 'react'

const filterType = [
    {
        name: 'All',
        value: 'all'
    },
    {
        name: 'Xếp theo giá cao nhất'
        , value: 'price-desc'
    },
    {
        name: 'Xếp theo giá thấp nhất'
        , value: 'price-asc'
    },
    {
        name: 'Xếp theo tên A-Z'
        , value: 'name-asc'
    },

]
const ShopFilter = ({ shopProducts,
    setShopProducts }) => {

    const [selected, setSelected] = useState(filterType[0])
 

    if (!shopProducts) return;

    const filterProduct = (type) => {
        const { value } = type;
        switch (value) {
            case 'all':
                setShopProducts(shopProducts);
                break;
            case 'price-desc':
                const sortedDesc = [...shopProducts].sort((a, b) => b.mediumPrice.amount - a.mediumPrice.amount);
                setShopProducts(sortedDesc);

                break;
            case 'price-asc':
                const sortAsc = [...shopProducts].sort((a, b) => a.mediumPrice.amount - b.mediumPrice.amount);
                setShopProducts(sortAsc);

                break;
            case 'name-asc':
                const sortNameAsc = [...shopProducts].sort((a, b) => a.name.localeCompare(b.name));
                setShopProducts(sortNameAsc);
                break;
            default:
                break;
        }
    }
    React.useEffect(() => {
        filterProduct(selected);
    }, [selected])

    return (
        <div className="top-16 w-full">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filterType.map((filter, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={filter}

                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {filter.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default ShopFilter