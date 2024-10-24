"use client"

import {useAppSelector} from "@/store/hooks";
import {MyButton} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {Textarea} from "@/components/ui/textarea";
import CartItemBar from "@/components/widgets/CartItemBar";
import {useState} from "react";
import {cn} from "@/lib/utils";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import OrdersService from "@/services/orders.service";
import { toast } from "react-toastify";

type DeliveryUnion = "Укрпошта" | "Нова пошта" | "Кур'єром Нової пошти"
type PaymentUnion = "Повна оплата" | "Рахунок для юридичних осіб"

type CheckoutConfigType = {
  delivery_type: "Укрпошта" | "Нова пошта" | "Кур'єром Нової пошти" | null
  payment_type: "Повна оплата" | "Рахунок для юридичних осіб" | null
}


const schema = zod.object({
  phone: zod.string().min(1),
  email: zod.string().min(1),
  name: zod.string().min(1),
  surname: zod.string().min(1),
  street: zod.string().min(1).optional(),
  house: zod.string().min(1).optional(),
  appartment: zod.string().min(1).optional(), // Квартира
  floor: zod.string().min(1).optional(), // Поверх
  department_adress: zod.string().min(1).optional(),
  locality: zod.string().min(1),
  region: zod.string().min(1),
  legal_entity: zod.string().min(1).optional(),
  EDRPOY_CODE: zod.string().min(1).optional(),
  comment: zod.string().min(1).optional()
})

type Schema = zod.infer<typeof schema>

