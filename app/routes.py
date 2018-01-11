from flask import render_template, flash, redirect
from app import app

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/diff/<int:title>/<int:section>")
def diff(title, section):
    return render_template("diff.html", title=title, section=section)