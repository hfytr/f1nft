from fastapi import FastAPI
from dotenv import load_dotenv
import os, json
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, storage
from firebase_admin import firestore
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

cred = credentials.Certificate("accountKey.json")

fire_app = firebase_admin.initialize_app(cred)

fire_config = {
  "apiKey": "AIzaSyB5vfz6OTOt2U2L5MFj2JFpKg9i35c71wc",
  "authDomain": "nftdrift-a8a85.firebaseapp.com",
  "projectId": "nftdrift-a8a85",
  "storageBucket": "nftdrift-a8a85.appspot.com",
  "messagingSenderId": "1012750723616",
  "appId": "1:1012750723616:web:caa544f0dec196c3172a45"
}

db = firestore.client()

origins = [
    "*",
    "http://localhost:5173",
    "http://127.0.0.1:8000",
    "http://localhost",
    "http://localhost:8080",
    "https://www.bosdroneworks.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    password: str
    name: str
    balance: int

@app.get("/")
async def home():
    return {"data": "home"}

@app.get("/getnft")
async def get_nft():
    COLLECTION_ID = os.environ.get("COLLECTION_ID")
    return {"data": COLLECTION_ID}

@app.post("/signup")
async def signup(user: User):
    # Need to pass in the id, etc for which collection to actually change.
    try:
        result = db.collection("Users").document().set(
            {
                "email": user.email,
                "password": user.password,
                "name": user.name,
                "balance": user.balance
            }
        )
        print(result)
        return {"status": "Success"}
    except Exception as e:
        return {"status": f"Failed: {str(e)}"}

@app.post("/login")
async def login():
    return 0

@app.get("/{id}")
async def get_id(id: str):
    try:
        result = db.collection("Users").document(id).get().to_dict()
        return result
    except Exception as e:
        return {"status": f"Failed: {str(e)}"}
    
@app.get("/email/{email}/")
async def get_email(email: str):
    try:
        collection = db.collection("Users")
        # print(collection)
        docs = collection.get()
        # print(docs)
        results = []
        for doc in docs:
            doc_dict = doc.to_dict()
            doc_dict["id"] = doc.id
            results.append(doc_dict)

        for r in results:
            print(r)
            print(email)
            if r["email"] == email:
                print(r)
                return r
    except Exception as e:
        return {"status": f"Failed: {str(e)}"}

@app.get("/allusers/")
async def get_all_users():
    # print("start")
    collection = db.collection("Users")
    # print(collection)
    docs = collection.get()
    # print(docs)
    results = []
    for doc in docs:
        doc_dict = doc.to_dict()
        doc_dict["id"] = doc.id
        results.append(doc_dict)

    # print(f"Before: {results}")

    json_results = json.dumps(results)

    # print(f"After: " + json_results)

    return json_results

class Login(BaseModel):
    email: str
    password: str

@app.post("/login/")
def login(user: Login):
    all_users = get_all_users()
    for u in all_users:
        if u["email"] == user.email and u["password"] == user.password:
            return {"status": u}