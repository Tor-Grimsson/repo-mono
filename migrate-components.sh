#!/bin/bash

# Component reorganization script for kolkrabbi-monorepo
# Run from: apps/web/src/components/

BASE="/Users/biskup/git/kolkrabbi/kolkrabbi-monorepo/apps/web/src/components"

echo "🚀 Starting component reorganization..."

# Create new directories
mkdir -p "$BASE/ui"
mkdir -p "$BASE/animation"
mkdir -p "$BASE/media"
mkdir -p "$BASE/loaders"

# Move UI primitives
echo "📦 Moving UI components..."
mv "$BASE/common/ButtonOriginal.jsx" "$BASE/ui/Button.jsx"
mv "$BASE/common/SectionHeader.jsx" "$BASE/ui/"
mv "$BASE/common/SectionLabel.jsx" "$BASE/ui/"

# Move animation wrappers
echo "✨ Moving animation components..."
mv "$BASE/common/AnimatedTitle.jsx" "$BASE/animation/"
mv "$BASE/common/AnimatedTitleStory.jsx" "$BASE/animation/"
mv "$BASE/common/VideoPreview.jsx" "$BASE/animation/"

# Move media handlers
echo "🖼️  Moving media components..."
mv "$BASE/common/ClippedImage.jsx" "$BASE/media/"
mv "$BASE/common/InteractiveImage.jsx" "$BASE/media/"
mv "$BASE/common/SanityImage.jsx" "$BASE/media/"
mv "$BASE/common/RoundedCorners.jsx" "$BASE/media/"

# Move loaders to top level
echo "⏳ Moving loaders..."
mv "$BASE/common/loaders/ColorLoader.jsx" "$BASE/loaders/"
mv "$BASE/common/loaders/SpinnerLoader.jsx" "$BASE/loaders/"
rmdir "$BASE/common/loaders"

# Move LoaderOverlay to layout
echo "📐 Moving layout components..."
mv "$BASE/common/LoaderOverlay.jsx" "$BASE/layout/"

# Move ComingSoonCard to sections (it's work-specific)
echo "📝 Moving domain-specific components..."
mv "$BASE/common/ComingSoonCard.jsx" "$BASE/sections/work/"

# Remove empty common directory
rmdir "$BASE/common" 2>/dev/null && echo "✅ Removed empty common/ directory" || echo "⚠️  common/ not empty, check remaining files"

echo ""
echo "✅ Migration complete!"
echo ""
echo "Next steps:"
echo "1. Update imports in files that reference moved components"
echo "2. Run: find . -name '*.jsx' -exec sed -i '' 's|common/ButtonOriginal|ui/Button|g' {} +"
echo "3. Run: find . -name '*.jsx' -exec sed -i '' 's|common/loaders/|loaders/|g' {} +"
echo "4. Test the app: yarn dev"
echo "5. Commit: git add . && git commit -m 'refactor: reorganize component structure'"
