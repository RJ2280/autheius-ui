# Lesson 14: Building a Simple RAG Agent with LangChain

This lesson will guide you through building a basic Retrieval Augmented Generation (RAG) agent using LangChain.  We'll cover the fundamental components and demonstrate a working example.  By the end of this lesson, you'll understand how to connect a document retriever with a large language model (LLM) to answer questions based on provided documents.

## Learning Objectives

After completing this lesson, you will be able to:

* Explain the core components of a RAG pipeline.
* Utilize LangChain's `FAISS` vector database for document storage and retrieval.
* Integrate a LLM (e.g., OpenAI) with a document retriever to answer questions.
* Handle potential errors and improve the robustness of your RAG agent.
* Understand limitations and potential improvements for more sophisticated RAG systems.


## Prerequisites

* Basic Python programming knowledge.
* Familiarity with LangChain's basic concepts (e.g., `LLMs`, `Prompts`).
* An OpenAI API key (or access to another compatible LLM).  [Sign up for OpenAI](https://openai.com/) if you don't have one.
* `pip install langchain openai faiss-cpu`


## 1. Setting up the Environment

Before we begin, ensure you have the necessary libraries installed.  Use the following command in your terminal:

```bash
pip install langchain openai faiss-cpu
```

Then, create a Python file (e.g., `rag_agent.py`) and import the required libraries:

```python
import os
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.document_loaders import TextLoader
```

Remember to set your OpenAI API key:

```python
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY" # Replace with your actual key
```

## 2. Loading and Preprocessing Documents

Let's load a sample text document. Replace `"your_document.txt"` with the path to your document.  This example uses a simple text file, but LangChain supports many other document loaders.

```python
loader = TextLoader("your_document.txt")
documents = loader.load()

text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)
```

This code loads the text, then splits it into smaller chunks for better processing.  Adjust `chunk_size` as needed.

## 3. Creating the Vector Database

We use FAISS to efficiently store and retrieve relevant document chunks:

```python
embeddings = OpenAIEmbeddings()
db = FAISS.from_documents(docs, embeddings)
```

This creates a FAISS index from the document chunks using OpenAI embeddings.

## 4. Building the RetrievalQA Chain

Now, let's construct the RetrievalQA chain:

```python
retriever = db.as_retriever()
llm = OpenAI(temperature=0)
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
```

This creates a chain that uses the FAISS retriever to fetch relevant documents and the OpenAI LLM to generate an answer.  `chain_type="stuff"` simply concatenates the retrieved chunks.  Other chain types are available in LangChain.

## 5. Querying the RAG Agent

Finally, let's ask our agent a question:

```python
query = "What is the main topic of this document?"
result = qa.run(query)
print(result)
```

This will print the LLM's answer based on the retrieved document chunks.

## 6. Error Handling and Improvements

* **Robustness:** Implement exception handling (e.g., `try...except` blocks) to gracefully handle potential errors like network issues or LLM API rate limits.
* **Context Window:** Be mindful of the LLM's context window.  If your documents are too long, consider using techniques like summarization or chunking strategies to fit within the limits.
* **Different LLMs:** Experiment with different LLMs to find the best performance for your specific use case.
* **Advanced Retrieval:** Explore more sophisticated retrieval methods offered by LangChain (e.g., using different similarity metrics).
* **Evaluation:** Develop a method to evaluate the accuracy and quality of your RAG agent's responses.


## Conclusion

This lesson provided a foundational understanding of building a simple RAG agent with LangChain.  Remember to experiment, adapt, and improve upon this basic structure to create more robust and powerful RAG systems.  Always consider the ethical implications and potential biases when deploying such systems.
