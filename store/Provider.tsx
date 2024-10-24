"use client"
import {store} from "@/store/store";
import { Provider } from "react-redux";

export default function ReduxProvider({children}: {children: Readonly<React.ReactNode>}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}