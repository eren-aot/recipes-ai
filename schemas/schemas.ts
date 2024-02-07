import {z} from "zod";

export const RecipesCreationSchema = z.object({
    theme : z.string().min(5,"Theme is required more than 5 characters"),
    ingredients: z.string(),
    restrictions : z.string(),
    cookingTime : z.enum(["10min","20min","30min"]),
    numberOfIngredients : z.enum(["5","7","10"]),
    levelOfDifficulty : z.enum(["easy","medium","hard"])
})