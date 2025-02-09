#!/usr/bin/env bash

UPSTREAM_LOCATION_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";

save-upstream-location() {
    echo "${1}" > "${UPSTREAM_LOCATION_DIR}/upstream-location.txt"
}

load-upstream-location() {
    cat "${UPSTREAM_LOCATION_DIR}/upstream-location.txt"
}
