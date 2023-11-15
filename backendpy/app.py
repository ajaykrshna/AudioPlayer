from flask import Flask, send_file, request, Response
from flask_cors import CORS
import os
import re
import json
from flask import jsonify
import random


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/song/<id>')
def song(id):
    file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../audio", f"{id}.mp3")
    range_header = request.headers.get('Range', None)
    if not range_header: 
        return send_file(file_path)

    size = os.path.getsize(file_path)
    byte1, byte2 = 0, None

    # Get range header
    m = re.search('(\d+)-(\d*)', range_header)
    g = m.groups()

    if g[0]: byte1 = int(g[0])
    if g[1]: byte2 = int(g[1])

    length = size - byte1
    if byte2 is not None:
        length = byte2 - byte1

    data = None
    with open(file_path, 'rb') as f:
        f.seek(byte1)
        data = f.read(length)

    rv = Response(data, 
        206,
        mimetype="audio/mpeg",
        direct_passthrough=True)
    rv.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(byte1, byte1 + length - 1, size))

    return rv

@app.route('/songlist', methods=['GET'])
def songlist():
    file_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "songs.json")
    with open(file_path, 'r') as f:
        songs = json.load(f)
    return jsonify(songs)


@app.route('/randomnumber')
def random_number():
    return str(random.randint(1, 48))


if __name__ == "__main__":
    app.run(port=5000)