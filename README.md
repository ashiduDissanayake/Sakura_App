# CSE Padura WebAR Project

## Project Overview

This application was built to introduce Augmented Reality on the Web using the image tracking of MindAR.

## Technologies Used
- [Vue.js](https://vuejs.org/)
- [MindAR](https://mindar.co/)
- [A-Frame](https://aframe.io/)

## Installation Instructions

1. Clone the repo

2. Install dependencies
```ps
npm install
```

3. Build the app
```ps
npm run build
```

4. Run the server
```ps
npm run serve
```

5. The terminal will give the links to access the website from the computer or from a device in the local network

6. Once the page is loaded scan the image below to view the AR content.

![Image to scan](public/qr-code.png)
```

## Using Docker

Generate the self-signed ssl certificate (one time only). Use WSL if you are on Windows.
In the root of the project, run the following command to generate the certificate:

```bash
chmod +x certs.sh
./certs.sh
```

Then, run the following command to build and run the docker image:

```bash
docker compose up -d
```