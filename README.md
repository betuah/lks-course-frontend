# Course App - Frontend

## Environment Setup
> Create .env file in root folder
```sh
NUXT_ENV_API_URL=YOUR_BACKEND_URL # For example NUXT_ENV_CATALOG_API_URL=http://YOUR_ECS_LB
```

### Pre-Requirment
> If you are using Amazon Linux as Operating System you can install nodejs packages with this following command:
```sh
$ sudo yum install -y gcc-c++ make
$ curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
```

## Run the application
> This app has two options to run it.

### 1st Option - Server Deployment
```sh
# Install all Depedencies
$ npm install
# Firstly You need to run this command to create .nuxt directory with everything inside ready to start
$ npm run build 
# Start your client apps in server-side production mode
$ npm run start 
```

### 2nd Option - Static Deployment (Pre-rendered)
> Gives you the ability to host your web application on any static hosting (Nginx or Apache2 ect), the static source code will be generated in *dist folder*

```sh
# Install all Depedencies
$ npm install
# Generate static source code
$ npm run generate # Use --prefix <your_path> for specific path and use --quite or --slient for suppressing the output of npm
# Then you can use your web server enggine that you love to run it.
```