from ubidots import ApiClient
import random

from config import config

from speedtest import speedtest

#test speed
result = speedtest()

#get name of local host
import socket
hostname=socket.gethostname()

#create an "API" object
api = ApiClient(config["key"])

print(result)

#upload results
provider = api.get_variable(config["hosts"][hostname]["provider"])
provider.save_value({'value':0, 'context':{'Internet Provider':result["provider"]}})

upload = api.get_variable(config["hosts"][hostname]["upload"])
upload.save_value({'value':result["upload"][0]})

download = api.get_variable(config["hosts"][hostname]["download"])
download.save_value({'value':result["download"][0]})
