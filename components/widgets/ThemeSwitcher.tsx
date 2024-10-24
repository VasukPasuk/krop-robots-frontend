"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import {cn} from "@/lib/utils"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {toggleTheme} from "@/store/slices/theme.slice";

import {IoSunnyOutline} from "react-icons/io5";
import {LuMoon} from "react-icons/lu";


const ThemeSwitcher = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({className, ...props}, ref) => {
  const theme = useAppSelector(state => state.theme.theme)
  const dispatch = useAppDispatch()


  return (
    <SwitchPrimitives.Root
      className={cn(
        " peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm " +
        " transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
        " focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50" +
        " bg-white dark:bg-black",
        className
      )}
      {...props}
      ref={ref}
      onClick={() => {
        dispatch(toggleTheme())
        const newTheme = theme === "light" ? "dark" : "light";
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-theme', newTheme);
        return newTheme;
      }}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          " flex items-center justify-center pointer-events-none h-6 w-6 rounded-full " +
          " shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1",
          " bg-black dark:bg-white"

        )}
      >
        {
          theme === "dark" ? (
            <LuMoon className="text-neutral-900"/>
          ) : (
            <IoSunnyOutline className="text-white"/>
          )
        }
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
})
ThemeSwitcher.displayName = SwitchPrimitives.Root.displayName

export {ThemeSwitcher}
