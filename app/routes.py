from flask import render_template, flash, redirect
from app import app

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/diff/<int:title>/<section>/<int:startYear>/<int:endYear>")
def diff(title, section, startYear, endYear):
    return render_template("diff.html", title=title, section=section, startYear=startYear, endYear=endYear)