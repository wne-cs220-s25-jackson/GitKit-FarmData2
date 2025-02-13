#!/usr/bin/env bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )"

cd "${REPO_DIR}" || exit 1

git switch main
git switch -c add-round-two-conflicts
git am "${SCRIPT_DIR}"/*.patch  || (echo "WARNING: could not apply patch" && git am --abort)
git switch main
