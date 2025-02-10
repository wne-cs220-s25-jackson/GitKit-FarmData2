#!/usr/bin/env bash

## This script is called after the new instance has been created and
## initialiazed. It runs in the local clone of the instance.

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
cd "$SCRIPT_DIR"

set -e

yq '.[].color' < labels.json > colors.txt
yq '.[].name' < labels.json > names.txt
paste names.txt colors.txt > names-colors.txt

IFS=$'\t'
while read -r n c ; do
    gh label create --force "$n" --color "$c" &> /dev/null || true
    sleep 1
done < names-colors.txt
IFS=$' \t\n'

rm names-colors.txt colors.txt names.txt
