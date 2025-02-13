#!/usr/bin/env bash

## This script is called once after the instance is cloned by a KitClient.
## It runs in the clone of the instance in a KitClient.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";

cat "$SCRIPT_DIR/prevent-pull-from-upstream-main-into-non-main.sh" >> "$SCRIPT_DIR/../8-git-shim/sub-shims/pre-pull"
