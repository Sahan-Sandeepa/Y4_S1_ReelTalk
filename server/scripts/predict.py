import sys
import pickle
import numpy as np
import json

import pickle
import sys
import json
import requests
from io import BytesIO

# SAS URLs for the models
RANDOM_FOREST_URL = "https://reeltalkmodels.blob.core.windows.net/model-files/random_forest_model.pkl?sp=r&st=2024-12-15T14:32:04Z&se=2025-06-14T22:32:04Z&spr=https&sv=2022-11-02&sr=b&sig=DtG67AExuWtPKSlSbgFMmsFX9NvDxk3A5Xy2uNUlJW0%3D"
SVD_MODEL_URL = "https://reeltalkmodels.blob.core.windows.net/model-files/svd_model.pkl?sp=r&st=2024-12-15T14:37:14Z&se=2025-06-15T22:37:14Z&spr=https&sv=2022-11-02&sr=b&sig=ZbVdXVSQtF3Rk19lOF%2F9B6VPDIKZY1ee8lsjlk7J6cM%3D"
TFIDF_VECTORIZER_URL = "https://reeltalkmodels.blob.core.windows.net/model-files/tfidf_vectorizers.pkl?sp=r&st=2024-12-15T14:38:26Z&se=2025-06-15T22:38:26Z&spr=https&sv=2022-11-02&sr=b&sig=Ebg%2B6TGen1LdENTNWkVg2hzJE1sMExSVc70gTRO%2BXus%3D"

# Function to load model files from Azure Blob Storage using SAS URLs
def load_model_from_url(url, model_name):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f"{model_name} loaded successfully.")
            model = pickle.load(BytesIO(response.content))
            return model
        else:
            raise Exception(f"Failed to load {model_name}. Status code: {response.status_code}")
    except Exception as e:
        print(json.dumps({"error": f"Error loading {model_name}: {str(e)}"}))
        sys.exit(1)

# Load models from Azure Blob Storage
model = load_model_from_url(RANDOM_FOREST_URL, "Random Forest Model")
vectorizer = load_model_from_url(TFIDF_VECTORIZER_URL, "TFIDF Vectorizer")
svd_model = load_model_from_url(SVD_MODEL_URL, "SVD Model")

# Handle input message
try:
    message = sys.argv[1]
except IndexError:
    print(json.dumps({"error": "No input message provided"}))
    sys.exit(1)

# Transform message using the loaded vectorizer
try:
    message_transformed = vectorizer.transform([message])
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

# Apply dimensionality reduction using SVD model
try:
    message_reduced = svd_model.transform(message_transformed)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

# Generate predictions using the Random Forest model
try:
    prediction = model.predict(message_reduced)
    prediction_int = int(prediction[0])
    print(json.dumps({"prediction": prediction_int}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
