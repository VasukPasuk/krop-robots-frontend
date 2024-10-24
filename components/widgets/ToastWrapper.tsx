"use client"
import { ToastContainer } from "react-toastify";
import {useAppSelector} from "@/store/hooks";

function ToastWrapper() {
  const theme = useAppSelector(state => state.theme.theme)
  return (
    <ToastContainer
      position={"bottom-left"}
      theme={theme}
    />
  )
}
export default ToastWrapper