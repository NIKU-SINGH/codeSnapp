import OpenAI from "openai";
import * as dotenv from "dotenv";

// Load environment variables from .env file in the parent directory
dotenv.config({
  path: "../.env",
});

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define an asynchronous function to explain code
export const explainCode = async (codePrompt: string): Promise<string | null> => {
  // console.log("Code prompt is this", codePrompt);

  // Create a prompt that includes the code to explain
  const prompt = `Explain the following code sample and generate the output if needed in maximum 50 words ${codePrompt}`;

  // Use the OpenAI API to generate an explanation
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // max_tokens: 50,
    messages: [{ role: "user", content: prompt }],
  });

  // Extract the explanation from the API response
  let promptAnswer = response.choices[0].message.content;
  // console.log(promptAnswer);

  return promptAnswer;
};

// Example usage of the explainCode function
// explainCode("var a=10;var b=20; console.log(a+b)")
