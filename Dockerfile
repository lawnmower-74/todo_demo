FROM mcr.microsoft.com/playwright:v1.49.0-noble

RUN apt-get update && apt-get -y install x11vnc websockify novnc

WORKDIR /usr/src/app

RUN yarn init -y && yarn add @playwright/test