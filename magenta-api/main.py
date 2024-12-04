from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import magenta
import note_seq
import tensorflow

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # List of allowed origins (use "*" to allow all origins)
    allow_credentials=True,
    allow_methods=["*"],  # List of allowed HTTP methods
    allow_headers=["*"],  # List of allowed headers
)

BASE_URL = '/api/v1'

@app.get(f"{BASE_URL}/musicality")
def get_rhythm():
    return 8

@app.get(f"{BASE_URL}/rhythm")
def get_rhythm():
    return 9

@app.get(f"{BASE_URL}/originality")
def get_rhythm():
    return 10