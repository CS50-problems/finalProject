from flask import Flask
from flask import request
from flask import render_template
import spotifyAPIapp, keys

app = Flask(__name__)

@app.route('/',methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return render_template("response.html", response = spotifyAPIapp.main(keys.spotifyID, keys.spotifyKey, keys.spotifyPlaylist))
    else:
        return render_template("index.html")