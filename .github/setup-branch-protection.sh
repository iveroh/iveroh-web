#!/bin/bash
set -e

OWNER=$1
REPO=$2

if [ -z "$OWNER" ] || [ -z "$REPO" ]; then
  echo "Usage: .github/setup-branch-protection.sh <owner> <repo>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RULESET_FILE="$SCRIPT_DIR/branch-ruleset.json"

if [ ! -f "$RULESET_FILE" ]; then
  echo "Error: $RULESET_FILE not found"
  exit 1
fi

echo "Setting up branch ruleset for $OWNER/$REPO..."

gh api repos/$OWNER/$REPO/rulesets \
  --method POST \
  --header "Accept: application/vnd.github+json" \
  --input "$RULESET_FILE"

echo "✅ Branch ruleset set up for main!"