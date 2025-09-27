from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search")
async def search(query: str):
    # right now, the query should be a link
    # call oxylabs to scrape the link

    # results should contain the list of similar items
    return {"query": query, "results": []}