function CheckoutPage() {
  const {price, amount, items} = useAppSelector(state => state.cart);
  const form = useForm<Schema>({
    resolver: zodResolver(schema)
  })
  const [options, setOptions] = useState<CheckoutConfigType>({
    delivery_type: null,
    payment_type: null,
  })

  const handleDelivery = (delivery_type: DeliveryUnion) => () => {
    setOptions(prev => ({...prev, delivery_type}));
  }

  const handlePayment = (payment_type: PaymentUnion) => () => {
    setOptions(prev => ({...prev, payment_type}));
  }

  const mutation = useMutation({
    mutationFn: OrdersService.create,
    onSuccess: () => {
      toast.success("Дякуємо за Ваше замовлення!")
    },
    onError: () => {
      toast.error("Упс! Щось сталося не так!")
    },
  })


  const onSubmit: SubmitHandler<Required<Schema>> = (data) => {
    mutation.mutate({
      total_price: price,
      total_items: amount,
      ...data,
      ...options,
      items: items.map((cart_item) => ({
        amount: cart_item.quantity,
        price: cart_item.price * cart_item.quantity,
        plastic: cart_item.plastic,
        product: cart_item.product.id,
        color: cart_item.color.id,
        variant: cart_item.variant.id,
      }))
    })
  }


  return (
    <form
      className="w-full max-w-[1300px] mx-auto flex flex-col gap-y-12 lg:flex-row lg:gap-x-12 py-6 px-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="w-full lg:w-2/3 flex flex-col gap-y-12">
        <Block title={"Контактні дані"}>
          <div className="grid grid-cols-1 grid-rows-4  lg:grid-cols-2 lg:grid-rows-2 gap-2">
            <Controller name="phone" control={form.control}
                        render={({field}) => <Input {...field} required placeholder="Телефон"/>}/>
            <Controller name="email" control={form.control}
                        render={({field}) => <Input {...field} required placeholder="Ел. пошта"/>}/>
            <Controller name="surname" control={form.control}
                        render={({field}) => <Input {...field} required placeholder="Прізвище"/>}/>
            <Controller name="name" control={form.control}
                        render={({field}) => <Input {...field} required placeholder="Ім'я"/>}/>
          </div>

        </Block>
        <Block title={"Локація"}>
          <div className="flex gap-x-2">
            <Controller name="locality" control={form.control}
                        render={({field}) => <Input {...field} required placeholder="Населений пункт"/>}/>
            <Controller name="region" control={form.control}
                        render={({field}) => <Input {...field} required placeholder="Область"/>}/>
          </div>
        </Block>
        <Block title={"Доставка"}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn("text-base text-start s480:text-lg rounded px-2", {
                  "bg-black/5": options.delivery_type === "Нова пошта"
                })}
                onClick={handleDelivery("Нова пошта")}
              >Доставка Новою Поштою</AccordionTrigger>
              <AccordionContent>
                <div className="p-2">
                  <Controller name="department_adress" control={form.control}
                              render={({field}) => <Input {...field} required placeholder="Адреса"/>}/>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                className={cn("text-base text-start s480:text-lg rounded px-2", {
                  "bg-black/5": options.delivery_type === "Кур'єром Нової пошти"
                })}
                onClick={handleDelivery("Кур'єром Нової пошти")}
              >
                Доставка кур'єром Новою Поштою
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 grid-rows-4  lg:grid-cols-2 lg:grid-rows-2 gap-2 p-2">
                  <Controller name="street" control={form.control}
                              render={({field}) => <Input {...field} required placeholder="Вулиця"/>}/>
                  <Controller name="house" control={form.control}
                              render={({field}) => <Input {...field} required placeholder="Будинок"/>}/>
                  <Controller name="appartment" control={form.control}
                              render={({field}) => <Input {...field} required placeholder="Квартира"/>}/>
                  <Controller name="floor" control={form.control}
                              render={({field}) => <Input {...field} required placeholder="Поверх"/>}/>
                </div>

              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger
                className={cn("text-base text-start s480:text-lg rounded px-2", {
                  "bg-black/5": options.delivery_type === "Укрпошта"
                })}
                onClick={handleDelivery("Укрпошта")}
              >
                Доставка Укрпоштою
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-2">
                  <Controller name="department_adress" control={form.control}
                              render={({field}) => <Input {...field} required placeholder="Адреса"/>}/>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </Block>
        <Block title={"Оплата"}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={cn("text-base text-start s480:text-lg rounded px-2", {
                  "bg-black/5": options.payment_type === "Повна оплата"
                })}
                onClick={handlePayment("Повна оплата")}
              >
                Повна оплата
              </AccordionTrigger>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                className={cn("text-base text-start s480:text-lg rounded px-2", {
                  "bg-black/5": options.payment_type === "Рахунок для юридичних осіб"
                })}
                onClick={handlePayment("Рахунок для юридичних осіб")}
              >
                Рахунок для юридичних осіб
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-2 flex gap-x-2">
                  <Controller name="EDRPOY_CODE" control={form.control}
                              render={({field}) => <Input {...field} className="flex-1" required
                                                          placeholder="Код ЄДРПОУ"/>}/>
                  <Controller name="legal_entity" control={form.control}
                              render={({field}) => <Input {...field} className="flex-1" required
                                                          placeholder="Повна назва юридичної особи"/>}/>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Block>
        <Block title={"Коментар"}>
          <Controller name="comment" control={form.control}
                      render={({field}) => <Textarea {...field} rows={8} defaultValue={' '}
                                                     placeholder="Коментар..."/>}/>

        </Block>
        <Block title={"Товари до замовлення"}>
          <div className="flex flex-col gap-y-4 s480:p-4">
            {items.map((item) => (
              <CartItemBar key={item.key} item={item}/>
            ))}
          </div>
        </Block>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-y-6">
        <Block title={"Деталі"}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl">
              {amount} товарів на суму
            </h2>
            <h3 className="text-2xl font-semibold">
              {price} грн.
            </h3>
          </div>
          <div className="px-6 py-4 flex justify-between items-center border rounded border-black/15 dark:bg-white/15">
            <div className="text-xl">
              До сплати
            </div>
            <div className="text-2xl font-semibold">
              {price} грн.
            </div>
          </div>
          <MyButton type="submit" className="bg-green-700 hover:bg-green-600 w-full">
            Підтвердити замовлення
          </MyButton>
        </Block>
      </div>
    </form>
  )
}

function Block({children, title}: { children: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col gap-y-4 rounded shadow p-4 dark:bg-white/5">
      <div>
        <h1 className="text-2xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  )
}

export default CheckoutPage;