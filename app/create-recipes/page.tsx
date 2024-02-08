"use client"

import { Combobox } from '@/components/ComboBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RecipesCreationSchema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import axios from "axios";

type ReceipesInput = z.infer<typeof RecipesCreationSchema>;

const CreateRecipesPage = () => {

    const form = useForm<ReceipesInput>({
        resolver: zodResolver(RecipesCreationSchema),
        defaultValues: {
            theme: "",
            ingredients: "",
            restrictions: "",
            cookingTime: "20min",
            numberOfIngredients: "5",
            levelOfDifficulty: "medium"
        }
    });

    const [cookValue, setCookValue] = React.useState<"10min" | "20min" | "30min">("20min"); // State to store the selected value for the form
    const [numberValue, setNumberValue] = React.useState<"5" | "7" | "10">("5"); // State to store the selected value for the form
    const [levelValue, setLevelValue] = React.useState<"easy" | "medium" | "hard">("medium"); // State to store the selected value for the form


    const cookTime = [
        {
            value: "10min",
            label: "Quick(10 minutes)"
        },
        {
            value: "20min",
            label: "Medium(20-30 minutes)"
        },
        {
            value: "30min",
            label: "Longer(30+ minutes)"
        }
    ]
    const noOfIngredients = [
        {
            value: "5",
            label: "Less than 5 ingredients"
        },
        {
            value: "7",
            label: "5-10 ingredients"
        },
        {
            value: "10",
            label: "10+ ingredients"
        }
    ]
    const level = [
        {
            value: "easy",
            label: "Easy"
        },
        {
            value: "medium",
            label: "Medium"
        },
        {
            value: "hard",
            label: "Hard"
        }
    ]

    const onSubmit = async (values: ReceipesInput) => {

        console.log(values);

        const response  = await axios.post("/api/create-recipes",values);
        console.log(response.data)
    }

    useEffect(() => {
        // Set form values when the dependent values change
        form.setValue('cookingTime', cookValue);
        form.setValue('numberOfIngredients', numberValue);
        form.setValue('levelOfDifficulty', levelValue);
    }, [form, cookValue, numberValue, levelValue]);

    return (
        <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 '>
            <Card className='w-[400px]'>
                <CardHeader>
                    <CardTitle>
                        Generate Recipes
                    </CardTitle>
                    <CardDescription>
                        Generate Recipes using AI
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='theme'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Theme</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Halloween cookies, dinosaur nuggests etc' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='ingredients'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Key Ingredients - Optional
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Chocalate Chips,cheese,cherry tomatoes etc.' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className='flex gap-2 items-center justify-between'>
                                <Label >
                                    Cooking Time
                                </Label>
                                <Combobox data={cookTime} label="Cooking time" formvalue = {cookValue} setFormValue = {setCookValue} />
                            </div>

                            <FormField
                                control={form.control}
                                name='restrictions'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Restictions - Optional
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Gluten-free,dairy-free,vegetratian,vegan,nut-free,' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className='flex gap-2 items-center justify-between'>
                                <Label>
                                    Number of Ingredients
                                </Label>
                                <Combobox data={noOfIngredients} label="Number of Ingredients" formvalue = {numberValue} setFormValue = {setNumberValue} />
                            </div>
                            <div className='flex gap-2 items-center justify-between'>
                                <Label>
                                    Level of Difficulty
                                </Label>
                                <Combobox data={level} label="Level of Difficulty" formvalue = {levelValue} setFormValue = {setLevelValue} />
                            </div>

                            <Button type='submit'>
                                Generate Recipes
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateRecipesPage