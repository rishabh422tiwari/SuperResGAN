from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import shutil
from pathlib import Path
import os


import os.path as osp
import glob
import cv2
import numpy as np
import torch
import RRDBNet_arch as arch


app = FastAPI()



model_path = 'models/RRDB_ESRGAN_x4.pth'  # models/RRDB_ESRGAN_x4.pth OR models/RRDB_PSNR_x4.pth
#device = torch.device('cuda')  # if you want to run on CPU, change 'cuda' -> cpu
device = torch.device('mps')

model = arch.RRDBNet(3, 3, 64, 23, gc=32)
model.load_state_dict(torch.load(model_path), strict=True)
model.eval()
model = model.to(device)

test_img_folder = 'LR/*'

@app.post("/upload")
def upload(file: UploadFile = File(...)):
    files = glob.glob('LR/*')
    for f in files:
         os.remove(f)
    try:
        contents = file.file.read()
        with open(f'LR/{file.filename}', 'wb') as f:     
                f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    
    return {"message": f"Successfully uploaded {file.filename}"}

@app.get("/convert")
def convert():
    files = glob.glob('results/*')
    for f in files:
         os.remove(f)
    idx = 0
    for path in glob.glob(test_img_folder):
        idx += 1
        base = osp.splitext(osp.basename(path))[0]
        print(idx, base)
        # read images
        img = cv2.imread(path, cv2.IMREAD_COLOR)
        img = img * 1.0 / 255
        img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
        img_LR = img.unsqueeze(0)
        img_LR = img_LR.to(device)

        with torch.no_grad():
            output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()
        output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
        output = (output * 255.0).round()
        cv2.imwrite('results/{:s}_rlt.png'.format(base), output)
    path = r'/Users/rishabhtiwari/pytorch-test/SuperResGAN/results'
    file_path = os.path.join(path, os.listdir(path)[1])
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error" : "File not found" }
    # return {"message" : f"your result has been saved in folder result"}

# @app.get("/display")
# async def display_image():
#     path = r'/Users/rishabhtiwari/pytorch-test/SuperResGAN/results'
#     file_path = os.path.join(path, os.listdir(path)[1])
#     if os.path.exists(file_path):
#         return FileResponse(file_path)
#     return {"error" : "File not found" }