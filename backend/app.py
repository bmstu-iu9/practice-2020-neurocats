import json
import os


from flask import Flask, request, make_response, jsonify, abort, send_from_directory
from hashlib import md5
from flask_cors import CORS
import sqlite3

from api import User

template_dir = os.path.abspath('../frontend/public')

ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg')
PHOTO_NAME_EXPECTED = 'file'

# initializing flask stuff
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'photos'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
cors = CORS(app, resources={r"/*": {"origins": r"^https?://localhost(:[0-9]{1,5})?$"},
                            r"/": {"origins": "*"}})


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
    return send_from_directory('static', 'index.html')


@app.route('/<path:path>', methods=['GET'])
def static_files(path):
    return send_from_directory('static', path)


@app.route('/static/css/<path:path>', methods=['GET'])
def static_css_files(path):
    return send_from_directory('static/static/css', path)


@app.route('/static/js/<path:path>', methods=['GET'])
def static_js_files(path):
    return send_from_directory('static/static/js', path)


@app.route('/static/media/<path:path>', methods=['GET'])
def static_media_files(path):
    return send_from_directory('static/static/media', path)


@app.route('/logos/<path:path>', methods=['GET'])
def static_logos_files(path):
    return send_from_directory('static/logos', path)


@app.route('/api/users', methods=['GET', 'POST'])
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


