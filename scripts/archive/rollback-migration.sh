#!/bin/bash

# ROLLBACK script - reverts component reorganization
# Run this if migration breaks something

BASE="/Users/biskup/git/kolkrabbi/kolkrabbi-monorepo/apps/web/src/components"

echo "⏪ Rolling back component reorganization..."

# Recreate common structure
mkdir -p "$BASE/common/loaders"

# Move UI back to common
echo "📦 Reverting UI components..."
mv "$BASE/ui/Button.jsx" "$BASE/common/ButtonOriginal.jsx"
mv "$BASE/ui/SectionHeader.jsx" "$BASE/common/"
mv "$BASE/ui/SectionLabel.jsx" "$BASE/common/"
rmdir "$BASE/ui" 2>/dev/null

# Move animation back to common
echo "✨ Reverting animation components..."
mv "$BASE/animation/AnimatedTitle.jsx" "$BASE/common/"
mv "$BASE/animation/AnimatedTitleStory.jsx" "$BASE/common/"
mv "$BASE/animation/.jsx" "$BASE/common/"
rmdir "$BASE/animation" 2>/dev/null

# Move media back to common
echo "🖼️  Reverting media components..."
mv "$BASE/media/ClippedImage.jsx" "$BASE/common/"
mv "$BASE/media/InteractiveImage.jsx" "$BASE/common/"
mv "$BASE/media/SanityImage.jsx" "$BASE/common/"
mv "$BASE/media/RoundedCorners.jsx" "$BASE/common/"
rmdir "$BASE/media" 2>/dev/null

# Move loaders back to common/loaders
echo "⏳ Reverting loaders..."
mv "$BASE/loaders/ColorLoader.jsx" "$BASE/common/loaders/"
mv "$BASE/loaders/SpinnerLoader.jsx" "$BASE/common/loaders/"
rmdir "$BASE/loaders" 2>/dev/null

# Move LoaderOverlay back to common
echo "📐 Reverting layout components..."
mv "$BASE/layout/LoaderOverlay.jsx" "$BASE/common/"

# Move ComingSoonCard back to common
echo "📝 Reverting domain-specific components..."
mv "$BASE/sections/work/ComingSoonCard.jsx" "$BASE/common/"

echo ""
echo "✅ Rollback complete! Structure restored to original."
echo ""
echo "To restore imports, run: git checkout -- apps/web/src/"
