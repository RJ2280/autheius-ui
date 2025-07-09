# Lesson 27: Containerization with Docker and Kubernetes

This lesson introduces containerization using Docker and Kubernetes. We'll explore the benefits of containerization, learn how to build and manage Docker images and containers, and delve into orchestrating containers with Kubernetes.

## 27.1 What is Containerization?

Containerization packages software and its dependencies into a single unit, ensuring consistent execution across different environments.  Unlike virtual machines (VMs) which virtualize the entire hardware, containers virtualize the operating system kernel, leading to significantly improved resource efficiency and faster deployment.

**Key benefits of containerization:**

* **Portability:** Run applications consistently across different environments (development, testing, production).
* **Efficiency:** Lighter weight than VMs, consuming fewer resources.
* **Scalability:** Easily scale applications by deploying multiple containers.
* **Isolation:** Containers isolate applications from each other, preventing conflicts.
* **Reproducibility:**  Ensure consistent application behavior across deployments.


## 27.2 Docker: Building and Managing Containers

Docker is the leading containerization platform. We'll cover creating Docker images (read-only templates) and running them as containers (running instances).

**27.2.1 Dockerfile:**

A Dockerfile is a text file containing instructions to build a Docker image.  Here's a simple example:

```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Define environment variable
ENV NAME World

# Define the command to run when the container launches
CMD ["python", "app.py"]
```

**27.2.2 Building and Running a Docker Image:**

1.  Save the above as `Dockerfile`.
2.  Build the image: `docker build -t my-python-app .`
3.  Run the container: `docker run -p 8000:8000 my-python-app`  (maps port 8000 on the host to port 8000 in the container)
4.  List running containers: `docker ps`
5.  Stop a container: `docker stop <container_id>`
6.  Remove a container: `docker rm <container_id>`


**27.2.3 Docker Hub:**

Docker Hub is a registry for storing and sharing Docker images.  You can push your images to Docker Hub for easy sharing and collaboration.


## 27.3 Kubernetes: Orchestrating Containers

Kubernetes (K8s) automates the deployment, scaling, and management of containerized applications.  It handles tasks like:

* **Scheduling:** Assigning containers to nodes (machines).
* **Scaling:** Automatically increasing or decreasing the number of containers based on demand.
* **Self-healing:** Restarting failed containers.
* **Service discovery:** Allowing containers to find and communicate with each other.

**27.3.1 Key Kubernetes Concepts:**

* **Pods:** The smallest deployable units in Kubernetes; they contain one or more containers.
* **Deployments:** Manage the desired state of a set of Pods.
* **Services:** Expose Pods to the outside world.
* **Namespaces:** Organize Kubernetes resources.


**27.3.2 Deploying an application with Kubernetes (Simplified):**

This requires a Kubernetes cluster (Minikube for local development is recommended).

1.  Create a Kubernetes deployment YAML file (e.g., `deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-python-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-python-app
  template:
    metadata:
      labels:
        app: my-python-app
    spec:
      containers:
      - name: my-python-app
        image: <your_dockerhub_image>
        ports:
        - containerPort: 8000
```

2. Apply the YAML file: `kubectl apply -f deployment.yaml`

3. Expose the service (replace `<your_service_name>` with a suitable name):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: <your_service_name>
spec:
  selector:
    app: my-python-app
  ports:
  - protocol: TCP
    port: 8000
    targetPort: 8000
  type: LoadBalancer # or NodePort depending on your setup
```

4. Apply the service YAML file: `kubectl apply -f service.yaml`

This example creates three replicas of your application and exposes it via a service.  Kubernetes will manage these replicas, ensuring high availability and scalability.


## 27.4 Further Exploration

* Explore different Kubernetes object types (StatefulSets, DaemonSets, etc.).
* Learn about Kubernetes networking (CNI plugins).
* Investigate monitoring and logging solutions for Kubernetes.
* Consider using Helm for managing Kubernetes deployments.


This lesson provides a foundation for understanding Docker and Kubernetes.  Further exploration and hands-on practice are crucial for mastering these technologies.
