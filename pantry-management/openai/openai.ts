import OpenAI from "openai";

export const client = new OpenAI({ // creates an openai client
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});