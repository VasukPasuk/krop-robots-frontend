"use client"

import {TextField} from "@mui/material";
import Image from "next/image"
import * as zod from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, Controller, SubmitHandler} from "react-hook-form"
import {useMutation} from "@tanstack/react-query";
import FeedbackService from "@/services/feedback.service";
import {ApiCreateFeedback} from "@/types/feedback.type";
import {toast} from "react-toastify";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = zod.object({
  name: zod.string().min(1),
  surname: zod.string().min(1),
  phone: zod.string().min(1),
  email: zod.string().min(1).email(),
  message: zod.string().min(1),
})

export type FormDataSchema = zod.infer<typeof schema>


function FeedbackFormBlock() {
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(schema)
  })

  const mutate = useMutation({
    mutationFn: (data: ApiCreateFeedback) => FeedbackService.create(data),
    onError: () => {
      toast.error("Невдача!!")
    },
    onSuccess: () => {
      toast.success("Вдача!!")
    },
  })

  const onSubmit: SubmitHandler<Required<FormDataSchema>> = (data) => {
    mutate.mutate({data})
  }


  return (
    <section className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8 items-start">
      <div className="flrx w-full h-[400px] lg:h-[600px] lg:w-1/2 relative">
        <Image
          src="/FeedbackFormImage.jpeg"
          alt="Feedback"
          className="object-cover w-full h-full"
          fill
        />
      </div>
      <form
        className="w-full lg:w-1/2 flex items-center justify-center flex-1 flex-col gap-y-4 rounded shadow-xl bg-gray-400/5 p-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className=" text-3xl font-normal mb-6">
          Форма зв&#39;язку з нами
        </h2>
        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 w-full">
          <Controller
            name="surname"
            control={form.control}
            render={({field}) => (
              <Input {...field} className="w-full"  placeholder="Прізвище"/>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({field}) => (
              <Input {...field} className="w-full" placeholder="Ім'я"/>
            )}
          />

        </div>
        <Controller
          name="email"
          control={form.control}
          render={({field}) => (
            <Input {...field} className="w-full" placeholder="E-mail"/>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({field}) => (
            <Input {...field} className="w-full" placeholder="Телефон"/>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({field}) => (
            <Textarea  {...field} className="w-full h-48" rows={8}
                       placeholder="Повідомлення для нас"/>
          )}
        />
        <button
          type="submit"
          className="normal-case text-xl font-extralight w-full rounded bg-gradient-to-r from-indigo-500 to-indigo-900 text-white p-4"
        >
          Надіслати
        </button>
      </form>
    </section>
  )
}

export default FeedbackFormBlock