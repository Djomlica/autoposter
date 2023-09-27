# OpenAI GPT-3.5-turbo Keyword-Based Content Generation

This repository contains a Node.js application that utilizes the OpenAI API and the `gpt-3.5-turbo` model to generate dynamic content based on a single keyword. With this application, you can easily create titles, introductions, headings, and content sections for various purposes by providing a keyword.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/your-repository.git

2. Navigate to the project directory:

3. Install the required Node.js packages:

npm install

## Usage

Create an OpenAI API key by following the [OpenAI API Documentation](https://beta.openai.com/docs/api-reference/authentication).
Configure your API key in 

const configuration = new Configuration({
    apiKey: "your-key"
})

Edit the index.js file using **ctrl + f** find **main()** function inside there you can find the keyword you would like to import.

The application will output the generated title, introduction, heading, and content sections based on the provided keyword.

For me outputed something like this:

![App Screenshot](./screenshot.png)