#!/usr/bin/env bash


if [ "$2" = "upstream" ] && [ "$3" = "main" ] ; then
    BRANCH="$(git rev-parse --abbrev-ref HEAD)"
    if [ "$BRANCH" != "main" ] ; then
    echo "*********************************************************************"
    printf "\xF0\x9F\x98\xBA\xF0\x9F\x92\xBB Meow, Kit-tty here!\n"
    echo
    echo "It looks like you're trying to synchronize your clone and fork"
    echo "with changes in upstream. That's great!"
    echo
    echo "But you just tried to pull changes from upstream's main into"
    echo "your clone's $BRANCH branch."
    echo "Instead, you need be pull them into your clone's main branch."
    echo "Then you can finish by pushing pushing your clone's main to origin's."
    echo
    echo "Let's get you back on track. First switch to main, and then retry the"
    echo "pull command."
    echo "*********************************************************************"
    exit 1
    fi
fi
