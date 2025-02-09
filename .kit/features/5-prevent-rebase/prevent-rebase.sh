#!/usr/bin/env bash

# Hook to verify that commits are not made to the main branch accidentally
# Based on https://gist.github.com/ilyakatz/4625224#file-pre-commit-master-no-no

# Disallow all rebasing
echo "**********************************************************************"
printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
echo "You should not be rebasing in this kit."
echo "You should be using 'git merge' instead."
echo "**********************************************************************"
exit 1
