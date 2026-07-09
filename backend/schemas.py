from pydantic import BaseModel


class UploadResponse(BaseModel):
    message: str
    filename: str


class AnalysisResponse(BaseModel):
    id: int
    file_name: str
    result: str
    confidence: float

    class Config:
        from_attributes = True