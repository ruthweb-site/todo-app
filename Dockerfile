# Use lightweight nginx image
FROM nginx:alpine

# Remove the default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy your project files to Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx starts automatically
