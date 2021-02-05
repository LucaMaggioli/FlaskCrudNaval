import flask

app = flask.Flask("__main__", static_folder="../react-frontend/build")#, static_folder="../react-frontend/src"
#by default static folder is templates

@app.route("/")
def my_index():
    return flask.render_template("index.html", token="Hello from flask")

app.run(debug=True, port=5001)