"use client"

import React, {Fragment, useRef, useState} from 'react'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '../ui/card'
import {useMediaQuery} from '@/lib/hooks/use-media-query'
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from '../ui/form'
import {Switch} from '../ui/switch'
import {Moon, SunMedium, Trash2, X} from "lucide-react";
import {toast} from "sonner";
import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {createSupabaseClient} from "@supabase/auth-helpers-shared";
import {createClient} from "@/lib/supabase/client";

type DialogProps = {
    open: boolean
    setOpen: (isOpen: boolean) => void
    habitsId: number
}

const HabitTrackDialog = ({open, setOpen, habitsId}: DialogProps) => {
    const cancelButtonRef = useRef(null)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={'bg-red-500 hover:bg-primary w-full'}>Track Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w:64">
                    <DialogHeader>
                        <DialogTitle>Well Done! 🎉</DialogTitle>
                        <DialogDescription>
                            Add a track to your habit to keep track of your progress.
                        </DialogDescription>
                    </DialogHeader>
                    <HabitTrackForm habitsId={habitsId}/>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button>Track Now</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Well Done! 🎉</DrawerTitle>
                    <DrawerDescription>
                        Add a track to your habit to keep track of your progress.
                    </DrawerDescription>
                </DrawerHeader>
                <HabitTrackForm habitsId={habitsId}/>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

const TriggersFormSchema = z.object({
    triggers: z.array(z.object({
        name: z.string().min(3, 'Name must be at least 3 characters').max(255, 'Name must be at most 255 characters'),
    }))
});

const StepsFormSchema = z.object({
    steps: z.array(z.object({
        name: z.string().min(3, 'Step must be at least 3 characters').max(255, 'Name must be at most 255 characters'),
        checked: z.boolean()
    }))
});

const ReflectionFormSchema = z.object({
    reflections: z.array(z.object({
        answer: z.string().min(3, 'Answer must be at least 3 characters')
    }))
});

const HabitTrackForm = ({habitsId} : {habitsId: number}) => {
    const [triggers, setTriggers] = useState<z.infer<typeof TriggersFormSchema>>({triggers: [{name: ''}]})
    const [activeTab, setActiveTab] = useState('triggers'); // Initialize with the default tab
    const [questions, setQuestions] = useState<string[]>([
        'Did you perform well?', 'Did you face some issues to accomplish this task?'
    ])
    const supabase = createClient()

    const handleTabChange = (newValue: string) => {
        setActiveTab(newValue); // Update state to the new tab value
    };

    const form = useForm({
        resolver: zodResolver(TriggersFormSchema),
        defaultValues: {
            triggers: [{name: ''}]
        }
    });

    const formSteps = useForm({
        resolver: zodResolver(StepsFormSchema),
        defaultValues: {
            steps: [{name: '', checked: false}]
        }
    });

    const formReflections = useForm({
        resolver: zodResolver(ReflectionFormSchema),
        defaultValues: {
            reflections: [{answer: ''}]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: formSteps.control,
        name: "steps"
    });

    async function onSubmitTriggers(data: z.infer<typeof TriggersFormSchema>) {
        const body = data.triggers.map(trigger => {
            return { 'trigger':trigger.name, 'habitsId': habitsId }
        })

        const { data: habitsRecord, error } = await supabase
            .from('habitsRecords')
            .insert(body)
            .select()
        if (error) {
            console.log(error)
            toast.error("Error adding a habit's record", {
                description: new Date().toLocaleString(),
            })
        }
        toast.success("Triggers have been set", {
            description: new Date().toLocaleString(),
        })
        setActiveTab('steps')
    }

    function onSubmitSteps(data: z.infer<typeof StepsFormSchema>) {
        toast.success("Steps have been set", {
            description: new Date().toLocaleString(),
        })
        console.log(data)
        setActiveTab('reflect')
    }

    function onSubmitReflections(data: z.infer<typeof ReflectionFormSchema>) {
        toast.success("Reflections have been set", {
            description: new Date().toLocaleString(),
        })
        console.log(data)
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="triggers">Triggers</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="reflect">Reflect</TabsTrigger>
            </TabsList>
            <TabsContent value="triggers">
                <Card>
                    <CardHeader>
                        <CardTitle className={'flex justify-between'}>
                            <div>Triggers</div>
                            <Button variant={'outline'} size={'sm'}
                                    onClick={() => setTriggers({triggers: [...triggers.triggers, {name: ''}]})}>Add
                                Trigger</Button>
                        </CardTitle>
                        <CardDescription>
                            Write down a trigger for your activity. A trigger can be different things: a visual cue like
                            a sticky note, a time of day, or a specific action.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitTriggers)} className="w-full space-y-6">
                                <div className="space-y-4  rounded-lg border p-4 ">
                                    {triggers.triggers && triggers.triggers.map((trigger, index) => (
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={`triggers.${index}.name`}
                                            render={({field}) => (
                                                <FormItem className="flex flex-row  justify-between w-full space-y-0">
                                                    <div className={'w-full flex flex-col justify-center'}>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder="Trigger"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription className={'text-xs text-red-600'}>
                                                            {form.formState.errors.triggers?.[index]?.name?.message}
                                                        </FormDescription>
                                                    </div>
                                                    <Button
                                                        variant="link"
                                                        size="icon"
                                                        onClick={() => setTriggers({triggers: triggers.triggers.filter((_, i) => i !== index)})}
                                                        className={`overflow-hidden rounded-full bg-transparent`}
                                                    >
                                                        <X className={'text-red-700'}/>
                                                    </Button>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={form.handleSubmit(onSubmitTriggers)}>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="steps">
                <Card>
                    <CardHeader>
                        <CardTitle className={'flex justify-between'}>
                            <div>Steps</div>
                            <Button variant={'outline'} size={'sm'}
                                    onClick={() => append({name: '', checked: false})}>Add Step</Button>
                        </CardTitle>
                        <CardDescription>
                            Write down a trigger for your activity. A trigger can be different things: a visual cue like
                            a sticky note, a time of day, or a specific action.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <Form {...formSteps}>
                            <form onSubmit={formSteps.handleSubmit(onSubmitSteps)} className="w-full space-y-6">
                                <div className="gap-2 flex flex-col rounded-lg border p-4 ">
                                    {fields && fields.map((step, index) => (
                                        <div className={'space-y-0 w-full flex items-center gap-2'} key={index}>
                                            <FormField
                                                key={index}
                                                control={formSteps.control}
                                                name={`steps.${index}.name`}
                                                render={({field}) => (
                                                    <FormItem className="flex flex-row justify-between w-full space-y-0">
                                                        <div className={'w-full flex flex-col justify-center'}>
                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    placeholder="Step"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className={'text-xs text-red-600'}>
                                                                {formSteps.formState.errors.steps?.[index]?.name?.message}
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                key={index+'check'}
                                                control={formSteps.control}
                                                name={`steps.${index}.checked`}
                                                render={({field}) => (
                                                    <FormItem className="flex flex-row items-center space-y-0">
                                                        <div className={'w-full flex flex-col'}>
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                        </div>
                                                        <Button
                                                            variant="link"
                                                            size="icon"
                                                            onClick={() => remove(index)}
                                                            className={`overflow-hidden rounded-full bg-transparent`}
                                                        >
                                                            <X className={'text-red-700'}/>
                                                        </Button>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={formSteps.handleSubmit(onSubmitSteps)}>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="reflect">
                <Card>
                    <CardHeader>
                        <CardTitle>Reflect</CardTitle>
                        <CardDescription>
                            Questions to reflect on your habit.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Form {...formReflections}>
                            <form onSubmit={formReflections.handleSubmit(onSubmitReflections)} className="w-full space-y-6">
                                <div className="space-y-4  rounded-lg border p-4 ">
                                    {questions.map((question, index) => (
                                        <FormField
                                            key={index}
                                            control={formReflections.control}
                                            name={`reflections.${index}.answer`}
                                            render={({field}) => (
                                                <FormItem className="flex flex-col justify-between w-full space-y-2 ">
                                                    <span className={'text-xs text-green-700'}>{question}</span>
                                                    <div className={'w-full flex flex-col justify-center'}>
                                                        <FormControl>
                                                            <Textarea
                                                                className={'resize-none'}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription className={'text-xs text-red-600'}>
                                                            {formReflections.formState.errors.reflections?.[index]?.answer!.message}
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={formReflections.handleSubmit(onSubmitReflections)}>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default HabitTrackDialog
