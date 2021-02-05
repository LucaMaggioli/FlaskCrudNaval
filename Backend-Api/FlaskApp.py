import flask


NavalCrudApp = flask.Flask("__main__")#by default static folder is templates #, static_folder="../react-frontend/src" , static_folder="../react-frontend/build"
NavalCrudApp.secret_key = '_TPD?nonPDT,ah_PDT!Patate._)?^'  #secret key to avoid hacking

@NavalCrudApp.route("/")
def my_index():
    
    return flask.render_template("index.html", token="Hello from flask")
