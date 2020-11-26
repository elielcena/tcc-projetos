const express = require("express");

const app = express();
app.use(express.json());

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(list) {
  if (list.length <= 1) return list;
  const middle = Math.floor(list.length / 2);
  return merge(mergeSort(list.slice(0, middle)), mergeSort(list.slice(middle)));
}

app.get("/merge-sort", (req, res) => {
  lengthLista = req.query.lengthLista;
  randomListNumber = Array.from({ length: lengthLista }, () => Math.floor(Math.random() * lengthLista));
  return res.json(mergeSort(randomListNumber));
});

app.listen(3000);