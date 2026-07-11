from pathlib import Path
import traceback

from fastapi import FastAPI, UploadFile, File, HTTPException

from audio_processor import (
    save_uploaded_file,
    preprocess_audio,
    delete_file,
)

from database import (
    save_audio_file,
    save_result,
    get_all_results,
    get_result_by_id,
)

from predict import predict_audio
from schemas import UploadResponse, AnalysisResponse
app = FastAPI()


@app.get("/")
def home():
    print("HOME ENDPOINT WORKS")
    return {
        "message": "DeepTrust API"
    }


# -----------------------------
# Upload Audio
# -----------------------------
@app.post("/upload", response_model=UploadResponse)
def upload_file(file: UploadFile = File(...)):
    file_path = None

    try:
        print("1- Request received")

        # Validate the audio file and save it safely
        file_path, file_size = save_uploaded_file(file)

        print("2- File validated and saved")
        print(f"Saved path: {file_path}")
        print(f"File size: {file_size} bytes")

        # Save file information in the database
        save_audio_file(
            file_name=file.filename,
            file_path=str(file_path),
            file_size=file_size,
            analysis_id=None,
        )

        print("3- Saved to database")

        return {
            "message": "File uploaded successfully",
            "filename": file_path.name,
        }

    except Exception as error:
     delete_file(file_path)

    print("========== ERROR ==========")
    print(str(error))
    traceback.print_exc()
    print("===========================")
    raise
# -----------------------------
# Get Results
# -----------------------------

@app.get("/results", response_model=list[AnalysisResponse])
def get_results():
    return get_all_results()


@app.get("/results/{id}", response_model=AnalysisResponse)
def get_result(id: int):
    return get_result_by_id(id)


# -----------------------------
# Analyze Audio
# -----------------------------
@app.post("/analyze")
async def analyze_audio(file_name: str):
    safe_file_name = Path(file_name).name

    original_path = (
        Path(__file__).resolve().parent
        / "uploads"
        / safe_file_name
    )

    processed_path = None

    if not original_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Audio file was not found.",
        )

    try:
        processed_path = preprocess_audio(original_path)

        result = predict_audio(str(processed_path))

        save_result(
            file_name=safe_file_name,
            result=result["prediction"],
            confidence=result["confidence"],
        )

        return {
            "file_name": safe_file_name,
            "result": result["prediction"],
            "confidence": result["confidence"],
        }

    finally:
        delete_file(original_path)
        delete_file(processed_path)