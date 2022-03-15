from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db_connection_url import SQLALCHEMY_DATABASE_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

Session = sessionmaker(engine)
