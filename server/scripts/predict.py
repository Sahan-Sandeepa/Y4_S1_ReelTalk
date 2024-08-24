import sys
import pickle
import numpy as np
import json

try:
    with open('./models/random_forest_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    with open('./models/tfidf_vectorizers.pkl', 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)
    with open('./models/svd_model.pkl', 'rb') as svd_file:
        svd_model = pickle.load(svd_file)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

try:
    message = sys.argv[1]
except IndexError:
    print(json.dumps({"error": "No input message provided"}))
    sys.exit(1)

try:
    message_transformed = vectorizer.transform([message])
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

try:
    message_reduced = svd_model.transform(message_transformed)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

try:
    prediction = model.predict(message_reduced)
    prediction_int = int(prediction[0])
    print(json.dumps({"prediction": prediction_int}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
