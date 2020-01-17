---
title: 'Lean Software Development: Git rebasing to reduce cycle time'
date: '2020-01-16'
description: 'It sounds unlikely, but it works'
length: '7 min'
link: 'https://medium.com/swlh/lean-software-development-git-rebasing-to-reduce-cycle-time-81c311f1362'
---

When developing software following the Lean or Agile principles, it’s useful to monitor various metrics over time as a way of understanding a team’s capability and to help drive their improvement.

One such metric is the average cycle time — the average time spent on a given piece of work. Or from a Jira perspective: the time it takes for a ticket (story, task, bug etc.) to move from ‘In Progress’ through to ‘Done’.

![Cycle time](./cycle-time.png)

<center><small>https://screenful.com/blog/software-development-metrics-cycle-time</small></center><br />

Cycle time is therefore an indication of how quickly a team can deliver working software. Teams should always be looking to reduce their cycle times, ideally down to just a number of hours.

There are some common ways of doing this such as:

- Limiting work-in-progress (stop starting, start finishing)

- Breaking work into small pieces

**but there are many other creative ways to help drive cycle time down even further.**

Consider a typical Jira workflow:

![Jira stages](./jira-stages.png)

Each of these stages before ‘Done’ can be optimised to help reduce cycle time (assuming there isn’t a serious blocker further down the line). The stage we’ll examine here is ‘In Code Review’ — some code has been written and a pull request (PR) raised, which must then be reviewed by a peer, with the possibility of changes being requested.

There are two ways obvious ways to optimise this stage, one process-driven method and one technical method:

1. **Process:** ensure that there is someone available to review the pull request ASAP

1. **Technical:** ensure that the pull request is structured such that it can be reviewed quickly (and effectively)

For the rest of this article, we’ll look into the second, more technical option. It’s technical because PRs are typically managed through a Git process (to be reviewed on GitHub, GitLab, BitBucket, etc.), and mastering Git is definitely a technical skill.

## What makes a pull request easy (quick) to review?

A pull request is generally easy and therefore quick to review when it meets the following criteria:

1. Commits are atomic ⚛️

1. There are clear and descriptive commit messages ✍️

1. It can be read commit-by-commit 📖

**Atomic commits will** focus on a single change with its entire context, for example, tests relevant to the code changed should be included in the same commit. This allows the reviewer to also focus on only a single context which will make it quicker for them to understand and review. Atomic commits will also make it easier to achieve criteria number 2 because only one thing has to be described by the commit message.

**Clear and descriptive commit messages** will prevent the reviewer from having to ask about, guess, or figure out what’s changed — all things that would add risk and time to a code review.

A useful commit message will generally explain what has changed and why. Commit messages are free, so don’t worry if they end up a little longer than usual.

**Reading commit-by-commit** means that the reviewer can work through commits in chronological order without worrying that a commit is going to contradict one that came before it. In GitHub, this means that the review can be done using the ‘commits’ tab rather than the potentially huge ‘files changed’ tab.

![GitHub PR](./github-pr.png)

<center><small>An extreme example of commits vs files changed in GitHub.</small></center><br />

If commits aren’t ready to be reviewed chronologically, then trying to do so will inevitably lead to a wasted effort — the arch-enemy of Lean. Imagine you leave a comment on the first commit requesting a change to some code, only to find out that in a later commit the developer implements this change exactly as you had suggested. **Goes back to remove comment from first commit.**

This leaves no option but to review all changes in one view — the dreaded ‘files changed’ tab. Clearly, this is more difficult for the reviewer because they are now having to consider many changes, made even more difficult by the fact that they no longer have the commit messages readily available to help.

## Interactive Git rebasing to produce a great PR

Git offers interactive rebasing which means that commits can be changed before they go out as part of a PR — they can be edited, reordered, reworded, removed, squashed together and more. _Everything needed to transform any PR into one that matches the 3 criteria above_.

