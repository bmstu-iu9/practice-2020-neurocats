import json
import os

from flask import Flask, render_template, request, make_response, abort
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


@app.route('/users/', methods=['GET', 'POST'])
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


@app.route('/users/<int:id>', methods=['GET', 'UPDATE', 'DELETE'])
def one_user(id):
    if request.method == 'GET':
        query = 'select * from users where id=' + str(id)
        user_data = sql_transaction(query)
        if isinstance(user_data, sqlite3.Error):
            return make_response({'Error': str(user_data)}, 424)
        elif user_data:
            user = User.fromJSON(
                json.dumps(
                    arrange(user_data,
                            ('id', 'email', 'password', 'name', 'photoUrl'))[0]))
            query = 'select url from posted_cats where posted_by=' + str(id)
            photos = sql_transaction(query)
            user.userCatsPhotoUrl.extend([f for t in photos for f in t])
            return user.toJSON()
        else:
            abort(404)
    elif request.method == 'UPDATE':
        update = request.get_json()
        query = 'UPDATE users SET {0}=(?) where id='+str(id)
        data = list(update.items())
        try:
            conn = sqlite3.connect('neurocats.db')
            cur = conn.cursor()
            for field in data:
                cur.execute(query.format(field[0]), (field[1], ))
            conn.commit()
        except sqlite3.Error as error:
            conn.rollback()
            return make_response({"Error": error.args}, 424)
        finally:
            cur.close()
            conn.close()
        return make_response({"code": 'SUCCESS'}, 204)
    else:
        query = 'delete from users where id={0}'.format(str(id))
        status = sql_transaction(query)
        if isinstance(status, sqlite3.Error):
            return make_response({"Error": str(status)})
        return make_response({"code": "SUCCESS"}, 204)


@app.route('/users/<int:id>/cats/', methods=['GET'])
def user_cats(id):
    query = 'select url from posted_cats where posted_by={0}'.format(str(id))
    cats = sql_transaction(query)
    if isinstance(cats, sqlite3.Error):
        return make_response({"Error": str(cats)})
    return dict(enumerate([c for t in cats for c in t]))


@app.route('/users/<int:id>/photo', methods=['GET', 'POST'])
def user_photo(id):
    if request.method == 'GET':
        query = 'select photoUrl from users where id={}'.format(str(id))
        photo = sql_transaction(query)
        if isinstance(photo, sqlite3.Error):
            return make_response({"Error": str(photo)})
        return photo[0][0]
    else:
        pass


if __name__ == 'main':
    app.run(debug=True)

