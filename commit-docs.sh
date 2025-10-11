#!/bin/bash

# Quick commit helper for documentation updates

git add docs/AGENT-CONTEXT.md
git add docs/SESSION-LOGS/2025-10-10-1700.md
git add README.md

git commit -m "docs: update context and README with new component structure"

git push origin main

echo "✅ Documentation updated and pushed"
