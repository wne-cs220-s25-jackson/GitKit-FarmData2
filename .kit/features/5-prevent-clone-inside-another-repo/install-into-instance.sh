#!/usr/bin/env bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";

cat "$SCRIPT_DIR/prevent-clone-inside-another-repo.sh" >> "$SCRIPT_DIR/../8-git-shim/sub-shims/pre-clone"
