#!/usr/bin/env bash

## This script is called after the new instance has been created and
## initialiazed. It runs in the local clone of the instance.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";

source "${SCRIPT_DIR}/upstream-location.sh"

function main() {
    save-upstream-location "$(get-upstream-location)"
}

function get-upstream-location() {
    get-origin-location
}

function get-origin-location() {
    convert-url-to-org-repo "$(get-origin-url)"
}

function get-origin-url() {
    git remote get-url origin
}

function convert-url-to-org-repo() {
    local n="$1"
    if [[ "$n" =~ ^git.* ]] ; then
        # remove git@github.com prefix
        n="${n#git@github.com:}"
    else
        # remove https://github.com/ prefix
        n="${n#https://*github.com/}"
    fi
    # remove .git suffix
    n="${n%.git}"
    echo "$n"
}

function get-upstream-location-file() {
    echo "$SCRIPT_DIR/upstream-location.txt"
}

function commit-and-push-upstream-location() {
    git add "$(get-upstream-location-file)"
    git commit -m "build(kit): add upstream location"
    git push
}

main
