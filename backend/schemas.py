from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List


class UserModel(BaseModel):
    id: Optional[int]
    firstname: str
    lastname: str
    email: str
    country: str
    city: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class UpdateUser(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]
    email: Optional[str]
    country: Optional[str]
    city: Optional[str]

    class Config:
        orm_mode = True


class ResponseMessage(BaseModel):
    success: bool
    message: str
    data: Optional[UserModel]

    class Config:
        orm_mode = True


class ResponseMesageAllUsers(ResponseMessage):
    data: Optional[List[UserModel]]

    class Config:
        orm_mode = True
