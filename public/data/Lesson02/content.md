# Lesson 2: Anatomy of a Prompt — System, User, and Assistant Roles

This lesson delves into the crucial concept of prompt engineering: understanding the different roles within a prompt and how they influence the Large Language Model (LLM)'s response.  We'll explore the System, User, and Assistant roles, focusing on their functionalities and how to effectively utilize them to generate desired outputs.

##  The Three Roles: System, User, and Assistant

Effective prompt engineering relies on understanding and leveraging the distinct roles within a prompt.  Think of it like a conversation between three distinct entities:

* **System:** Sets the stage and provides context. It defines the overall persona, tone, and constraints for the interaction.  Think of it as the rules of the game.
* **User:**  The user's input; the question, request, or task being given to the LLM.  This is where you state your specific needs.
* **Assistant:** The LLM's response. This is the output generated based on the system instructions and the user's input.


## Understanding Each Role in Detail

### 1. The System Role

The system role acts as a foundational instruction set for the LLM. It dictates the behavior and personality of the assistant.  A well-crafted system prompt is critical for steering the LLM towards the desired outcome.  Here are some key aspects:

* **Defining Persona:** Specify the assistant's role (e.g., helpful assistant, creative writer, technical expert).
* **Setting Tone:**  Control the overall tone (e.g., formal, informal, humorous, serious).
* **Establishing Constraints:**  Define limitations or boundaries (e.g., length restrictions, specific formats, prohibited topics).
* **Providing Background Information:** Offer context that helps the LLM understand the task better.


**Example:**

```
System: You are a helpful and informative travel agent specializing in eco-tourism.  You are known for providing detailed and concise itineraries that prioritize sustainable practices.  Your responses should always include specific recommendations for eco-friendly accommodations, transportation, and activities. Avoid suggesting activities that harm the environment.
```

### 2. The User Role

The user role is where you present your specific request or query.  Clarity and precision are crucial here.  Ambiguity can lead to unpredictable or unsatisfactory results.  Consider these best practices:

* **Be Specific:** Avoid vague language. Clearly articulate your needs and expectations.
* **Provide Context:** If necessary, provide additional information relevant to the request.
* **Specify Desired Format:**  If you need a specific format (e.g., JSON, list, poem), explicitly state it.
* **Iterative Refinement:** Don't be afraid to iterate and refine your user prompt based on the initial responses.

**Example:**

```
User:  Plan a 7-day eco-tourism trip to Costa Rica for two adults, focusing on wildlife viewing and rainforest experiences.  Our budget is $5000.
```

### 3. The Assistant Role

The assistant role is the LLM's response.  This is where the LLM generates the output based on the system and user prompts.  While you don't directly control the assistant role, the quality of the system and user prompts directly influences the quality of the assistant's response.

**Example (Illustrative Assistant Response):**

```
Assistant:  Here is a suggested 7-day eco-tourism itinerary for Costa Rica, focusing on wildlife viewing and rainforest experiences, within your $5000 budget:

Day 1: Arrive in San Jose, transfer to Pacuare River Lodge (eco-lodge).
Day 2: Whitewater rafting on the Pacuare River.
Day 3: Hike through the rainforest, guided wildlife tour.
Day 4: Transfer to La Fortuna, Arenal Volcano area.
Day 5: Ziplining through the rainforest canopy.
Day 6: Visit a local coffee plantation with sustainable practices.
Day 7: Depart from San Jose.


(Detailed descriptions of accommodations, transportation, and activities would follow)
```


##  Putting it All Together: A Complete Example

Let's combine the examples above into a complete prompt:

```
System: You are a helpful and informative travel agent specializing in eco-tourism.  You are known for providing detailed and concise itineraries that prioritize sustainable practices.  Your responses should always include specific recommendations for eco-friendly accommodations, transportation, and activities. Avoid suggesting activities that harm the environment.

User:  Plan a 7-day eco-tourism trip to Costa Rica for two adults, focusing on wildlife viewing and rainforest experiences.  Our budget is $5000.
```

This structured prompt clearly defines the roles and expectations, leading to a more accurate and relevant response from the LLM.


##  Practice Exercises

1.  Craft a system prompt for an LLM acting as a Shakespearean sonnet writer.
2.  Write a user prompt requesting a summary of a specific scientific paper.
3.  Experiment with different system prompts to observe how they affect the LLM's response to the same user prompt.


By mastering the art of crafting effective system and user prompts, you unlock the full potential of LLMs and pave the way for generating high-quality, relevant, and insightful outputs.
