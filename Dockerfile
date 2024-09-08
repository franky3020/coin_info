# Base Image
FROM node:20.16.0

WORKDIR /usr/app
# install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]

# sudo docker build -t dogecoin_info_api .
# sudo docker rm -f dogecoin_info_api
# sudo docker run -d --network host  --name dogecoin_info_api dogecoin_info_api
