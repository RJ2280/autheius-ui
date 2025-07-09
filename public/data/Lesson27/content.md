# Lesson 27: Containerization with Docker and Kubernetes

This lesson introduces containerization using Docker and orchestrating containers with Kubernetes.  We'll cover the fundamentals of each technology and demonstrate their practical application.  Prior experience with basic Linux commands and a fundamental understanding of networking concepts is recommended.

## 27.1 What is Containerization?

Containerization packages software and its dependencies into a single unit, ensuring consistent execution across different environments. Unlike virtual machines (VMs) which virtualize the entire operating system, containers share the host OS kernel, resulting in improved resource efficiency and faster startup times.

**Key Benefits of Containerization:**

* **Portability:** Run applications consistently across various platforms (dev, test, production).
* **Efficiency:** Reduced resource consumption compared to VMs.
* **Scalability:** Easily scale applications up or down based on demand.
* **Isolation:**  Independent application environments prevent conflicts.
* **Reproducibility:**  Ensures consistent application behavior across deployments.


## 27.2 Docker: Building and Running Containers

Docker is the industry-standard containerization platform.  It allows you to build, ship, and run containerized applications.

**Key Docker Concepts:**

* **Image:** A read-only template containing application code, runtime, system tools, system libraries, and settings.
* **Container:** A running instance of a Docker image.
* **Dockerfile:** A text file containing instructions for building a Docker image.


**Example Dockerfile (Simple Web Server):**

```dockerfile
FROM nginx:latest
COPY index.html /usr/share/nginx/html/
```

**Building and Running the Image:**

1.  Save the above code as `Dockerfile`.
2.  Create a file named `index.html` with some content (e.g., "Hello from Docker!").
3.  Open your terminal and navigate to the directory containing `Dockerfile` and `index.html`.
4.  Build the image: `docker build -t my-web-server .`
5.  Run the container: `docker run -p 8080:80 my-web-server`

This will start a web server accessible on port 8080 of your host machine.  Remember to stop and remove the container afterwards using `docker stop <container_id>` and `docker rm <container_id>`.


**Common Docker Commands:**

| Command             | Description                                      |
|----------------------|--------------------------------------------------|
| `docker build`       | Builds a Docker image from a Dockerfile.          |
| `docker run`         | Runs a Docker container from an image.            |
| `docker ps`          | Lists currently running containers.               |
| `docker ps -a`       | Lists all containers (running and stopped).       |
| `docker stop`        | Stops a running container.                        |
| `docker rm`          | Removes a stopped container.                      |
| `docker images`      | Lists Docker images on your system.               |
| `docker rmi`         | Removes a Docker image.                           |
| `docker exec`        | Executes a command inside a running container.   |


## 27.3 Kubernetes: Orchestrating Containers

Kubernetes (often shortened to K8s) is a powerful system for automating deployment, scaling, and management of containerized applications across clusters of hosts.

**Key Kubernetes Concepts:**

* **Pod:** The smallest deployable unit in Kubernetes; typically contains one or more containers.
* **Deployment:**  Manages the desired state of a set of Pods.
* **Service:**  Provides a stable network endpoint for a set of Pods.
* **Namespace:**  Provides logical separation of resources.


**Simple Kubernetes Deployment (YAML):**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-web-app
  template:
    metadata:
      labels:
        app: my-web-app
    spec:
      containers:
      - name: my-web-container
        image: my-web-server  # Replace with your image name
        ports:
        - containerPort: 80
```

This YAML file describes a deployment of 3 replicas of our `my-web-server` container.


**Applying the Deployment:**

This requires a Kubernetes cluster setup (e.g., using Minikube, Docker Desktop Kubernetes, or a cloud provider). After installing `kubectl`, you would apply this YAML using:

`kubectl apply -f deployment.yaml`


## 27.4  Further Exploration

This lesson provides a foundational understanding of Docker and Kubernetes.  For advanced topics, consider exploring:

* **Docker Compose:** For defining and running multi-container applications.
* **Kubernetes Networking:** Advanced networking concepts within Kubernetes.
* **Kubernetes Ingress:**  Managing external access to services.
* **Helm:**  A package manager for Kubernetes.
* **Persistent Volumes:**  Managing persistent storage for stateful applications.


This lesson aims to provide a solid starting point for your journey into the world of containerization.  Remember to consult the official Docker and Kubernetes documentation for more detailed information.
