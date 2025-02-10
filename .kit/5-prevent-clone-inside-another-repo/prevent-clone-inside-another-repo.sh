#!/usr/bin/env bash

# Prevent user from cloning a repo while already inside a repo

if [[ $(git status 2> /dev/null ) ]]
then
  echo "**********************************************************************"
  printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
  echo "You are trying to clone a repository when you are already in a"
  echo "repository. You should change your current working directory to the"
  echo "directory to where you want the newly cloned repository to be."
  echo
  echo "Change your current working directory to where you want the clone"
  echo "to be:"
  echo
  echo "    cd <desired-directory>"
  echo
  echo "Re-run your git clone command:"
  echo
  echo "    git clone <repository-url>"
  echo "**********************************************************************"
  exit 1
fi