@app.route('/api/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
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
    elif request.method == 'PATCH':
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


@app.route('/api/users/<int:id>/cats', methods=['GET'])
def user_cats(id):
    query = 'select url from posted_cats where posted_by=?'
    cats = sql_transaction(query, (id, ))
    if isinstance(cats, sqlite3.Error):
        return make_response({"Error": str(cats)})
    return jsonify([c for t in cats for c in t])


@app.route('/api/users/<int:id>/photo', methods=['GET', 'POST'])
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


@app.route('/api/photo/<path:path>', methods=['GET'])
def send_photo(path):
    return send_from_directory('photos', path)


@app.route('/api/users/<int:id>/folder', methods=['GET'])
def get_breeds_for_user(id):
    query = 'select breed from cats_photos where owner=?'
    breeds = sql_transaction(query, (id, ))
    if isinstance(breeds, sqlite3.Error):
        return make_response({"Error": str(breeds)}, 424)
    breeds = [t[0] for t in breeds]
    return jsonify(list(set(breeds)))


@app.route('/api/cats', methods=['GET', 'POST'])
def cats():
    if request.method == 'GET':
        query = 'select * from cats_photos'
        photos = sql_transaction(query)
        query = 'select by_user from likes where photo=?'
        if isinstance(photos, sqlite3.Error):
            return make_response({"Error": str(photos)}, 500)
        return jsonify(list(map(lambda p: {'id': p[0], 'photoUrl': p[1],
                                           'breed': p[2], 'owner': p[3],
                                           'likes': [t[0] for t in sql_transaction(query, (p[0], ))]},
                                photos)))
    else:
        if PHOTO_NAME_EXPECTED not in request.files:
            return make_response({"Error: ":
                                  f'No {PHOTO_NAME_EXPECTED} field has found'},
                                 400)
        try:
            user = json.loads(request.form['json'])
        except KeyError as error:
            user = request.get_json()
            if user is None:
                return make_response({"Error": str(error)}, 400)
        if 'id' not in user:
            return make_response({"Error": "No user id passed"}, 400)
        file = request.files[PHOTO_NAME_EXPECTED]
        if not file.filename or not allowed_file(file.filename):
            return make_response({"Error: ": 'Incorrect filename'}, 400)
        name = md5(file.filename.encode()).hexdigest()
        name += os.path.splitext(file.filename)[1].strip().lower()
        query = 'insert into cats_photos(photoUrl, breed, owner) values(?, ?, ?)'
        path = os.path.join('/photo/', name)
        res = sql_transaction(query, (path, "", user['id']))
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        query = 'insert into posted_cats(posted_by, url) values(?, ?)'
        res = sql_transaction(query, (user['id'], path))
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        if not os.path.isfile(f'{app.config["UPLOAD_FOLDER"]}/{name}'):
            file.save(f'{app.config["UPLOAD_FOLDER"]}/{name}')
        return {'code': 'SUCCESS', 'url': path}


@app.route('/api/cats/<int:start>/list/<int:length>', methods=['GET'])
def list_of_photos(start, length):
    query = 'select photoUrl from cats_photos where id>=? limit ?'
    urls = sql_transaction(query, (start, length))
    urls = [t[0] for t in urls]
    return jsonify(urls)


@app.route('/api/cats/photo', methods=['GET'])
def cats_url():
    query = 'select photoUrl from cats_photos'
    urls = sql_transaction(query)
    if isinstance(urls, sqlite3.Error):
        return make_response({"Error": str(urls)}, 500)
    return jsonify([t[0] for t in urls])


@app.route('/api/cats/<string:breed>', methods=['GET'])
def cats_photo_by_breed(breed):
    query = 'select * from cats_photos where breed=?'
    photos = sql_transaction(query, (breed, ))
    if isinstance(photos, sqlite3.Error):
        return make_response({"Error": str(photos)}, 500)
    query = 'select by_user from likes where photo=?'
    return jsonify(list(map(lambda p: {'id': p[0], 'photoUrl': p[1],
                                       'breed': p[2], 'owner': p[3],
                                       'likes': [t[0] for t in sql_transaction(query, (p[0], ))]},
                            photos)))


@app.route('/api/cats/<string:breed>/photo', methods=['GET'])
def cats_url_by_breed(breed):
    query = 'select photoUrl from cats_photos where breed=?'
    urls = sql_transaction(query, (breed, ))
    if isinstance(urls, sqlite3.Error):
        return make_response({"Error": str(urls)}, 500)
    return jsonify([t[0] for t in urls])


@app.route('/api/cats/<int:id>', methods=['GET', 'DELETE'])
def cats_photo_by_id(id):
    if request.method == 'GET':
        query = 'select * from cats_photos where id=?'
        photo = sql_transaction(query, (id,))
        if isinstance(photo, sqlite3.Error):
            return make_response({"Error": str(photo)}, 500)
        elif photo:
            query = 'select by_user from likes where photo=?'
            return jsonify((lambda p: {'id': p[0], 'photoUrl': p[1],
                                       'breed': p[2], 'owner': p[3],
                                       'likes': [t[0] for t in sql_transaction(query, (p[0], ))]})
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


@app.route('/api/cats/<int:id>/photo', methods=['GET', 'PATCH'])
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
        query = 'update cats_photos set photoUrl = ? where id= ?'
        data = os.path.join('/photo/', name)
        res = sql_transaction(query, (data, id))
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
        if not os.path.isfile(f'{app.config["UPLOAD_FOLDER"]}/{name}'):
            file.save(f'{app.config["UPLOAD_FOLDER"]}/{name}')
        return {'code': 'SUCCESS', 'url': data}


@app.route('/api/cats/<int:id>/like', methods=['PATCH'])
def like_cat(id):
    user = request.get_json()
    if 'id' not in user:
        return make_response({"Error": "No user id passed"}, 400)
    query = 'select photo from likes where by_user=?'
    liked = sql_transaction(query, (user['id'], ))
    if isinstance(liked, sqlite3.Error):
        return make_response({"Error: ": str(liked)}, 424)
    elif not liked or (id, ) not in liked:
        test1 = 'select * from users where id=?'
        test2 = 'select * from cats_photos where id=?'
        if not sql_transaction(test1, (user['id'], )) or \
           not sql_transaction(test2, (id, )):
            return make_response({"Error": "Invalid id"}, 400)
        query = 'insert into likes(photo, by_user) values(?, ?)'
        res = sql_transaction(query, (id, user['id']))
        if isinstance(res, sqlite3.Error):
            return make_response({"Error": str(res)}, 424)
    return make_response({'code': 'SUCCESS'})


@app.route('/api/cats/<int:id>/unlike', methods=['PATCH'])
def unlike_cat(id):
    user = request.get_json()
    if 'id' not in user:
        return make_response({"Error": "No user id passed"}, 400)
    query = 'delete from likes where photo=? and by_user=?'
    res = sql_transaction(query, (id, user['id']))
    if isinstance(res, sqlite3.Error):
        return make_response({"Error": str(res)}, 424)
    return make_response({'code': 'SUCCESS'})


if __name__ == 'main':
    app.run(debug=True)

