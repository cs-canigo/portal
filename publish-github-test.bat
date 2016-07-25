@echo off

rem cd ../web-canigo-public 

rem del *.* /Q 
rem dir *. /b > directories.txt 
rem for /f %%a in (directories.txt) do (
rem  	rmdir %%a /s /q 
rem )
rem del directories.txt

rem cd ../web-canigo

rem Actualitzem els canvis que hagin pogut fer els companys
git pull >nul

rem Actualitzem fitxer de canvis per a indexar
rem git status --s 
git status --s > ../web-canigo-algolia/commit.txt

rem Fem el commit i el push dels fonts
git add -A >nul
git commit -m "new version" >nul
git push

rem Actualitzem index algolia
cd ../web-canigo-algolia
node index-algolia-partial.js



pause