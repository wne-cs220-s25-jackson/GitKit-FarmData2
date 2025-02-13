#!/usr/bin/env bash

PROJ_ROOT=
PROJ_ROOT="${1}"

git config --global --add safe.directory "${PROJ_ROOT}"
git config --global pull.ff only
git config --global credential.helper store
git config --global init.defaultBranch main
git config --global merge.conflictstyle diff3
git config --global merge.tool vscode
git config --global mergetool.keepbackup false
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

cat "${PROJ_ROOT}/.gitpod/bashrc-additions.sh" >> "${HOME}/.bashrc"

"${PROJ_ROOT}/.kit/install-features-into-client/run.sh"
