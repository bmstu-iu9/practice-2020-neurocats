import json
import os

from flask import Flask, render_template, request, abort, make_response, jsonify
from flask_cors import CORS
import psycopg2

from api import User, CatsPhoto

template_dir = os.path.abspath('../frontend/public')

# establishing a connection to the database
with open('db_data.json') as f:
    global conn
    conn = psycopg2.connect(**json.loads(f.read()))


# initializing flask stuff
app = Flask(__name__, template_folder=template_dir)
CORS(app)


def sql_transaction(sql):
    cur = None
    try:
        cur = conn.cursor()
        cur.execute(sql)
    except psycopg2.Error as error:
        print("Error during interacting with database:", error)
        conn.rollback()
        return error
    else:
        if cur:
            return cur.fetchall()
    finally:
        if cur is not None:
            cur.close()


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
        elif isinstance(users, psycopg2.Error):
            return make_response({"Error": str(users)}, 424)

    else:
        new = User.fromJSON(json.dumps(request.get_json()))
        new_id = sql_transaction("insert into "
                                 "users(email, password, name, \"photoUrl\")"
                                 "values ('{0}', '{1}', '{2}', '{3}') "
                                 "RETURNING id".format(
                                  new.email, new.password, new.name, " "))
        conn.commit()
        resp = {'id': new_id, 'code': 'SUCCESS'}
        return make_response(json.dumps(resp), 201)


if __name__ == 'main':
    app.run(debug=True)
    conn.close()

