---
title: Scripting Is Awesome
subTitle: Why shell scripting is a software developer's best tool
tags: [shell, cli, bash, python]
publishedDate: Thu Aug 20 11:14:47 PM CDT 2026
isPublic: true
---

> I promised myself I would put out a post every month, and honestly I didn't really know what to talk about, so I guess I'm talking about this.

As I've been going through the first few months of my first full-time software engineering job I've come to really appreciate scripting.

Granted, a lot of the work I've done was just dealing with scripts. But beyond that I've been pumping out, or in some cases asking claude to pump out, script after script to help me get things done. I've run into all kinds of things I wouldn't normally run into with my small projects.

For example, I had to rename the extension of a ton of files in order for a tool in a pipeline to recognize and process the files. Now I could probably come up with some convoluted pipeline of find to sed to mv, but I recognized the utility of making that process a little flexible through a shell script so its more broadly applicable an easily invoked. This simple script is what I had claude come up with:

```bash
#!/usr/bin/env bash
#
# rename.sh - Rename files matched by a glob pattern, replacing their
# existing extension with a new one.
#
# Usage: ./rename.sh '<glob-pattern>' <new-extension>
#   <glob-pattern>   Glob pattern to match files (quote it to avoid premature
#                     shell expansion), e.g. '*.txt' or 'data/*.csv'
#   <new-extension>  New extension to apply, including the leading '.',
#                     e.g. '.bak'
#
# Example:
#   ./rename.sh '*.txt' .bak
#   report.txt -> report.bak

set -euo pipefail

if [[ $# -ne 2 ]]; then
    echo "Usage: $0 <glob-pattern> <new-extension>" >&2
    exit 1
fi

pattern="$1"
new_ext="$2"

if [[ "$new_ext" != .* ]]; then
    echo "Error: extension must start with '.' (got: '$new_ext')" >&2
    exit 1
fi

shopt -s nullglob

matched=false
for file in $pattern; do
    matched=true

    [[ -f "$file" ]] || continue

    dir=$(dirname -- "$file")
    base=$(basename -- "$file")

    # Strip existing extension (everything from the last '.' onward),
    # keeping files with no extension unchanged.
    if [[ "$base" == *.* ]]; then
        stem="${base%.*}"
    else
        stem="$base"
    fi

    new_file="$dir/$stem$new_ext"

    if [[ "$file" == "$new_file" ]]; then
        continue
    fi
ory
    mv -- "$file" "$new_file"
    echo "Renamed: $file -> $new_file"
done

if [[ "$matched" == false ]]; then
    echo "No files matched pattern: $pattern" >&2
    exit 1
fi
```

This script takes a glob pattern like `*.txt` and a new extension like `.md` and renames all the files matching the glob to the new extension, pretty neat!

Scripts don't even have to be super complicated, they can just make your life easier. Here's one I use all the time named `readme` which I put on my PATH for easy execution.

```bash
#!/bin/bash

if [[ -f ./README.md ]]
then
  $VISUAL ./README.md
else
  read -p "README.md not found, make it? [y/n]: " makeRdme
  if [[ "$makeRdme" = 'y' || "$makeRdme" = "yes" ]]
  then
    touch ./README.md && $VISUAL ./README.md
  else
    echo "Skipping..."
  fi
fi
```

It literally finds and opens a `README.md` file in the current directory! Seems simple, but honestly typing out all lowercase `readme` is so much easier than `vim REA<tab>` or some variation of that.

While `bash` scripting is the most common and widely available, I've also been really enjoying scripting with Python. Say what you will about it, but as a scripting language, it does a pretty good job in my opinion. I usually break out python for the more complicated scripting items where the logic is getting complex and or more robust data structures might be required to keep track of state.

[Here's](https://gist.github.com/aaatipamula/ebf496f5b1052cea392ea5c3bf9c617f) a python script I use to tarball my home directory into a hidden backup folder.

There are so many more things you can do with scripting which I probably haven't even discovered yet. It's potentially one of the most useful developer tools I've kept in my "toolbox", and definetly something that'll stay for a while, likely for the rest of time.
