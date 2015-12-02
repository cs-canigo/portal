@echo off

git add -A >nul
git commit -m "new version" >nul 
git push origin master --force

pause