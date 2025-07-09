# Lesson 14: Building a Simple RAG Agent with LangChain

This lesson introduces you to building a Retrieval Augmented Generation (RAG) agent using LangChain.  RAG agents leverage external knowledge sources to answer questions more accurately and comprehensively than models trained solely on their initial datasets. We'll construct a basic RAG pipeline, emphasizing best practices and highlighting potential challenges.

## Learning Objectives

By the end of this lesson, you will be able to:

* Understand the core components of a LangChain RAG agent.
* Implement a simple RAG pipeline using LangChain.
* Load and process a local document for retrieval.
* Utilize vector databases for efficient similarity search.
* Evaluate the performance of your RAG agent.
* Identify areas for improvement and further exploration.


## Prerequisites

* Basic Python programming knowledge.
* Familiarity with LangChain concepts (LLMs, prompts, chains).
*  A working Python environment with the following libraries installed:
    ```bash
    pip install langchain openai chromadb tiktoken
    ```
* (Optional but recommended) An OpenAI API key.  If you don't have one, instructions are available on the OpenAI website.  We'll be using `openai` as our LLM, but you can easily substitute others.


##  Building the RAG Agent

Our RAG agent will consist of three main components:

1. **Document Loader:** Loads and processes our knowledge base.
2. **Vector Database:** Stores embeddings of our documents for efficient similarity search.
3. **Retrieval and Generation Chain:**  Retrieves relevant documents and uses them to generate an answer.


### 1. Loading Documents

We'll start by loading a simple text file as our knowledge base.  Replace `"your_document.txt"` with the actual path to your document.  Error handling is crucial here; robust applications should anticipate missing files or other issues.

```python
from langchain.document_loaders import TextLoader

loader = TextLoader("your_document.txt")
documents = loader.load()

#Error Handling Example:
try:
    loader = TextLoader("your_document.txt")
    documents = loader.load()
except FileNotFoundError:
    print("Error: Document not found. Please provide a valid path.")
    exit()

```


### 2. Creating Embeddings and Storing in a Vector Database

We'll use ChromaDB as our vector database.  It's lightweight and easy to integrate with LangChain.  You can substitute other vector databases if you prefer.  The choice of embedding model influences accuracy; experiment to find what works best for your data.

```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

embeddings = OpenAIEmbeddings() #Or another suitable embedding model
db = Chroma.from_documents(documents, embeddings)

```

**Important Note:**  Using `OpenAIEmbeddings` requires setting your OpenAI API key as an environment variable (e.g., `OPENAI_API_KEY`).


### 3. Building the Retrieval and Generation Chain

Finally, we'll combine retrieval and generation into a LangChain chain.  We use `db.as_retriever()` to get relevant documents and then pass them to an LLM for answer generation.

```python
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

llm = OpenAI(temperature=0) # Adjust temperature as needed
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=db.as_retriever())

query = "What is the main topic of the document?" #Replace with your query
result = qa({"query": query})
print(result["result"])

```


##  Expanding the Agent

This is a basic example.  You can significantly improve your RAG agent by:

* **Using more sophisticated document loaders:**  Handle various file formats (PDF, DOCX) using appropriate loaders.
* **Exploring different vector databases:**  Compare performance with other options like FAISS, Pinecone, Weaviate.
* **Improving the retrieval strategy:** Experiment with different retriever configurations in LangChain to optimize recall and precision.
* **Implementing advanced prompting techniques:**  Craft more effective prompts for the LLM to generate higher-quality answers.
* **Adding error handling and logging:** Make your agent robust against unexpected input and failures.


## Exercises

1.  Replace the sample text document with a more substantial document (e.g., a PDF research paper).
2.  Try different LLMs (e.g., Hugging Face models) and compare the results.
3.  Implement more robust error handling to handle cases like empty documents or network issues.
4.  Experiment with different embedding models and evaluate their impact on retrieval accuracy.


This lesson provides a foundation for building RAG agents. Remember to consult the LangChain documentation for more advanced features and options.  By iteratively refining your agent, you'll build powerful question-answering systems capable of accessing and leveraging external knowledge sources.
