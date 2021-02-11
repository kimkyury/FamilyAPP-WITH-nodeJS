import requests

#인디드 웹사이트에 가서  html정보를 추출한다
indeed_result = requests.get("https://kr.indeed.com/%EC%B7%A8%EC%97%85?q=python&limit=50")
print(indeed_result)

