from fastapi import FastAPI, HTTPException
from db_set import Session
from schemas import UserModel, UpdateUser, ResponseMesageAllUsers, ResponseMessage
import models

app = FastAPI()

db_session = Session()


@app.get('/api/v1/users', response_model=ResponseMesageAllUsers, status_code=200)
def get_all_users():
    users = db_session.query(models.User).all()
    return {'success': True, 'message': 'All users retrieved from the database!', 'data': users}


@app.get('/api/v1/users/{passed_id}', response_model_include=ResponseMessage, status_code=200)
def get_user_by_id(passed_id: int):
    user = db_session.query(models.User).filter_by(id=passed_id).first()
    if user:
        return {'success': True, 'message': 'User with the id: {id} successfully retrived from the database!'.format(id=user.id), 'data': user}


@app.post('/api/v1/users', response_model=ResponseMessage, status_code=201)
def create_user(userBody: UserModel):
    new_user = models.User(firstname=userBody.firstname, lastname=userBody.lastname,
                           email=userBody.email, country=userBody.country, city=userBody.city)
    check_email = db_session.query(models.User).filter_by(
        email=userBody.email).first()
    if check_email:
        raise HTTPException(
            status_code=400, detail='Email: {email} already exists in the database!'.format(email=userBody.email))
    else:
        db_session.add(new_user)
        try:
            db_session.commit()
            return {'success': True, 'message': 'User successfully created!', 'data': new_user}
        except:
            db_session.rollback()


@app.put('/api/v1/users/{passed_id}', response_model=ResponseMessage, status_code=200)
def update_user(passed_id: int, userBody: UpdateUser):
    user = db_session.query(models.User).filter_by(id=passed_id).first()
    if user:
        if userBody.firstname:
            user.firstname = userBody.firstname
        if userBody.lastname:
            user.lastname = userBody.lastname
        if userBody.email:
            user.email = userBody.email
        if userBody.country:
            user.country = userBody.country
        if userBody.city:
            user.city = userBody.city
        try:
            db_session.commit()
            return {'success': True, 'message': 'User with the id: {id} is successfully updated!'.format(id=user.id), 'data': user}
        except:
            db_session.rollback()


@app.delete('/api/v1/users/{passed_id}', response_model=ResponseMessage, status_code=200)
def delete_user(passed_id: int):
    user = db_session.query(models.User).filter_by(id=passed_id).first()
    if user:
        db_session.delete(user)
        try:
            db_session.commit()
            return {'success': True, 'message': 'User with the id: {id} is successfully deleted from the database!'.format(id=user.id), 'data': user}
        except:
            db_session.rollback()
