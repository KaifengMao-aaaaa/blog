


# Project Structure
## Directory Layout
```
blog/
|
| -- backend/
|    
| -- frontend/
|       | -- build/
                | -- index.html
| -- ecosystem.config.js
``` 
## Workflow and Process
1. The client interacts with web page built by **React**.
2. Nginx server run at port 80 to receive requests from clients. 
3. Nginx distributes the requests to different ports.
    * The backend server runs on port 4001.

## Deploy
### Prerequisite

1. Setting environment variables
2. install pm2 at remote server and own host. 
    ```sh
    npm install -g pm2
    ```
3. The host machine is capable of establishing an SSH connection to the remote server. And, the remote server is configured to clone the project repository from GitHub." 
### Nginx
1. Configuration of Server
    ```sh
    server {
        listen       80;
        server_name localhost;
        access_log  <Path>;
        error_log   <Path>;
        location /api {
            proxy_pass http://localhost:<Port>;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
        location / {
            root  <Path to build folder of react app>
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
    }
    ```
    Then, restart the nginx server
    ```sh
    systemctl restart nginx
    ```
### PM2
1. Have pm2 configuration file (ecosystem.config.js)
    ```sh
    module.exports = {
        apps : [{
            name   : <Process Name>,
            script : <npm or ...>,
            args: <start or ...>,
            cwd: <Working Directory>,
        }],
        deploy: {
            production: {
            user: <User Name>,
            host: <Address of Remote Server>,
            ref: <Branch>,
            repo: <Url>,
            path: <Path At Remote Server>,
            }
        }
    }
    ```
2. Deploy the project to the remote server using the configuration file.
    
    Steup (Only first time)
    ```sh
    pm2 deploy production setup
    ```

    Continuous deployment and updates
    ```
    pm2 deploy production update
    ```

## Development FAQs
1. 404 unfound page when we use nginx serve static files at `build/` from **React**.
    
    The file with the request URL is not accessible. For example, the request URL could be /user/login but the path is not invalid at `build/`. The solution is redirecting path to `/index.html`.
    
    Add the line to configuration file.
    ```sh
    location / {
        ....
        try_files $uri $uri/ /index.html;
    }
    ```
2. The nginx cannot identify the the request to backend or frontend because all request URL are redirecting to `index.html`. (Q1 mentions why all request URL are redirecting `index.html`)

    We need to distinguish it from the request URL. The solution in this project is adding \api to URL of all routings of the backend. After that, add one location block in front of the location block for redirecting all request URL to `index.html`.

    ```
    location \api {
        .....
    }
    ```
