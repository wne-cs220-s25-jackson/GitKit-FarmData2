#!/usr/bin/env bash

# Hook to verify that commits are not made to the main branch accidentally
# Based on https://gist.github.com/ilyakatz/4625224#file-pre-commit-master-no-no

if [[ $(git symbolic-ref HEAD) == "refs/heads/main" ]]
then
  echo "**********************************************************************"
  printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
  echo "You should not be committing to the main branch."
  echo "You should be committing to a feature branch."
  echo
  echo "Here's how:"
  echo
  echo "1. Create a feature branch, if you don't already have one."
  echo
  echo "    git branch <branchname>"
  echo
  echo "2. Switch to that branch."
  echo
  echo "    git switch <branchname>"
  echo
  echo "3. Retry your commit."
  echo
  echo "That's it! Have fun! Meow!"
  echo "**********************************************************************"
  exit 1
fi
