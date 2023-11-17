import requests
import json
 
API_KEY = "AIzaSyDVFpBGIk7UyBo9EyD_4-e8oBvNsFT-dSE"
URL = "https://bard.googleapis.com/v1/generate"


def get_bard_response(query):
    response = requests.post(URL, headers=
                   {"Authorization": "Bearer " + API_KEY},
                             json={"query": query})
    data = json.loads(response.content)
    return data["text"]

def bardFactcheck(query):
    query = "Fact Check (With sources): "+query
    response = get_bard_response(query)
    print("Google Bard Response:")
    print(response)
    return response
 
if __name__ == "__main__":
    query = "Donald Trump is the current President of the USA"
    bardFactcheck(query)
