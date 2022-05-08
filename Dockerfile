FROM node:14.18.2

RUN npm i -g npm@latest

RUN mkdir -p /pdf-generator
WORKDIR /pdf-generator

RUN apt-get update

# PUPPETEER DEPENDENCIES START #
# FOR HTTPS
RUN apt-get install -yyq ca-certificates

# INSTALL LIBRARIES
RUN apt-get install -y libappindicator1 ibasound2 libatk1.0-0 libc6 \
  libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 \
  libgconf-2-4 libgdk-pixbuf2.0-0 libgbm-dev libgtk-3-0 libicu-dev \
  libjpeg-dev libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 \
  libstdc++6 libpng-dev libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
  libxrender1 libxss1 libxtst6 xdg-utils

# TOOLS
RUN apt-get install -yyq gconf-service lsb-release wget

# FONTS
RUN apt-get install -yyq fonts-liberation
# PUPPETEER DEPENDENCIES END #

COPY . .

RUN npm install

CMD npm run start

EXPOSE 8001