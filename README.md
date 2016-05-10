# BurnDayStatus
Check out the full map on http://slu.cartodb.com/viz/942746a6-a0d5-11e4-808e-0e0c41326911/public_map!

This project updates the permissions for burning on a given day for San Luis Obispo county. It works via Google Apps Scripts. On the Admin Report Google sheet there is a script that runs based on a variety of triggers. Burn day runs each time a field is edited. The script makes an SQL update to the SLU cartodb account which is then hosted via Github pages.
