Xvfb :10 -screen 0 1920x1080x16 &

x11vnc -rfbport 5910 -forever -localhost -display :10 &

websockify --web=/usr/share/novnc 8010 localhost:5910 &