import React from "react";
import { Tab } from "@headlessui/react";

import { locationsTab } from "../data/mock-data";

const OptionTabs = () => {
  return (
    <div className="max-w-[700px] container mx-auto my-10">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-transparent">
          {locationsTab.map((item) => (
            <Tab
              key={item.id}
              className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default OptionTabs;
