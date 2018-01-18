from flask import render_template, flash, redirect
from app import app
from string import Template
import requests, urllib2

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/diff/<int:title>/<section>/<int:startYear>/<int:endYear>")
def diff(title, section, startYear, endYear):
    diffs = []
    for s in section.split('+'):
        #todo parameterize url for requests, figure out how more complicated nested sections look
        #diffs.append(requests.request(method='get', url='http://127.0.0.1:5001/getDiffs', data=getDiffRequestStruct(title, s, startYear, endYear)))
    return render_template("diff.html", title=title, section=section, startYear=startYear, endYear=endYear, diffs=diffs)

def getDiffRequestStruct(title, section, startYear, endYear):
    t = Template('{"title":$title, "section":$section, "before":$before, "after":$after}')
    return t.substitute(title=title, section=section, before=startYear, after=endYear)