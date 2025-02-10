#!/usr/bin/env bash

## This script is called once after the instance is cloned by a KitClient.
## It runs in the clone of the instance in a KitClient.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";

INSTALL_INTO_SHELL_TEMPLATE_SH="$SCRIPT_DIR/install-into-shell_template.sh"
USER_KIT_DIR="$HOME/.kit"
INSTALL_INTO_SHELL_SH="$USER_KIT_DIR/install-into-shell.sh"
SUB_SHIMS_DIR="$SCRIPT_DIR/sub-shims"
BASHRC="${HOME}/.bashrc"

install() {
    generate-install-script
    call-install-script-from-bashrc
}

generate-install-script() {
    # Embed the path to the sub-shims directory into the install-into-shell script.
    mkdir -p "$USER_KIT_DIR"
    sed "s@replace-with-path-to-sub-shims@$SUB_SHIMS_DIR@" \
            "$INSTALL_INTO_SHELL_TEMPLATE_SH" > "$INSTALL_INTO_SHELL_SH"
    chmod +x "$INSTALL_INTO_SHELL_SH"
}

call-install-script-from-bashrc() {
    if [[ ! -e "$HOME/.kit/installed-gitkit-features" ]] ; then
        printf '# install git-shim\n' >> "$BASHRC"
        # shellcheck disable=SC2016
        printf '%s%s%s\n' 'eval "$(' "$INSTALL_INTO_SHELL_SH" ')"'  >> "$BASHRC"
    fi
}

install
