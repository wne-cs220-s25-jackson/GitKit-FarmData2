#!/usr/bin/env bash

## This script is called once after the instance is cloned by a KitClient.
## It runs in the clone of the instance in a KitClient.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
PROJECT_DIR="$(git rev-parse --show-toplevel)"

cp "$SCRIPT_DIR/prevent-merge-to-main.sh" "$PROJECT_DIR/.git/hooks/pre-merge-commit"
chmod +x "$PROJECT_DIR/.git/hooks/pre-merge-commit"
