import json
import os


from flask import Flask, render_template, request, make_response, jsonify, abort, send_from_directory
from hashlib import md5
from flask_cors import CORS
import sqlite3

from api import User, CatsPhoto

template_dir = os.path.abspath('../frontend/public')

ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg')
PHOTO_NAME_EXPECTED = 'file'

# initializing flask stuff
app = Flask(__name__, template_folder=template_dir)
app.config['UPLOAD_FOLDER'] = 'photos'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
CORS(app)


def sql_transaction(query='', data=()):
    conn = None
    cur = None
    try:
        conn = sqlite3.connect('neurocats.db')
        cur = conn.cursor()
        cur.execute(query, data)
    except sqlite3.Error as error:
        print("SQLite: {}".format(error.args))
        if conn is not None:
            conn.rollback()
        return error
    else:
        conn.commit()
        if cur:
            return cur.fetchall()
        return []
    finally:
        if cur is not None:
            cur.close()
        if conn is not None:
            conn.close()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/users/', methods=['GET', 'POST'])
def all_users():
    if request.method == 'GET':
        users = sql_transaction('select * from users')
        if not isinstance(users, sqlite3.Error):
            return jsonify(list(map(lambda u:
                                    {"id": u[0], "email": u[1],
                                     "password": u[2], "name": u[3],
                                     "photoUrl": u[4]},
                                    users)))
        else:
            return make_response({"Error": str(users)}, 424)
    else:
        new = User.fromJSON(json.dumps(request.get_json()))
        query = """insert into users(email, password, name, photoUrl)
                values (?, ?, ?, ?)"""
        data = (new.email, new.password, new.name, "")
        res = sql_transaction(query, data)
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        return make_response(json.dumps({'code': 'SUCCESS'}), 201)


@app.route('/users/<int:id>', methods=['GET', 'UPDATE', 'DELETE'])
def one_user(id):
    if request.method == 'GET':
        query = 'select * from users where id=?'
        user_data = sql_transaction(query, (id, ))
        if isinstance(user_data, sqlite3.Error):
            return make_response({'Error': str(user_data)}, 424)
        elif user_data:
            user = (lambda u: {"id": u[0], "email": u[1],
                               "password": u[2], "name": u[3],
                               "photoUrl": u[4]})(user_data[0])
            query = 'select url from posted_cats where posted_by=?'
            photos = sql_transaction(query, (id, ))
            user['userCatsPhotoUrl'] = ([f for t in photos for f in t])
            return jsonify(user)
        else:
            abort(404)
    elif request.method == 'UPDATE':
        update = request.get_json()
        query = 'UPDATE users SET {0}=(?) where id='+str(id)
        data = list(update.items())
        cur = None
        conn = None
        try:
            conn = sqlite3.connect('neurocats.db')
            cur = conn.cursor()
            for field in data:
                if field[0] == 'id':
                    continue
                cur.execute(query.format(field[0]), (field[1], ))
            conn.commit()
        except sqlite3.Error as error:
            if conn is not None:
                conn.rollback()
            return make_response({"Error": error.args}, 424)
        finally:
            if cur is not None:
                cur.close()
            if conn is not None:
                conn.close()
        return make_response({"code": 'SUCCESS'}, 204)
    else:
        query = 'delete from users where id={0}'.format(str(id))
        status = sql_transaction(query)
        if isinstance(status, sqlite3.Error):
            return make_response({"Error": str(status)})
        return make_response({"code": "SUCCESS"}, 204)


@app.route('/users/<int:id>/cats', methods=['GET'])
def user_cats(id):
    query = 'select url from posted_cats where posted_by=?'
    cats = sql_transaction(query, (id, ))
    if isinstance(cats, sqlite3.Error):
        return make_response({"Error": str(cats)})
    return jsonify([c for t in cats for c in t])


@app.route('/users/<int:id>/photo', methods=['GET', 'POST'])
def user_photo(id):
    if request.method == 'GET':
        query = 'select photoUrl from users where id=?'
        photo = sql_transaction(query, (id, ))
        if isinstance(photo, sqlite3.Error):
            return make_response({"Error": str(photo)})
        elif photo:
            return photo[0][0]
        else:
            return ''
    else:
        if PHOTO_NAME_EXPECTED not in request.files:
            return make_response({"Error: ":
                                  f'No {PHOTO_NAME_EXPECTED} field has found'},
                                 400)
        file = request.files[PHOTO_NAME_EXPECTED]
        if not file.filename or not allowed_file(file.filename):
            return make_response({"Error: ": 'Incorrect filename'}, 400)
        name = md5(file.filename.encode()).hexdigest()
        name += os.path.splitext(file.filename)[1].strip().lower()
        query = 'update users set photoUrl = ? where id=?'
        data = os.path.join('/photo/', name)
        res = sql_transaction(query, (data, id))
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        if not os.path.isfile(f'{app.config["UPLOAD_FOLDER"]}/{name}'):
            file.save(f'{app.config["UPLOAD_FOLDER"]}/{name}')
        return {'code': 'SUCCESS', 'url': data}


