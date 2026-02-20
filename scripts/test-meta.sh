#!/bin/bash
# Usage: ./scripts/test-meta.sh /stack/some-article
# Simulates a social crawler request and prints OG/Twitter tags from the response.
URL=$1
if [ -z "$URL" ]; then
  echo "Usage: $0 /path/to/route"
  exit 1
fi
curl -s -A "Twitterbot" -L "http://localhost:5173${URL}" | grep -E 'og:|twitter:|<title'
