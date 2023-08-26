#!/bin/bash

# Start the frontend container
docker run -d -p 3000:3000 frontend-image

# Start the backend container
docker run -d -p 8000:8000 backend-image