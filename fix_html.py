import re
with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()
# Remove the stray 's and spaces between </p> and </div>
c = re.sub(r"</p>['\u2019]s\s+</div>", '</p>\n              </div>', c)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done')
