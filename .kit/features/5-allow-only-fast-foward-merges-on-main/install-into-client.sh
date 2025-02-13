#!/usr/bin/env bash

## This script is called once after the instance is cloned by a KitClient.
## It runs in the clone of the instance in a KitClient.

git config --local branch.main.mergeoptions "--no-ff"
