from flask import render_template, flash, redirect
from app import app
from string import Template
import requests, urllib2
import json

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/diff/<int:title>/<section>/<int:startYear>/<int:endYear>")
def diff(title, section, startYear, endYear):
    diffs = []
    for s in section.split('+'):
        #todo parameterize url for requests, figure out how more complicated nested sections look coming in from the route
        r = requests.request(method='get', url='http://127.0.0.1:5001/getDiffs', data=getDiffRequestStruct(title, s, startYear, endYear))
        o = json.loads(r.text)
        diffs.append(generateDiffContent(r.text))
    return render_template("diff.html", title=title, section=section, startYear=startYear, endYear=endYear, diffs=diffs)

def getDiffRequestStruct(title, section, startYear, endYear):
    t = Template('{"title":$title, "section":$section, "before":$before, "after":$after}')
    return t.substitute(title=title, section=section, before=startYear, after=endYear)

#todo clarify api for what's getting returned, then implement parsing and html generation
def generateDiffContent(diff):
    content = {}
    content['original'] = diff
    content['diff'] = diff
    return content
