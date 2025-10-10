#!/bin/bash

# Import path updater for component reorganization
# Run from: apps/web/

BASE="/Users/biskup/git/kolkrabbi/kolkrabbi-monorepo/apps/web"

echo "🔧 Updating import paths..."

# Update Button imports (ButtonOriginal -> Button)
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|from ['\"].*components/common/ButtonOriginal['\"]|from '../components/ui/Button'|g" {} +
  
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|from ['\"]@/components/common/ButtonOriginal['\"]|from '@/components/ui/Button'|g" {} +

# Update SectionHeader imports
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|components/common/SectionHeader|components/ui/SectionHeader|g" {} +

# Update SectionLabel imports  
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|components/common/SectionLabel|components/ui/SectionLabel|g" {} +

# Update AnimatedTitle imports
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|components/common/AnimatedTitle|components/animation/AnimatedTitle|g" {} +

# Update VideoPreview imports
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|components/common/VideoPreview|components/animation/VideoPreview|g" {} +

# Update media component imports (ClippedImage, SanityImage, etc)
for component in ClippedImage InteractiveImage SanityImage RoundedCorners; do
  find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
    "s|components/common/$component|components/media/$component|g" {} +
done

# Update loader imports
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|common/loaders/ColorLoader|loaders/ColorLoader|g" {} +
  
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|common/loaders/SpinnerLoader|loaders/SpinnerLoader|g" {} +

# Update LoaderOverlay imports
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|components/common/LoaderOverlay|components/layout/LoaderOverlay|g" {} +

# Update ComingSoonCard imports
find "$BASE/src" -name "*.jsx" -type f -exec sed -i '' \
  "s|components/common/ComingSoonCard|components/sections/work/ComingSoonCard|g" {} +

echo "✅ Import paths updated!"
echo ""
echo "Verify changes with: git diff src/"
