
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recipes')
def recipes():
    return render_template('recipes.html')

@app.route('/diets')
def diets():
    return render_template('diets.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/faqs')
def faqs():
    return render_template('faqs.html')

if __name__ == '__main__':
    app.run(debug=True)
