# Base Image
FROM node:20.16.0

WORKDIR /usr/app
# install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]

# docker build -t dogecoin_info_api .
# docker rm -f dogecoin_info_api
# docker run -p 50200:3000 -d --name dogecoin_info_api dogecoin_info_api
