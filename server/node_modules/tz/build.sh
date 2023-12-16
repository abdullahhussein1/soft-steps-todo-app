#!/usr/bin/env bash

echo "adding tzinfo..."
echo "(function(){window.TZINFO=" > tz.js
cat tz.json >> tz.js
echo "})();" >> tz.js
echo "adding dst..."
curl https://raw.github.com/chrisdickinson/dst.js/master/index.js 2>/dev/null >> tz.js
echo "adding tz..."
echo ';'>>tz.js
cat index.js >> tz.js
COMMAND=
for i in uglifyjs jsmin NULL; do
	command -v $i 2>&1>/dev/null && COMMAND=$i && break
done 

command -v $COMMAND 2>&1>/dev/null && cat tz.js | $COMMAND > tz.min.js

echo "done."
