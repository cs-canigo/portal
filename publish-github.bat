@echo off

rem cd ../web-canigo-public 

rem del *.* /Q 
rem dir *. /b > directories.txt 
rem for /f %%a in (directories.txt) do (
rem  	rmdir %%a /s /q 
rem )
rem del directories.txt

rem cd ../web-canigo

hugo >nul

cd ../web-canigo-public >nul
git add -A >nul
git commit -m "new version" >nul 
git push origin master --force

pause