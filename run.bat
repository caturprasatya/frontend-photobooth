cd "C:\Users\Isama\Documents\Isa\Kerja\frontend-photobooth"
call npm run build --force
call npm install -g serve
serve -s build
pause