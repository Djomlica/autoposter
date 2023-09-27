const WPAPI = require("wpapi");
const { Configuration, OpenAIApi } = require("openai");
const { createClient } = require("pexels");
const configuration = new Configuration({
  apiKey: "/*/*/*/*/*/*/*/*/*/*/*/*/",
});

const openai = new OpenAIApi(configuration);

const openaiChatCompletion = async (messages) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    frequency_penalty: 0.01,
    presence_penalty: 0.01,
  });

  return response.data.choices[0].message.content;
};

const generateTitle = async (articleTitle, maxRetries = 3) => {
  try {
    const userMessage = `Suggest a compelling title for a blog post about how to ${articleTitle}, write it in stringify object with a first item title,
        give me simple code without any commentary.`;

    let parsedResponse;

    // Retry loop with a limited number of retries
    for (let retries = 0; retries <= maxRetries; retries++) {
      const res = await openaiChatCompletion([
        {
          role: "user",
          content: userMessage,
        },
      ]);

      parsedResponse = JSON.parse(res);

      // Check if the response contains a title
      if (parsedResponse.title) {
        break; // Break out of the loop if a title is present
      } else {
        console.log("Incomplete title response, retrying...");
      }
    }

    if (!parsedResponse.title) {
      throw new Error("Maximum retries exceeded or incomplete title response");
    }

    return parsedResponse.title; // Return the generated title
  } catch (e) {
    console.log(e);
    throw e; // Propagate the error if maximum retries exceeded or other error occurred
  }
};

const generateIntroduction = async (title, maxRetries = 3) => {
  try {
    const userMessage = `Suggest a compelling introduction for a blog post about ${title}, write it in stringify object with a first item introduction,
        give me simple code without any commentary.`;

    let introductionResponse;

    // Retry loop with a limited number of retries
    for (let retries = 0; retries <= maxRetries; retries++) {
      const res = await openaiChatCompletion([
        {
          role: "user",
          content: userMessage,
        },
      ]);

      introductionResponse = JSON.parse(res);

      // Check if the response contains an introduction
      if (introductionResponse.introduction) {
        break; // Break out of the loop if an introduction is present
      } else {
        console.log("Incomplete introduction response, retrying...");
      }
    }

    if (!introductionResponse.introduction) {
      throw new Error("Maximum retries exceeded or incomplete introduction response");
    }

    return introductionResponse.introduction; // Return the generated introduction
  } catch (e) {
    console.log(e);
    throw e; // Propagate the error if maximum retries exceeded or other error occurred
  }
};

const generateHeading = async (articleTitle, maxRetries = 3) => {
  try {
    const userMessage = `Continue writing a human-friendly heading (without repeating yourself)
     for a blog post introduction about ${articleTitle}, write it in stringify object with a first item heading,
      respond as a simple stringify object and include no other commentary.`;

    let headingResponse;

    // Retry loop with a limited number of retries
    for (let retries = 0; retries <= maxRetries; retries++) {
      const res = await openaiChatCompletion([
        {
          role: "user",
          content: userMessage,
        },
      ]);

      try {
        headingResponse = JSON.parse(res);

        // Check if the response contains a heading
        if (headingResponse.heading) {
          break; // Break out of the loop if a heading is present
        } else {
          console.log("Incomplete heading response, retrying...");
        }
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        console.log("Retrying...");
        continue; // Continue to the next iteration of the retry loop
      }
    }

    if (!headingResponse.heading) {
      throw new Error("Maximum retries exceeded or incomplete heading response");
    }

    return headingResponse.heading; // Return the generated heading
  } catch (e) {
    console.log(e);
    throw e; // Propagate the error if maximum retries exceeded or other error occurred
  }
};


const generateContent = async (heading, maxRetries = 3) => {
  try {
    const userMessage = `Continue writing the section with pure words
     for a blog post connecting to the "${heading}", write it in stringify object
      with a first item content, write it in a strigify json format and include no other commentary.`;

    let contentResponse;

    // Retry loop with a limited number of retries
    for (let retries = 0; retries <= maxRetries; retries++) {
      const res = await openaiChatCompletion([
        {
          role: "user",
          content: userMessage,
        },
      ]);

      contentResponse = JSON.parse(res);

      // Check if the response contains content
      if (contentResponse.content) {
        break; // Break out of the loop if content is present
      } else {
        console.log("Incomplete content response, retrying...");
      }
    }

    if (!contentResponse.content) {
      throw new Error("Maximum retries exceeded or incomplete content response");
    }

    return contentResponse.content; // Return the generated content
  } catch (e) {
    console.log(e);
    throw e; // Propagate the error if maximum retries exceeded or other error occurred
  }
};



const main = async () => {
  try {
    const generatedTitle = await generateTitle("Lose Fat");
    console.log("Title:", generatedTitle);

    const generatedIntroduction = await generateIntroduction(generatedTitle);
    console.log("Introduction:", generatedIntroduction);

    const generatedHeading = await generateHeading(generatedTitle);
    console.log("Heading:", generatedHeading);

    const generatedContent = await generateContent(generatedHeading);
    console.log("Content:", generatedContent);

    // You can call other functions here to generate additional sections if needed

  } catch (error) {
    console.error(error);
    throw error;
  }
};


main();
