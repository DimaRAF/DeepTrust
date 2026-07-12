from __future__ import annotations

from pathlib import Path
from uuid import uuid4
import os

import librosa
import soundfile as sf
import torchaudio
from fastapi import HTTPException, UploadFile


# مجلد backend نفسه
BASE_DIR = Path(__file__).resolve().parent

# الملفات المرفوعة تنحفظ هنا مؤقتًا
UPLOAD_DIR = BASE_DIR / "uploads"

# الصيغ المسموحة
ALLOWED_EXTENSIONS = {
    ".wav",
    ".flac",
    ".mp3",
    ".m4a",
    ".ogg",
    ".webm",
}

# أقصى حجم للملف: 20 MB
MAX_FILE_SIZE = 20 * 1024 * 1024


def validate_file(file: UploadFile) -> str:
    """
    يتحقق من وجود اسم للملف ومن أن صيغته صوتية ومسموحة.
    ويرجع امتداد الملف.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file has no filename.",
        )

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported audio format. "
                "Supported formats: WAV, FLAC, MP3, M4A, OGG and WEBM."
            ),
        )

    if file.content_type and not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not recognized as an audio file.",
        )

    return extension


def save_uploaded_file(file: UploadFile) -> tuple[Path, int]:
    """
    يحفظ الملف باسم آمن وفريد، ويتأكد من أن حجمه ضمن الحد المسموح.
    """

    extension = validate_file(file)

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    safe_filename = f"{uuid4().hex}{extension}"
    file_path = UPLOAD_DIR / safe_filename

    total_size = 0

    try:
        with file_path.open("wb") as buffer:
            while True:
                chunk = file.file.read(1024 * 1024)

                if not chunk:
                    break

                total_size += len(chunk)

                if total_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="File is too large. Maximum size is 20 MB.",
                    )

                buffer.write(chunk)

        validate_audio_content(file_path)

        return file_path, total_size

    except Exception:
        delete_file(file_path)
        raise


def validate_audio_content(file_path: Path) -> None:
    """
    يتأكد أن الملف قابل للقراءة كصوت وليس ملفًا تالفًا أو مزيف الامتداد.
    """

    try:
        waveform, sample_rate = torchaudio.load(str(file_path))

        if waveform.numel() == 0:
            raise ValueError("The audio file is empty.")

        if sample_rate <= 0:
            raise ValueError("Invalid sample rate.")

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid or corrupted audio file: {error}",
        ) from error

def preprocess_audio(file_path: str | Path) -> Path:
    """
    Convert audio to WAV, mono, 16 kHz, PCM 16-bit.
    """

    input_path = Path(file_path)
    processed_path = UPLOAD_DIR / f"{uuid4().hex}_processed.wav"

    try:
        audio, _ = librosa.load(
            str(input_path),
            sr=16000,
            mono=True,
        )

        if audio.size == 0:
            raise ValueError("The processed audio is empty.")

        sf.write(
            str(processed_path),
            audio,
            16000,
            subtype="PCM_16",
        )

        return processed_path

    except Exception as error:
        delete_file(processed_path)

        raise HTTPException(
            status_code=400,
            detail=f"Could not preprocess audio file: {error}",
        ) from error
    
def delete_file(file_path: str | Path | None) -> None:
    """
    يحذف الملف المؤقت بأمان بعد انتهاء التحليل.
    """

    if not file_path:
        return

    path = Path(file_path)

    try:
        if path.exists():
            os.remove(path)

    except OSError as error:
        print(f"Could not delete temporary file {path}: {error}")