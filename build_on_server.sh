sudo docker build -t dogecoin_info_api .
sudo docker rm -f dogecoin_info_api
sudo docker run -d --network host  --name dogecoin_info_api dogecoin_info_api
