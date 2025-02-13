#!/usr/bin/env bash

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [ "$CURRENT_BRANCH" = "$2" ] ; then
    echo "*********************************************************************"
    printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
    echo
    echo "You are merging a branch into itself. This has no effect."
    echo "You probably intended to merge one branch into another."
    echo
    echo "To merge two branches, first switch to the branch you want to merge"
    echo "into.  Then merge the other branch into it. For example, if you want"
    echo "to merge main into my-cool-feature branch, then do the following:"
    echo
    echo "    git switch my-cool-feature"
    echo "    git merge main"
    echo
    echo "*********************************************************************"
fi
