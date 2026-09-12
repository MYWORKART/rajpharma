RAJ PHARMA EXPORTS - DATABASE VERSION

WHAT WAS CHANGED
----------------
- Your existing design/theme is preserved.
- Existing CSS is preserved.
- Existing animations are preserved.
- Contact enquiry form now saves data to MySQL.
- Added PHP backend.
- Added MySQL database file.

FILES
-----
index.html
style.css
script.js
backend/db.php
backend/submit_inquiry.php
backend/get_inquiries.php
database/raj_pharma.sql

HOW TO TEST ON YOUR COMPUTER
----------------------------
1. Install XAMPP.
2. Start Apache and MySQL.
3. Copy the RAJ-PHARMA-EXPORTS folder into:
   C:\xampp\htdocs\
4. Open:
   http://localhost/phpmyadmin
5. Import:
   database/raj_pharma.sql
6. Open:
   http://localhost/RAJ-PHARMA-EXPORTS/

IMPORTANT
---------
Do not open index.html by double-clicking it for database testing.
Open it through localhost as shown above.

The database name is:
raj_pharma_exports

The enquiries table is:
inquiries