To start an interactive rebase, you must first decide which range of commits you would like to involve. The easiest way to do this is by running `git log --oneline`&nbsp;to find the commit from which the rebase should occur.

For example, imagine building a new CTA component which is to be used on a website homepage. The interactive rebasing process before raising the PR might be something like this:

    $ git log --oneline

    9dd84c6 Add documentation for CTA component
    7c37b4f Implement CAT in HomePage with tests
    d639a5f Tests for CTA
    304722d Build CTA functionality
    6aa1110 Boilerplate setup for CTA component

We want to change the commit history from and including commit 304722d (build CTA functionality), so we take the SHA of the commit _before_ that and use it in the command:

    git rebase -i 6aa1110

Alternatively, given that we want only that latest 4 commits, we could run `git rebase -i HEAD~4`&nbsp;to achieve the same thing.

This will display all commits involved in the rebase (in the opposite order as before i.e. most recent now at the bottom) and the available rebasing options:

    $ git rebase -i 6aa1110

    pick Build CTA functionality
    pick Tests for CTA
    pick Implement CAT in HomePage with tests
    pick Add documentation for CTA component

    # Rebase 6aa1110..9dd84c6 onto 6aa1110 (4 commands)
    #
    # Commands:
    # p, pick <commit> = use commit**
    # r, reword <commit> = use commit, but edit the commit message**
    # e, edit <commit> = use commit, but stop for amending**
    # s, squash <commit> = use commit, but meld into previous commit**
    # f, fixup <commit> = like "squash", but discard the commit message
    # x, exec <command> = run command (the rest of the line) using shell
    # b, break = stop here
    # d, drop <commit> = remove commit
    # l, label <label> = label current HEAD with a name
    # t, reset <label> = reset HEAD to a label
    # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]

A few useful options for preparing a pull request are:

- pick— leaving as this but changing the order of commits to make sure that they can be read chronologically

- reword — make commit messages clear and descriptive

- edit — modify an existing commit, or separate it into multiple commits so that commits remain atomic

- squash (or fixup )— squash multiple commits into one to make sure that the entire context of an atomic change is in a single commit e.g. a feature and its tests

In our ‘CTA on the homepage’ example, we would like to change 3 things about our commit history before raising the PR:

1. Squash the CTA tests commit into the one above it

1. Reword the commit with a spelling mistake (CTA spelt as CAT 🐈 )

1. Reorder the commits so that all commits related to building the new CTA are read before the implementation of it

which can be achieved by making our rebase look like this:

    $ git rebase -i 6aa1110

    pick Build CTA functionality
    **squash** Tests for CTA
    **pick** Add documentation for CTA component
    **reword** Implement CAT in HomePage with tests

    # Rebase 6aa1110..9dd84c6 onto 6aa1110 (5 commands)
    ....

After saving, the commits will be replayed from top to bottom. The rebase will stop each time it gets to a commit that requires user input — edit, reword, squash (but not fixup) etc. Make the manual change and continue the rebase by either saving the change (if rewording for example) or git rebase --continue (if editing a commit) until the rebase is complete.

Interactive rebasing can cause merge conflicts, especially when making multiple changes in a single rebase. These can be solved as usual, and the rebase continued with git rebase --continue. If the conflicts ever do become too much though, you can easily abort the entire rebase with git rebase --abort.

Given that rebasing changes commit history, it means that after a rebase you’ll have to be force push to the remote branch, which is a dangerous move when working with others. I would highly recommend forcing with lease:

    git push --force-with-lease

which is a much safer option as it will not overwrite work on the remote if commits have been added by someone else.

## Summary

Code reviews can make up a significant portion of the cycle time for a piece of work, and so it’s worth trying to reduce the time they take with some simple Git rebasing.

Although there might be an initial upfront cost of adding some additional Git work, it’ll quickly become second nature and very soon you’ll start to see an overall saving of time as code reviews become much less of an overhead.

Once you start reviewing PRs that having been structured as described here, it’s difficult to ever go back.
