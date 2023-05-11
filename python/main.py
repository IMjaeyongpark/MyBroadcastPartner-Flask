from datetime import time

from flask import Flask, Response

app = Flask(__name__)

@app.route('/sse')
def sse():
    def generate():
        a = True
        while a:
            yield 'data: {}\n\n'.format('Data 1')
            time.sleep(1)

    return Response(generate(), mimetype='text/event-stream')
