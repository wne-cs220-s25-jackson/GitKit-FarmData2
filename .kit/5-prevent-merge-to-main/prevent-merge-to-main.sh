#!/usr/bin/env bash

# Hook to verify that commits are not made to the main branch accidentally
# Based on https://gist.github.com/ilyakatz/4625224#file-pre-commit-master-no-no

if [[ $(git symbolic-ref HEAD) == "refs/heads/main" ]]
then
  echo "**********************************************************************"
  printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
  echo "You should not be merging to the main branch."
  echo "You should only be merging into a feature branch."
  echo "The working tree is still in a merging state."
  echo
  echo "Before continuing, run the command:"
  echo
  echo "    git reset --merge"
  echo
  echo "Ignore messages after this line"
  echo "**********************************************************************"
  exit 1
fi
