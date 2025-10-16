#!/bin/bash

# Replace Primary Default Tablet
sed -i.tmp '0,/Tablet: Default.*onClick={toggleRemake}/{s/onClick={toggleRemake}/onClick={() => toggleButton("primary-default-tablet")}/; s/${isToggled ? .toggled. : ..}/${buttonStates["primary-default-tablet"] ? "toggled" : ""}/}' ThemeToggleMoleculePreview.jsx

# Replace Primary Default Desktop
sed -i.tmp '0,/Desktop: Default.*onClick={toggleRemake}/{s/onClick={toggleRemake}/onClick={() => toggleButton("primary-default-desktop")}/; s/${isToggled ? .toggled. : ..}/${buttonStates["primary-default-desktop"] ? "toggled" : ""}/}' ThemeToggleMoleculePreview.jsx

echo "Done"
