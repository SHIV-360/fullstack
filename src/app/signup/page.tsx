
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2 } from "lucide-react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { useAuth } from "@/context/auth-context"

const usernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters.").max(20, "Username must be at most 20 characters."),
})
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})
const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
})

// Combined schema for final validation
const combinedSchema = usernameSchema.merge(emailSchema).merge(passwordSchema);

const formSchemas = [usernameSchema, emailSchema, passwordSchema]

type FormData = z.infer<typeof combinedSchema>;

export default function SignUpPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signup } = useAuth();
  const router = useRouter()

  const currentSchema = formSchemas[step];

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
        ...formData
    },
  })

  async function processStep(values: any) {
    const newFormData = { ...formData, ...values };
    setFormData(newFormData);

    if (step < formSchemas.length - 1) {
      setStep(step + 1)
    } else {
      setIsSubmitting(true)
      const finalData = newFormData as FormData;
      const success = await signup(finalData.email, finalData.password, finalData.username);
      if(success) {
        router.push('/dashboard');
      } else {
        // Reset form on failure to allow user to retry
        setStep(0);
        setFormData({});
        form.reset();
      }
      setIsSubmitting(false)
    }
  }
  
  const fieldName = Object.keys(currentSchema.shape)[0] as "username" | "email" | "password";

  const placeholders = {
    username: "Choose your analyst handle...",
    email: "Enter your secure email...",
    password: "Create a strong password...",
  }

  const labels = {
    username: "Welcome, Analyst. What's your handle?",
    email: "What's your secure line for case updates?",
    password: "Secure your credentials for the investigation ahead.",
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <DotPattern className="absolute inset-0" />
      <div className="z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Join the Investigation</h1>
            <p className="text-muted-foreground font-sans">Start your journey into digital forensics.</p>
        </div>
        
        <div className="h-[200px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(processStep)} className="space-y-6 text-center">
                        <FormField
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-sans">{labels[fieldName]}</FormLabel>
                                <FormControl>
                                <div className="flex items-center gap-2">
                                <Input 
                                    placeholder={placeholders[fieldName]} 
                                    {...field}
                                    type={fieldName === 'password' ? 'password' : 'text'}
                                    className="text-lg py-6 text-center bg-card/80 backdrop-blur-sm"
                                />
                                 <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={isSubmitting}>
                                    {isSubmitting && step === formSchemas.length - 1 ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                                 </Button>
                                </div>
                                </FormControl>
                                <FormMessage className="text-base" />
                            </FormItem>
                            )}
                        />
                        </form>
                    </Form>
                 </motion.div>
            </AnimatePresence>
        </div>

        {isSubmitting && step === formSchemas.length - 1 && (
            <div className="text-center mt-8">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Creating Secure Account...</span>
                </div>
            </div>
        )}

        <div className="mt-12 text-center text-sm">
            <p>Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Log In
            </Link>
            </p>
        </div>
      </div>
    </div>
  )
}
