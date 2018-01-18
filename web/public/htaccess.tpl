AuthName "CSV Cleaner"
AuthType Basic
AuthGroupFile /dev/null
AuthUserFile "/path/to/htpasswd"
Require valid-user

# https://perishablepress.com/stupid-htaccess-tricks/
# disable directory browsing
Options All -Indexes

# secure .htaccess file
<Files .htaccess>
  Order allow,deny
  Deny from all
</Files>

# http://www.wpbeginner.com/wp-tutorials/9-most-useful-htaccess-tricks-for-wordpress/
<Files *.php>
  Order allow,deny
  Allow from all
  Satisfy any
</Files>

# <IfModule mod_headers.c>
#   Header set Access-Control-Allow-Origin "http://localhost:3000"
# </IfModule>
