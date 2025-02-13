#!/usr/bin/env bash

# This file is installed into 8-git-shim/sub-shims.
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )"

function convert-url-to-org-repo() {
    url="$1"
    if [[ "$url" =~ ^git.* ]] ; then
        convert-git-url-to-org-repo "$url"
    else
        convert-http-url-to-org-repo "$url"
    fi
}

function convert-git-url-to-org-repo() {
    url="$1"
    url="$(remove-prefix-to-first-colon "$url")"
    url="$(remove-suffix-dot-git "$url")"
    echo "$url"
}

function convert-http-url-to-org-repo() {
    url="$1"
    url="$(remove-prefix-http "$url")"
    url="$(remove-suffix-dot-git "$url")"
    echo "$url"
}

function remove-prefix-to-first-colon() {
    echo "${1#*:}"
}

function remove-suffix-dot-git() {
    echo "${1%.git}"
}

function remove-prefix-http() {
    local url="${1}"
    url="${url#*//}"
    echo "${url#*/}"
}

if [ "$2" = "add" ] && [ "$3" = "upstream" ] ; then
    # shellcheck disable=SC1091
    source "$SCRIPT_DIR/../../5-detect-upstream-clone/upstream-location.sh"
    UPSTREAM_ORG_REPO="$(load-upstream-location)"
    ORG_REPO="$(convert-url-to-org-repo "$4")"
    if [ "$ORG_REPO" != "$UPSTREAM_ORG_REPO" ] ; then
        echo "*********************************************************************"
        printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
        echo
        echo "I think you have the wrong URL for 'upstream'."
        echo "One of the following is probably the problem:"
        echo
        echo "  * The URL you gave points to your fork."
        echo "  * The URL you gave points to the original, real project."
        echo "  * The URL you gave does not end in .git ."
        echo "  * The URL you gave does not start with https:// ."
        echo
        echo "To get the correct URL, in a Web-browser:"
        echo
        echo "  1. Navigate to your fork"
        echo "  2. Click the link near the top that follows 'forked from'."
        echo "  3. Click the 'Code' button."
        echo "  4. Select 'Local' and 'HTTPS'"
        echo "  5. Click the copy button."
        echo
        echo "Now try to create the 'upstream' remote again."
        echo "*********************************************************************"
        exit 1
    fi
fi
