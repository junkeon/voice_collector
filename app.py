from flask import Flask, request
from flask_cors import CORS, cross_origin
import glob, os,  argparse, json, base64

app = Flask(__name__, static_folder='../voice-collector/build', static_url_path='/')
CORS(app, support_credentials=True)

target_dir = './audio'

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/get_text", methods=['POST'])
@cross_origin(supports_credentials=True)
def get_text():
    msg = {'sent_list': []}

    with open('./script.txt') as f:
        tmp = f.readlines()
        
    for i, row in enumerate(tmp):
        row = row.strip().replace('\\n', '\n')
        msg['sent_list'].append([i, row, False])
        
    content = request.json
    user = content.get('user')      

    if user in os.listdir(target_dir):
        for t_name in glob.glob(os.path.join(target_dir, user, '*.txt')):
            t_name = os.path.basename(t_name)
            idx = int(''.join(filter(lambda x:x.isdigit(), t_name)))
            msg['sent_list'][idx][-1] = True
            
    else:
        print(os.path.join(target_dir, user))
        os.makedirs(os.path.join(target_dir, user), exist_ok=True)

    return json.dumps(msg, ensure_ascii=False)
    
@app.route("/send_audio", methods=['POST'])
@cross_origin(supports_credentials=True)
def send_audio():
    content = request.json
    user = content.get('user')
    audio = content.get('blob')
    idx = int(content.get('index'))
    scp = content.get('sent').replace('\n', ' ')
        
    dec_audio = base64.b64decode(audio)
    
    
    with open(os.path.join(target_dir, user, f'{idx:03d}.wav'), mode='wb') as f:
        f.write(dec_audio)
        
    with open(os.path.join(target_dir, user, f'{idx:03d}.txt'), 'w') as f:
        f.write(f'{idx}|{scp}')
    print(f'Success to save wav file of {user}')
    
    msg = {'state':'ok'}
    
    return json.dumps(msg, ensure_ascii=False)

if __name__ == "__main__":
    
    SERVICE_IP_ADDRESS = '0.0.0.0'

    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, required=True, default=5024)
    args = parser.parse_args()
    SERVICE_PORT = args.port

    app.run(SERVICE_IP_ADDRESS, port=SERVICE_PORT)
