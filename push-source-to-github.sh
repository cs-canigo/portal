#!/bin/bash
# Esborrem el contingut actual
# rm -fr ../web-canigo-public
# Generem el HTML
#hugo
#
find . -name "*Conflicto*"  -exec rm -rf {} \;
find . -name "*conflict*"  -exec rm -rf {} \;
git add -A
git commit -m "new version"
git push origin master --force

echo -e '\n'
