#!/usr/bin/env bash

## This script is called after the new instance has been created and
## initialiazed. It runs in the local clone of the instance.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )"

set -e

workflows_dir="${REPO_DIR}/.github/workflows"
mkdir -p "$workflows_dir"
cp "$SCRIPT_DIR/allow-anyone-to-self-assign-an-issue.yaml" "$workflows_dir"
