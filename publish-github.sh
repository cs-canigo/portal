#!/bin/bash

# Actualitzem els canvis que hagin pogut fer els companys
git pull

# Actualitzem index algolia
cd ../web-canigo
node _tasks/algolia/index-algolia.js

# Fem el commit i el push dels fonts
git add -A
git commit -m "new version"
git push

# Generem l'HTML
hugo

# Gestionem els possibles conflictes de majúscules i minúscules
cd ../web-canigo-public
find . -name "*Conflicto*"  -exec rm -rf {} \;
find . -name "*conflict*"  -exec rm -rf {} \;

# Actualitzem els canvis del projecte generat
git add -A
git commit -m "new version"
git push origin master --force

echo -e '\n'
