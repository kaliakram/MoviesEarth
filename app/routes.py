from flask import request,render_template,url_for,redirect,jsonify
import requests
from dotenv import load_dotenv
import os
from pathlib import Path
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from openai import OpenAI

env_path=Path(__file__).resolve().parent.parent
load_dotenv(env_path)
def register_routes(app):
    limiter=Limiter(get_remote_address,app=app)
    @app.route("/")
    def index():
        return redirect(url_for("home"))
    @app.route("/home")
    @limiter.limit("1 per second")
    @limiter.limit("25 per minute")
    def home():
        return render_template("index.htm")
    @app.route(("/ai-movie-recommendation"))
    def ai_movie_recommendation():
        return render_template("airecom.html")
    @app.route('/about')
    def about():
        return render_template("aboutUs.html")
    @app.route("/explore-movies/<int:page>")
    @limiter.limit("1 per second")
    @limiter.limit("25 per minute")
    def explore_movies(page=1):
        if 1<=page<=500:
            return render_template("explore.html",page=page)
        else:
            return render_template("error404.html")
    @app.route("/get-movies/<int:pages>")
    @limiter.limit("1 per second")
    @limiter.limit("25 per minute")
    @limiter.limit("250 per hour")
    @limiter.limit("1000 per day")
    def get_movies(pages):
        api_key=os.getenv("TMDB_KEY")
        url=f"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page={pages}&sort_by=popularity.desc&certification_country=US&certification.lte=PG-13"
        headers={'accept':'application/json','Authorization':f"Bearer {api_key}"}
        response=requests.get(url,headers=headers)
        return jsonify(response.json())
    @app.route('/get_recommendation',methods=['POST'])
    @limiter.limit('5 per minute')
    @limiter.limit('1 per second')
    def get_recommendation():
        genres=request.json.get("genres",[])
        movies=request.json.get('movies',[])
        if genres==[]:
            genres="[users hadnt chose any genres]"
        if movies==[]:
            movies='[user hadnt chose any preffered movies]'
        prompt = (
        f"Given the user's preferences:\n"
        f"- Preferred genres: {genres}\n"
        f"- Previously liked movies: {movies}\n\n"
        f"Suggest exactly **one** movie title that matches these preferences.\n"
        f"⚠️ Do NOT include any explanation, reasoning, or additional text.\n"
        f"Only respond with the **movie name** on a single line.\n"
        f"The output will be used directly with the TMDB API."
        )

        api_key_llm=os.getenv('DEEPSEEK_KEY')
        client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key_llm,
        )

        completion = client.chat.completions.create(
        model="tngtech/deepseek-r1t2-chimera:free",
        messages=[
        {
        "role": "user",
        "content": f"{prompt}"
        }
        ]
        )
        query=completion.choices[0].message.content
        print(query)
        api_key_tmdb=os.getenv('TMDB_KEY')
        url2= f'https://api.themoviedb.org/3/search/movie?&query={query}'
        headers={
            'accept':'application/json',
            'Authorization':f'bearer {api_key_tmdb}'
        }
        response2=requests.get(url2,headers=headers).json().get('results',[])[0]
        return jsonify(response2)
    
    app.errorhandler(404)
    def error404():
        return render_template("error404.html")
    app.errorhandler(429)
    def error429(error):
        return jsonify(error)
    