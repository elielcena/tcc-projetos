import random
from flask import Flask, jsonify, request

app = Flask(__name__)

def merge(left, right):
  final = []
  while left or right:
    if len(left) and len(right):
      if left[0] < right[0]: final.append(left.pop(0))
      else: final.append(right.pop(0))
    if not len(left): 
      if len(right): final.append(right.pop(0))
    if not len(right): 
      if len(left): final.append(left.pop(0))
  return final

def mergeSort(list):
  if len(list) < 2: return list
  mid = len(list) / 2
  return merge(mergeSort(list[:mid]), mergeSort(list[mid:]))

@app.route("/merge-sort", methods=['GET'])
def ok():
  lengthLista = int(request.args['lengthLista'])
  randomListNumber = [random.randint(1, lengthLista * 2) for _ in range(lengthLista)]
  return jsonify(mergeSort(randomListNumber)), 200

app.run(port = 3000)