@app.route('/photo/<path:path>', methods=['GET'])
def send_photo(path):
    return send_from_directory('photos', path)


@app.route('/cats', methods=['GET', 'POST'])
def cats():
    if request.method == 'GET':
        query = 'select * from cats_photos'
        photos = sql_transaction(query)
        if isinstance(photos, sqlite3.Error):
            return make_response({"Error": str(photos)}, 500)
        return jsonify(list(map(lambda p: {'id': p[0], 'photoUrl': p[1],
                                           'breed': p[2], 'owner': p[3]},
                                photos)))
    else:
        pass


@app.route('/cats/photo', methods=['GET'])
def cats_url():
    query = 'select photoUrl from cats_photos'
    urls = sql_transaction(query)
    if isinstance(urls, sqlite3.Error):
        return make_response({"Error": str(urls)}, 500)
    return jsonify([t[0] for t in urls])


@app.route('/cats/<string:breed>', methods=['GET'])
def cats_photo_by_breed(breed):
    query = 'select * from cats_photos where breed=?'
    photos = sql_transaction(query, (breed, ))
    if isinstance(photos, sqlite3.Error):
        return make_response({"Error": str(photos)}, 500)
    return jsonify(list(map(lambda p: {'id': p[0], 'photoUrl': p[1],
                                       'breed': p[2], 'owner': p[3]},
                            photos)))


@app.route('/cats/<string:breed>/photo', methods=['GET'])
def cats_url_by_breed(breed):
    query = 'select photoUrl from cats_photos where breed=?'
    urls = sql_transaction(query, (breed, ))
    if isinstance(urls, sqlite3.Error):
        return make_response({"Error": str(urls)}, 500)
    return jsonify([t[0] for t in urls])


@app.route('/cats/<int:id>', methods=['GET', 'DELETE'])
def cats_photo_by_id(id):
    if request.method == 'GET':
        query = 'select * from cats_photos where id=?'
        photo = sql_transaction(query, (id,))
        if isinstance(photo, sqlite3.Error):
            return make_response({"Error": str(photo)}, 500)
        elif photo:
            return jsonify((lambda p: {'id': p[0], 'photoUrl': p[1],
                                       'breed': p[2], 'owner': p[3]})
                           (photo[0]))
        else:
            abort(404)
    else:
        query = 'delete from cats_photos where id=?'
        photo = sql_transaction(query, (id,))
        if isinstance(photo, sqlite3.Error):
            return make_response({"Error": str(photo)}, 424)
        else:
            return make_response({"code": 'SUCCESS'}, 204)


@app.route('/cats/<int:id>/photo', methods=['GET', 'UPDATE'])
def cats_url_by_id(id):
    if request.method == 'GET':
        query = 'select photoUrl from cats_photos where id=?'
        url = sql_transaction(query, (id,))
        if isinstance(url, sqlite3.Error):
            return make_response({"Error": str(url)}, 500)
        elif url:
            return url[0][0]
        else:
            abort(404)
    else:
        if PHOTO_NAME_EXPECTED not in request.files:
            return make_response({"Error: ":
                                  f'No {PHOTO_NAME_EXPECTED} field has found'},
                                 400)
        file = request.files[PHOTO_NAME_EXPECTED]
        if not file.filename or not allowed_file(file.filename):
            return make_response({"Error: ": 'Incorrect filename'}, 400)
        name = md5(file.filename.encode()).hexdigest()
        name += os.path.splitext(file.filename)[1].strip().lower()
        query = 'update cats_photos set photoUrl = ? where id=?'
        data = os.path.join('/photo/', name)
        res = sql_transaction(query, (data, id))
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        if not os.path.isfile(f'{app.config["UPLOAD_FOLDER"]}/{name}'):
            file.save(f'{app.config["UPLOAD_FOLDER"]}/{name}')
        return {'code': 'SUCCESS', 'url': data}


if __name__ == 'main':
    app.run(debug=True)

