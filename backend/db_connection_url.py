from os import environ
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = "mysql://{username}:{password}@{host}/{db_name}".format(
    username=environ.get('MYSQL_USERNAME'), password=environ.get('MYSQL_PASSWORD'), host=environ.get('MYSQL_HOST'), db_name=environ.get('MYSQL_DB'))
