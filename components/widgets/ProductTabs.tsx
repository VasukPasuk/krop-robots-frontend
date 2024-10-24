"use client"

import {useEffect, useState} from "react";

interface IProductTabsProps {
  options: {
    value: string;
    label: string;
    onTabClick?: (value: string) => void;
  }[]
  onChangeTab?: (value: string) => void;
}

function ProductTabs({options, onChangeTab}: IProductTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(options[0].value)

  useEffect(() => {
    if (!!onChangeTab) {
      onChangeTab(activeTab)
    }
  }, [activeTab]);
  return (
    <ul className="flex flex-row gap-x-4 shadow p-2 rounded dark:bg-white/5">
      {
        options.map((item, i) => (
          <li
            key={i}
            className="
              data-[active=true]:bg-gray-100 transition-colors duration-300 ease-in hover:data-[active=true]:bg-gray-200 rounded py-1 px-3 cursor-pointer hover:bg-blue-100
              dark:bg-white/5 dark:data-[active=true]:bg-white/10 dark:hover:data-[active=true]:bg-white/15 dark:hover:bg-white/10
            "
            data-active={activeTab === item.value}
            onClick={() => {
              setActiveTab(item.value)
              item.onTabClick && item.onTabClick(activeTab)
            }}
          >
            {
              item.label
            }
          </li>
        ))
      }
    </ul>
  )
}

export default ProductTabs;