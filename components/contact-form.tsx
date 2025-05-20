"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Navnet må være minst 2 tegn.",
  }),
  email: z.string().email({
    message: "Vennligst oppgi en gyldig e-postadresse.",
  }),
  subject: z.string().min(5, {
    message: "Emnet må være minst 5 tegn.",
  }),
  message: z.string().min(10, {
    message: "Meldingen må være minst 10 tegn.",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Du må godkjenne vilkårene for å sende skjemaet.",
  }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      acceptTerms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    form.reset()

    toast({
      title: "Melding sendt!",
      description: "Takk for din henvendelse. Vi vil svare deg så snart som mulig.",
      variant: "success",
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ditt navn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input placeholder="din.epost@eksempel.no" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emne</FormLabel>
                <FormControl>
                  <Input placeholder="Hva gjelder henvendelsen?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Melding</FormLabel>
                <FormControl>
                  <Textarea placeholder="Skriv din melding her..." className="min-h-32 resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  Vennligst gi oss så mye informasjon som mulig, så vi kan hjelpe deg best mulig.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Jeg godkjenner at mine personopplysninger behandles i henhold til{" "}
                    <Link href="/personvern" className="text-primary hover:underline">
                      personvernerklæringen
                    </Link>{" "}
                    og{" "}
                    <Link href="/vilkar" className="text-primary hover:underline">
                      vilkårene
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sender...
              </>
            ) : (
              "Send melding"
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  )
}
