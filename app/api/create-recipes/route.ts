import { RecipesCreationSchema} from "@/schemas/schemas";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { theme,ingredients,restrictions,cookingTime,levelOfDifficulty } = RecipesCreationSchema.parse(body);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a recipe developer." },
                { role: "user", content: `Create a Recipe on theme ${theme} with ingredients ${ingredients} with cookingTime ${cookingTime} with restrictions ${restrictions} and level of diffculty ${levelOfDifficulty}.` }
            ],
        });

        console.log(completion.choices[0]);

        return NextResponse.json(completion, { status: 200 });

    } catch (error) {
        console.error("RECIPE GENERATOR ISSUE", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request) {

    // console.log(req.body)
    return NextResponse.json({ message: "Recipe Generator" }, { status: 200 });
} 