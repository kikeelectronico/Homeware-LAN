import google.auth.crypt
import google.auth.jwt
import time
import json
import requests

class HomeGraph:
	"""Do requests to Google Home Graph."""

	expire = 3600
	generated = 0

	def getJWT(self):
		self.generated = int(time.time())
		keyfile = "../google.json"
		# Get the service account email
		f = open(keyfile,'r')
		email = json.loads(f.read())['client_email']
		f.close()
		# Build payload
		payload = {
			'iat': self.generated,
			"exp": self.generated + self.expire,
			'iss': email,
			'aud':  "https://oauth2.googleapis.com/token",
			"scope": "https://www.googleapis.com/auth/homegraph"
		}
		# Sign with keyfile
		signer = google.auth.crypt.RSASigner.from_service_account_file(keyfile)
		jwt = google.auth.jwt.encode(signer, payload)

		return jwt

	def getToken(self):
		# Get JWT
		jwt = self.getJWT()
		# Set the request
		url = "https://oauth2.googleapis.com/token"
		data = "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + str(jwt)[2:-1]
		headers = {
			"Content-Type": "application/x-www-form-urlencoded"
		}
		# Get the token
		r = requests.post(url, data=data, headers=headers)
		self.access_token = json.loads(r.text)['access_token']

		return r.status_code == 200

	def requestSync(self, agentUserId):
		if int(time.time()) > (self.generated + self.expire):
			self.getToken()
		# Set the request
		url = "https://homegraph.googleapis.com/v1/devices:requestSync"
		data = {
		  "agentUserId": agentUserId,
		}
		headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + self.access_token
		}
		# Do the request
		r = requests.post(url, data=json.dumps(data), headers=headers)

	def reportState(self, agentUserId, states):
		if int(time.time()) > (self.generated + self.expire):
			self.getToken()
		# Set the request
		url = "https://homegraph.googleapis.com/v1/devices:reportStateAndNotification"
		data = {
		 	"requestId": str(time.time()),
		 	"agentUserId": agentUserId,
		 	"payload": {
			"devices": states
			}
		}
		headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + self.access_token
		}
		# Do the request
		r = requests.post(url, data=json.dumps(data), headers=headers)
