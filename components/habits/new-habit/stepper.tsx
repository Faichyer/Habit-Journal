'use client'

import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {NameStep} from "@/components/habits/new-habit/name-step";
import {ImageStep} from "@/components/habits/new-habit/image-step";
import {RhythmStep} from "@/components/habits/new-habit/rhythm-step";
import {defineStepper} from "@stepperize/react";
import React from 'react';
import {Separator} from "@/components/ui/separator";
import useIsMobile from "@/hooks/use-is-mobile";

const {useStepper, steps} = defineStepper(
    {
        id: 'details',
        title: 'Habits Details',
        description: 'Enter your habits details',
    },
    {
        id: 'image',
        title: 'Image',
        description: 'Enter your image',
    },
    {id: 'rhythm', title: 'Choose your habit rhythm', description: 'Rhythm'}
);

export function Stepper() {
    const stepper = useStepper();
    const isMobile = useIsMobile()


    return (
        <div className="space-y-6 p-6 border rounded-lg w-full">
            <div className="flex justify-between gap-1">
                <h2 className="text-lg font-medium">Create your new habit</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Step {stepper.current.index + 1} of {steps.length}
                    </span>
                    <div/>
                </div>
            </div>
            <nav aria-label="New Habit Steps" className="group my-4">
                <ol
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    aria-orientation={isMobile ? "vertical" : "horizontal"}
                >
                    {stepper.all.map((step, index, array) => (
                        <React.Fragment key={step.id}>
                            <li className="flex items-center gap-4 flex-shrink-0">
                                <Button
                                    type="button"
                                    role="tab"
                                    variant={
                                        index <= stepper.current.index ? 'default' : 'secondary'
                                    }
                                    aria-current={
                                        stepper.current.id === step.id ? 'step' : undefined
                                    }
                                    aria-posinset={index + 1}
                                    aria-setsize={steps.length}
                                    aria-selected={stepper.current.id === step.id}
                                    className="flex size-10 items-center justify-center rounded-full"
                                    onClick={() => stepper.goTo(step.id)}
                                >
                                    {index + 1}
                                </Button>
                                <span className="text-sm font-medium">{step.title}</span>
                            </li>
                            {
                                isMobile ? (
                                    <div className="flex gap-4">
                                        {index < array.length - 1 && (
                                            <div
                                                className="flex justify-center"
                                                style={{
                                                    paddingInlineStart: '1.25rem',
                                                }}
                                            >
                                                <Separator
                                                    orientation="vertical"
                                                    className={`w-[1px] h-full ${
                                                        index < stepper.current.index ? 'bg-primary' : 'bg-muted'
                                                    }`}
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 my-4">
                                            {stepper.current.id === step.id &&
                                                stepper.switch({
                                                    details: () => <NameStep/>,
                                                    image: () => <ImageStep/>,
                                                    rhythm: () => <RhythmStep/>,
                                                })}
                                        </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        {index < array.length - 1 && (
                                            <Separator
                                                className={`flex-1 ${
                                                    index < stepper.current.index ? 'bg-primary' : 'bg-muted'
                                                }`}
                                            />
                                        )}
                                    </React.Fragment>
                                )
                            }

                        </React.Fragment>
                    ))}
                </ol>
            </nav>
            <div className="space-y-4">
                {!isMobile && stepper.switch({
                    details: () => <NameStep/>,
                    image: () => <ImageStep/>,
                    rhythm: () => <RhythmStep/>,
                })}
                {!stepper.isLast ? (
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="secondary"
                            onClick={stepper.prev}
                            disabled={stepper.isFirst}
                        >
                            Back
                        </Button>
                        <Button onClick={stepper.next}>
                            {stepper.isLast ? 'Complete' : 'Next'}
                        </Button>
                    </div>
                ) : (
                    <Button onClick={stepper.reset}>Reset</Button>
                )}
            </div>
        </div>
    )
}

