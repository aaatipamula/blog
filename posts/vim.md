---
title: Vim Test
subTitle: How to move in vim.
tags: [vim, test, lua]
image: ../src/images/vim.png
publishedDate: 10/25/2025 12:00 AM CDT
updatedDate: 10/27/2025 2:42 PM CDT
isPublic: true
---

# Overview

Vim is the best.

# Neovim

## TreeSitter

If you thought text objects were awesome, just you wait, this is even cooler.

[TreeSitter](https://tree-sitter.github.io/tree-sitter/) is a general purpose parser generator which aims to be:

- General
- Fast
- Robust
- Dependency-Free

Why does this matter for neovim? Mostly because of the power it gives its users. Because an entire parse tree is generated for each language that has a TreeSitter parser it makes navigating code objects such as functions, variables, blocks, etc much easier.

When setting up nvim-treesitter be sure to add the following to your setup:

> [!NOTE]
> Thanks to Josean Martinez and [this](https://www.josean.com/posts/nvim-treesitter-and-textobjects) blogpost on treesitter and text objects for the below snippet.

```lua
  incremental_selection = {
    enable = true,
    keymaps = {
      init_selection = "<C-space>",
      node_incremental = "<C-space>",
      scope_incremental = false,
      node_decremental = "<bs>",
    },
  },
```

This allows you to use `ctrl+space` to incrementally select tree sitter nodes all the way up to the root of the page and `backspace` to decrement.

This is incredibly powerful when basic vim text objects aren't robust enough to encompass complex syntaxes. 

A common one for me is function arguments. I can't use traditional text objects to select the entire argument if there's a type attached because there's a space which prevents me from using the `aW` text object.

```ts
function isEven(val: number, response: string) {
    return val % 2 == 0;
}
```

Above I'm not using the second argument. If I were to use traditional text objects I'd have to `daW` the argument and then `diw` the type. Just hitting `ctrl+space` a few times when my cursor is in the argument will select the entire argument for me to delete.

This can be taken even farther with plugins like [nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects) to define custom text objects!

# Vim Tips

## Insert Helpers

- `Ctrl + J` - Insert a new line
- `Ctrl + W` - Remove the last word
- `Ctrl + T` - Indent the current line
- `Ctrl + D` - De-indent the current line

## Use `:norm` to apply normal bindings to each line

Example: Replace a file extension for multiple lines

```js
somePath = `${BASE_PATH}/fileAA.txt`;
otherPath = `${BASE_PATH}/fileAB.txt`;
thisPath = `${BASE_PATH}/fileBA.txt`;
thatPath = `${BASE_PATH}/fileBB.txt`;
```

The lines can be selected with `vap` or `vip` and the following command can be used to replace the `.txt` extension with `.md`:

```vim
:norm _f.lciwmd
```
- `_` goes to the start of the line (not including whitespace)
- `f.` finds the first occurence of the `.` character
- `l` moves left one character
- `ciw` replaces the entire word ("txt" in this case)
- `md` replaces the text with md

## Use `e` in normal mode to go to the end of a word

Like the title suggest when in **NORMAL** mode you can hit `e` to got to the *end* of a word instead of the *start*.

## Use `Ctrl + a` to increment numbers

In visual mode `g<C-a>` increases each integer by some number n for each line. Additionally it will increment an integer by some count if an integer is under your cursor in normal mode.

Example: Create 20 variables numbered 1-20

```js
let someVariable0 = "..."
```

0. Make sure the variable indexes at 0
1. Copy the variable 19 more times with `yy19p`
2. Select the variables with `vip` or `vap`
3. Hit `g<C-a>` to increment by 1 or `2g<C-a>` to increment by 2, so on so forth

```js
let someVariable1 = "..."
let someVariable2 = "..."
let someVariable3 = "..."
let someVariable4 = "..."
let someVariable5 = "..."
let someVariable6 = "..."
let someVariable7 = "..."
let someVariable8 = "..."
let someVariable9 = "..."
let someVariable10 = "..."
let someVariable11 = "..."
let someVariable12 = "..."
let someVariable13 = "..."
let someVariable14 = "..."
let someVariable15 = "..."
let someVariable16 = "..."
let someVariable17 = "..."
let someVariable18 = "..."
let someVariable19 = "..."
let someVariable20 = "..."
```

## Use `:make` to run `make`

Running `:make` in vim will run the `make` command if you are in a directory which has a `Makefile`.

The program that is run when you use the `:make` command can be changed if you set the the `makeprg` (`mp`) option with `:set makeprg=...`. For example if you want to run a Python file, you can run the following commands to set the make program and run it all without leaving vim!

```vim
:set makeprg=python3\ %
:make
```

This can be extended even further by using auto commands to set `makeprg`. Here's an example snippet for a lua nvim config.

```lua
-- Use quick compile if a makefile isn't found (c, cpp)
autocmd({'FileType'}, {
  pattern = {'c', 'cpp'},
  callback = function (args)
    if vim.fn.findfile("Makefile", ".;") == "" then
      if args.match == "cpp" then
        -- Use custom script to compile cpp "+" and run "-r"
        vim.opt_local.makeprg = "qc -r + %"
      else
        vim.opt_local.makeprg = "qc -r %"
      end
    end
  end
})

-- Python3 make program
autocmd({'FileType'}, {
  pattern = 'py',
  callback = function ()
    vim.opt_local.makeprg = "python3 %"
  end
})

-- Node make program
autocmd({'FileType'}, {
  pattern = {'js', 'ts'},
  callback = function ()
    vim.opt_local.makeprg = "node %"
  end
})
```

## Make sessions in vim

You can make a session in vim with `mksession` or just `mks`.

It will save your open buffers, splits, tabs, positions, current directory, and settings you've applied in that session.

By default it will save your current session to a file called `Session.vim`. You can force save the file by appending a `!` and change the filename by typing out the file path after the command.

```vim
:mks! " This will force save to 'Session.vim'
:mks project.vim " This will save to the file 'project.vim'
```

You can reload it with the `-S` flag when you call vim.


```bash
vim -S Session.vim
```

## Very cool snippets

If you've edited plain markdown tables, you know this one is a must.

```lua
-- Format markdown tables with column
vim.keymap.set('v', '<leader>tf', ':! tr -s " " | column -t -s \'|\' -o \'|\'<cr>', { silent = true })
```

