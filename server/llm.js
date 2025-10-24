require("dotenv").config({ path: "../.env" });
const Anthropic = require("@anthropic-ai/sdk");
const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
    const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001", // Model that will be in use for quizzes, grades
    max_tokens: 1024,
    messages: [
    {
        role: "user", //test
        content: "Say hello and tell me you're Claude!",
    },
        {
        role: "user", //test 
        content: "Whatt's the weather like for Charlotte, NC",
    },
    ],
});
    console.log(message.content[0].text);
}
main().catch(console.error);

//The connection works, so now we need to take the user data's from the frontend 
// Then creating a quiz baesd off their prompt
// Then using that quiz, posting to the frontend IN ORDER & allow the user to answer Q's
// Then we have to SOMEHOWE validate those answers (perhaps using Claude itself)
// Then FEEDBACK has to be given. 
// Loops until the quiz ends.