from flask import render_template, flash, redirect
from app import app
from string import Template
import requests
import json
from app import constants, api

TESTING_ONE_SERVER_ONLY = False

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/about")
@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route("/diff/<int:title>/<section>/<int:startYear>/<int:endYear>")
def diff(title, section, startYear, endYear):
    backendDiffs = []
    frontendDiffs = []
    startDate = constants.dates[startYear]
    endDate = constants.dates[endYear]
    if not TESTING_ONE_SERVER_ONLY:
        for s in section.split('+'):
            # todo parameterize url for requests, 
            # figure out how more complicated nested sections look coming in from the route
            #requests.request(method='get', url='http://127.0.0.1:5001/getDiffs', data=getDiffRequestStruct(title, s, startYear, endYear))
            #o = json.loads(r.text)
            # diffs.append(generateDiffContent(r.text))
            backendDiffs = api.getDiffs(title, s, startDate, endDate) # TODO: this will prob need to be changed
            backendDiffs = backendDiffs["structure"]
            content = generateSectionDiffContent(s, backendDiffs)
            frontendDiffs.append(content)
    else:
        frontendDiffs = constants.dummy
    return render_template("diff.html", title=title, section=section, startYear=startYear, endYear=endYear, startDate=startDate, endDate=endDate, diffs=frontendDiffs)

def getDiffRequestStruct(title, section, startYear, endYear):
    t = Template('{"title":$title, "section":$section, "before":$before, "after":$after}')
    return t.substitute(title=title, section=section, before=startYear, after=endYear)

#todo clarify api for what's getting returned, then implement parsing and html generation
def generateSectionDiffContent(section, backendDiffs):  
    content = startSection(backendDiffs)
    content = process(backendDiffs, content, 0)
    return content

def getSubsections(s):
    pieces = s["subsections"]
    sortedPieces = sorted(pieces, key=lambda k: k['order'])
    return sortedPieces

def process(backend, frontend, indentLevel):
    try:
        frontend = processText(backend, frontend, indentLevel)
    except:
        print("no more text at level " + str(indentLevel))
    try:
        subsections = getSubsections(backend)
        for ss in subsections:
            frontend = process(ss, frontend, indentLevel + 1)
    except:
        print("no more subsections at level " + str(indentLevel))
    return frontend

def startSection(backend):
    content = {}
    if backend["name"] == "Section":
        content["section"] = backend["section"]
        content["text"] = []
    else:
        backend = getSubsections(backend)[0]
        content = startSection(backend)
    return content

def processText(backend, frontend, indentLevel):
    originalText = backend["text"]
    
    obj = {}
    obj["indentLevel"] = indentLevel
    obj["markUpContent"] = ""

    if backend["name"] != "Section":
        obj["markUpContent"] += "<span class='numbering'>("
        obj["markUpContent"] += backend["section"]
        obj["markUpContent"] += ")</span>"

    start = 0
    end = 0

    try:
        diffs = backend["diffs"]
        diffs = sorted(diffs, key=lambda k: k['position'])
        for diff in diffs:
            end = diff["position"]
            obj["markUpContent"] += originalText[start:end]
            start = end
        
            if diff["type"] == 0:
                obj["markUpContent"] += "<span class='add'>"
                obj["markUpContent"] += diff["add"]
                obj["markUpContent"] += "</span>"
            if diff["type"] == 1:
                obj["markUpContent"] += "<span class='delete'>"
                end = start + diff["remove"]
                obj["markUpContent"] += originalText[start:end]
                obj["markUpContent"] += "</span>"
                start = end
        obj["markUpContent"] += originalText[start:]
    except:
        obj["markUpContent"] += originalText

    frontend["text"].append(obj)

    return frontend

