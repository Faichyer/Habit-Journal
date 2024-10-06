"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { HabitsRecordsProps, QuestionProps } from "@/types/habit.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const TriggersFormSchema = z.object({
	trigger: z.object({
		name: z
			.string()
			.min(3, "Trigger must be at least 3 characters")
			.max(255, "Trigger must be at most 255 characters"),
	}),
});

const StepsFormSchema = z.object({
	steps: z.array(
		z.object({
			name: z
				.string()
				.min(3, "Step must be at least 3 characters")
				.max(255, "Name must be at most 255 characters"),
			checked: z.boolean(),
		}),
	),
});

const ReflectionFormSchema = z.object({
	reflections: z.array(
		z.object({
			answer: z.string().min(3, "Answer must be at least 3 characters"),
			questionId: z.number(),
		}),
	),
});

export const HabitTrackForm = ({
	habitsId,
	questions,
}: { habitsId: string; questions: QuestionProps[] }) => {
	const [trigger, setTrigger] = useState<z.infer<typeof TriggersFormSchema>>({
		trigger: { name: "" },
	});
	const [activeTab, setActiveTab] = useState("trigger"); // Initialize with the default tab
	const [habitsRecord, setHabitsRecord] = useState<HabitsRecordsProps | null>(
		null,
	);
	const supabase = createClient();

	const handleTabChange = (newValue: string) => {
		setActiveTab(newValue); // Update state to the new tab value
	};

	const form = useForm({
		resolver: zodResolver(TriggersFormSchema),
		defaultValues: {
			trigger: { name: "" },
		},
	});

	const formSteps = useForm({
		resolver: zodResolver(StepsFormSchema),
		defaultValues: {
			steps: [{ name: "", checked: false }],
		},
	});

	const formReflections = useForm({
		resolver: zodResolver(ReflectionFormSchema),
		defaultValues: {
			reflections: questions.map((question) => ({
				answer: "", // Initial empty answer for each question
				questionId: question.id, // Automatically link questionId for each answer
			})),
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: formSteps.control,
		name: "steps",
	});

	async function onSubmitTriggers(data: z.infer<typeof TriggersFormSchema>) {
		const body = [{ trigger: data.trigger.name, habits_id: habitsId }];

		const { data: triggerResponse, error } = await supabase
			.from("habits_records")
			.insert(body)
			.select()
			.single();
		if (error) {
			console.log(error);
			toast.error("Error adding a habit's record", {
				description: new Date().toLocaleString(),
			});
		}
		if (!error) {
			toast.success("Triggers have been set", {
				description: new Date().toLocaleString(),
			});
			console.log(triggerResponse);
			setHabitsRecord(triggerResponse as HabitsRecordsProps);
			setActiveTab("steps");
		}
	}

	async function onSubmitSteps(data: z.infer<typeof StepsFormSchema>) {
		if (!habitsRecord) {
			toast.error("Please set the trigger before adding steps");
			setActiveTab("trigger");
		} else {
			const body = data.steps.map((step) => ({
				name: step.name,
				completed: step.checked,
				habits_records_id: habitsRecord.id,
			}));

			const { data: tracksResponse, error } = await supabase
				.from("tracks")
				.insert(body)
				.select();
			if (error) {
				console.log(tracksResponse);
				toast.error("Error adding tracks", {
					description: new Date().toLocaleString(),
				});
			}
			if (!error) {
				toast.success("Steps have been set", {
					description: new Date().toLocaleString(),
				});
				console.log(data);
				setActiveTab("reflect");
			}
		}
	}

	async function onSubmitReflections(
		data: z.infer<typeof ReflectionFormSchema>,
	) {
		if (!habitsRecord) {
			toast.error("Please set the trigger before adding reflection");
			setActiveTab("trigger");
		} else {
			const body = data.reflections.map((reflection) => ({
				answer: reflection.answer,
				habits_records_id: habitsRecord.id,
				question_id: reflection.questionId,
			}));

			const { data: tracksResponse, error } = await supabase
				.from("reflections")
				.insert(body)
				.select();

			if (error) {
				console.log(error);
				toast.error("Error adding reflections", {
					description: new Date().toLocaleString(),
				});
			} else {
				toast.success("Reflections have been set", {
					description: new Date().toLocaleString(),
				});
			}
		}
	}

	return (
		<Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="trigger">Trigger</TabsTrigger>
				<TabsTrigger value="steps">Steps</TabsTrigger>
				<TabsTrigger value="reflect">Reflect</TabsTrigger>
			</TabsList>
			<TabsContent value="trigger">
				<Card>
					<CardHeader>
						<CardTitle className={"flex justify-between"}>
							<div>Trigger</div>
						</CardTitle>
						<CardDescription>
							Write down a trigger for your activity. A trigger can be different
							things: a visual cue like a sticky note, a time of day, or a
							specific action.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-8">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmitTriggers)}
								className="w-full space-y-6"
							>
								<div className="space-y-4  rounded-lg border p-4 ">
									{trigger.trigger && (
										<FormField
											control={form.control}
											name={`trigger.name`}
											render={({ field }) => (
												<FormItem className="flex flex-row  justify-between w-full space-y-0">
													<div
														className={"w-full flex flex-col justify-center"}
													>
														<FormControl>
															<Input
																type="text"
																placeholder="Trigger"
																{...field}
															/>
														</FormControl>
														<FormDescription className={"text-xs text-red-600"}>
															{form.formState.errors.trigger?.name?.message}
														</FormDescription>
													</div>
												</FormItem>
											)}
										/>
									)}
								</div>
							</form>
						</Form>
					</CardContent>
					<CardFooter>
						<Button onClick={form.handleSubmit(onSubmitTriggers)}>
							Save changes
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="steps">
				<Card>
					<CardHeader>
						<CardTitle className={"flex justify-between"}>
							<div>Steps</div>
							<Button
								variant={"outline"}
								size={"sm"}
								onClick={() => append({ name: "", checked: false })}
							>
								Add Step
							</Button>
						</CardTitle>
						<CardDescription>
							Write down a trigger for your activity. A trigger can be different
							things: a visual cue like a sticky note, a time of day, or a
							specific action.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-8">
						<Form {...formSteps}>
							<form
								onSubmit={formSteps.handleSubmit(onSubmitSteps)}
								className="w-full space-y-6"
							>
								<div className="gap-2 flex flex-col rounded-lg border p-4 ">
									{fields &&
										fields.map((step, index) => (
											<div
												className={"space-y-0 w-full flex items-center gap-2"}
												key={index}
											>
												<FormField
													key={index}
													control={formSteps.control}
													name={`steps.${index}.name`}
													render={({ field }) => (
														<FormItem className="flex flex-row justify-between w-full space-y-0">
															<div
																className={
																	"w-full flex flex-col justify-center"
																}
															>
																<FormControl>
																	<Input
																		type="text"
																		placeholder="Step"
																		{...field}
																	/>
																</FormControl>
																<FormDescription
																	className={"text-xs text-red-600"}
																>
																	{
																		formSteps.formState.errors.steps?.[index]
																			?.name?.message
																	}
																</FormDescription>
															</div>
														</FormItem>
													)}
												/>
												<FormField
													key={index + "check"}
													control={formSteps.control}
													name={`steps.${index}.checked`}
													render={({ field }) => (
														<FormItem className="flex flex-row items-center space-y-0">
															<div className={"w-full flex flex-col"}>
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
																<X className={"text-red-700"} />
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
						<Button onClick={formSteps.handleSubmit(onSubmitSteps)}>
							Save changes
						</Button>
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
							<form
								onSubmit={formReflections.handleSubmit(onSubmitReflections)}
								className="w-full space-y-6"
							>
								<div className="space-y-4  rounded-lg border p-4 ">
									{questions.map((question, index) => (
										<FormField
											key={index}
											control={formReflections.control}
											name={`reflections.${index}.answer`}
											render={({ field }) => (
												<FormItem className="flex flex-col justify-between w-full space-y-2">
													<span className={"text-xs text-green-700"}>
														{question.question}
													</span>
													<div
														className={"w-full flex flex-col justify-center"}
													>
														<FormControl>
															<Textarea
																className={"resize-none"}
																placeholder="Your answer"
																{...field}
															/>
														</FormControl>
														<FormDescription className={"text-xs text-red-600"}>
															{
																formReflections.formState.errors.reflections?.[
																	index
																]?.answer?.message
															}
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
						<Button onClick={formReflections.handleSubmit(onSubmitReflections)}>
							Save changes
						</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
};
