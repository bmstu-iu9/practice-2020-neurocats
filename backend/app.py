import json
import os

from flask import Flask, render_template, request, make_response
from flask_cors import CORS
import psycopg2
import sqlite3

from api import User, CatsPhoto

template_dir = os.path.abspath('../frontend/public')


# initializing flask stuff
app = Flask(__name__, template_folder=template_dir)
CORS(app)


def sql_transaction(query='', data=()):
    conn = sqlite3.connect('neurocats.db')
    cur = None
    try:
        cur = conn.cursor()
        cur.execute(query, data)
    except sqlite3.Error as error:
        print("SQLite: {}".format(error.args))
        conn.rollback()
        return error
    else:
        conn.commit()
        if cur:
            return cur.fetchall()
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def arrange(data, keys):
    result = []
    for item in data:
        result.append(dict(
            zip(keys,
                item)))
    return dict(enumerate(result))


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/users', methods=['GET', 'POST'])
def all_users():
    if request.method == 'GET':
        users = sql_transaction('select * from users')
        if users is not None:
            return arrange(users,
                           ('id', 'email', 'password', 'name', 'photoUrl'))
        elif isinstance(users, sqlite3.Error):
            return make_response({"Error": str(users)}, 424)

    else:
        new = User.fromJSON(json.dumps(request.get_json()))
        query = """insert into users(email, password, name, photoUrl)
                values (?, ?, ?, ?)"""
        data = (new.email, new.password, new.name, "/photo/0")
        res = sql_transaction(query, data)
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        resp = {'code': 'SUCCESS'}
        return make_response(json.dumps(resp), 201)


if __name__ == 'main':
    app.run(debug=True)

