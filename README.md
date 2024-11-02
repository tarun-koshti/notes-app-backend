Steps to Set Up the Project for Kubernetes:

1. Open the `deployment.yaml` file and replace the value of `MONGO_URI` with your MongoDB connection string.  
   Note: Do not use a local MongoDB connection string, as Kubernetes containers cannot communicate with `localhost` on your system. Use a remote MongoDB connection string instead (e.g., MongoDB Atlas or another remote connection).

2. In `deployment.yaml`, set the value of `replicas` to `1` for testing purposes, so you can easily view the Kubernetes Pods after starting the app.
   ```yaml
   replicas: 1
   ```

3. After these changes, run the following command:
   ```bash
   kubectl apply -f deployment.yaml
   ```
   This command will deploy your application using Kubernetes.

4. To verify the deployment, run the following command. This will display the pod name and its status, indicating whether it is running or not:
   ```bash
   kubectl get pods
   ```

5. If the pod status is "Running," copy its name to forward the pod port for local access, then run the following command:
   ```bash
   kubectl port-forward <your_pod_name> 5000:5000
   ```
   This command enables port forwarding for your pod. To verify if the port is accessible, hit `localhost:5000`.
    • If port forwarding is successful, you will receive a response from the app.
   • If unsuccessful, the request won’t be sent, and no response will be returned.

6. Check if Kubernetes restarts the container automatically in case of a crash or shutdown.
   • To verify if Kubernetes is restarting the container, open Docker Desktop, go to the Containers section, find the container with a name starting with "k8s," delete that container, and then run the following command again:
     ```bash
     kubectl get pod
     ```
   • You should see that Kubernetes has restarted the container.
   In Docker Desktop, Kubernetes container names look like this: `"k8s_kubernetes-test_kubernetes-test-deployment-84db5d85bd-5pqjp_default_091f9e6b-b0cd-4b88-8f62-25b0a9738f5c_3"`.

7. Delete the app: To delete the app, run the following command:
   ```bash
   kubectl delete -f deployment.yaml
   ```
   This command will delete all pods created by the `deployment.yaml` file. Alternatively, you can manually delete the deployment (pod) with this command:
   ```
   kubectl delete deployment notes-app-deployment
   ```
   Or list all deployments to find the exact name and delete it using:
   ```bash
   kubectl get deployments
   kubectl delete deployment <pod_name>
   ```

If you want to run your own app on Kubernetes, follow the steps below:

First, build the Docker image of your app:
   ```
   docker build -t notes-kubernetes-test .
   ```

Then push this image to your Docker Hub repository:

Step 1: Tag your image
```
docker tag <image-name>:<tag> <your_user_name>/<repository-name>:<tag>
```
Example:
```
docker tag notes-kubernetes-test:latest tarunkoshti/notes-kubernetes-test:latest
```

Step 2: Push the image to Docker Hub:
```
docker push <your_user_name>/<repository-name>:<tag>
```
Example:
```
docker push tarunkoshti/notes-kubernetes-test:latest
```

Step 3: Update the `deployment.yaml` file
Change the image reference to your pushed image URL in the `deployment.yaml` file:
Replace:
```
image: <your_user_name>/<repository-name>:<tag>
```
With:
```
image: <your_user_name>/notes-kubernetes-test:latest
```

Step 4: Apply the changes
Run the following command again:
```
kubectl apply -f deployment.yaml
```

Now forward the port and hit any endpoint to check if the response is coming or not.

If you don’t want to push the image to a remote repository, you can push it to a locally running registry. Note that this registry container is temporary, meaning that all data will be lost once the container stops. This setup is intended for testing purposes only.

First, run the registry. This command will start a registry container on port 4000, so you don’t need to push your Docker image to a remote repository:
```
docker run --name kubernetes-registry -dp 4000:5000 registry:2
```

Now, push your image to this local registry so that you don’t need to use a remote repository like Docker Hub.

Step 1: Tag your image
```
docker tag <image-name>:<tag> localhost:4000/<image-name>:<tag>
```
Example:
```
docker tag notes-kubernetes-test:latest localhost:4000/notes-kubernetes-test:latest
```

Step 2: Push your image to the local registry
```
docker push localhost:4000/<image-name>:<tag>
```
Example:
```
docker push localhost:4000/notes-kubernetes-test:latest
```

Step 3: Update the `deployment.yaml` file
Change the image reference in `deployment.yaml` to your locally pushed image URL. Replace:
```
image: tarunkoshti/notes-kubernetes-test:latest
```
With:
```
image: localhost:4000/notes-kubernetes-test:latest
```

Step 4: Apply the changes
Run the following command again:
```
kubectl apply -f deployment.yaml
```

Now, forward the port, hit any endpoint, and check whether the response is coming through. You can also run the React app to verify that the application is working as expected.
