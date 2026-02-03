---
title: Use Vim
subTitle: Why use vim + some tips and tricks
tags: [vim, nvim, lua]
image: ../src/images/vim.png
publishedDate: Sat Jan 31 11:39:03 PM CST 2026
isPublic: true
---

# Overview

Vim is often touted as a must-learn developer tool, but what really makes it worth learning? There are plenty of reasons to learn Vim, but the reasons why *I* keep going back to it are because of **vim motions** and **text objects** among some other things like customizability.

> Vim Motions - *Edit text like a wizard*

Vim motions take a bit to learn but once you learn them its like navigating text on roller skates. The core idea of vim is to be able to do everything with your keyboard. This is achieved through [modal editing](https://www.youtube.com/watch?v=wlR5gYd6um0). You always open vim in NORMAL mode. This mode allows you to navigate the text. But you don't just have to arrow through every line and character to get exactly where you need! Most beginners just use *hjkl* to move but there are so many other ways to navigate text. Check out the [Cool Vim Tips](#cool-vim-tips) section for some better ways to navigate text.

> Text Objects - *A mind palace for you text*

Text objects are probably the best feature of Vim in my opinion. Text objects allow for users to manipulate specific groups of text, such as words, sentences, paragraphs, text inside brackets, braces, tags, etc. While this is somewhat useful when dealing with regular text, it can be very useful to a developer. For example say I have the following function.

```c
int foo(int a, int b) {
    return a * b;
}
```

If I wanted to replace the parameters to the function with something else, all I would have to do is just navigate to the parenthesis and type `ci(` and boom all the text inside the parenthesis is gone and I'm in INSERT mode. 

It seems like a trivial example because you can do the exact same thing with a mouse by highlighting the text and typing. But when you really start to get comfortable with Vim it feels like you don't have to *think* about doing that, it just *happens*. That sounds kinda strange, but I feel like other proficient Vim users can attest to this. Properly learning Vim can make your development experience feel seamless. You think more about coding and less about the actual actions you're taking.

> Customizability - *Make vim yours*

Vim and its more modern son Neovim are both insanely customizable. I get that not everyone wants to spend hours and customizing their configuration down to every last letter, and that's totally fair. There are plenty of pre-existing configurations such as [lunar vim](https://www.lunarvim.org/) and [nvchad](https://nvchad.com/). But really understanding my configuration was a great learning experience for me, and I got to make my editor feel like home. Most configurations also take Vim to the next level and really make it pretty close to an IDE like VS code.

To be perfectly honest it takes some time and effort to get good at Vim. The learning curve is kinda steep initially and you won't be any faster or better at writing code. But after some time I think it starts to really stick with you. I remember learning Vim at first because I was messing around with a Linux server and needed to edit some config files. I was super slow and didn't really understand why anyone would use an editor like that. Once I started developing, however, I started to kind of miss editing text with Vim. I installed the Vim extension on VS Code and really started to get in touch with it. Not very long after that I pretty much ditched VS Code and moved to Vim entirely. I've been using Vim for the past 6 years now and haven't looked back.

# Cool Vim Tips

Below are some cool tips n' tricks I've picked up over the years of using vim.

## Movement

- `w` - Move forward a word
- `W` - Move forward a word (ignores special characters and jumps to the next white-space)
- `e` - Move to the end of a word
- `b` - Move back a word
- `f{char}` - Find the next instance of *char*
- `;` - Replays the last search
- `Ctrl+d` - Move down a page
- `Ctrl+u` - Move up a page
- `{` - Move back a paragraph
- `}` - Move forward a paragraph

## Insert Helpers

You can use the following bindings when in **INSERT** mode

- `Ctrl + J` - Insert a new line
- `Ctrl + W` - Remove the last word
- `Ctrl + T` - Indent the current line
- `Ctrl + D` - De-indent the current line

## Use `.` to repeat the last command

The `.` character replays the last thing you just did!

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


## Use `Ctrl + a` to increment numbers

`Ctrl+a` increments an integer by 1 (`Ctrl+x` decrements by 1). This can be used in conjunction with number prefixes, so you can basically do math in vim!

In visual mode `g<C-a>` increases each integer by some number n for each line. Additionally it will increment an integer by some count if an integer is under your cursor in normal mode.

Example: Create 20 variables numbered 1-20

```js
let someVariable0 = "..."
```

1. Make sure the variable indexes at 0
2. Copy the variable 19 more times with `yy19p`
3. Select the variables with `vip` or `vap`
4. Hit `g<C-a>` to increment by 1 or `2g<C-a>` to increment by 2, so on so forth

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
# Neovim

[Neovim](https://neovim.io) is vim's more modern son. It has some better defaults, and more importantly better integration and interfaces for developer tooling. This allows for things like LSP (Suggestions and autocomplete), better syntax highlighting and code navigation with TreeSitter. It also adds Lua as a scripting language so you don't have to learn Vimscript! In general its better to use for everyday development, but you should still keep a Vim configuration around for the odd time or two you need to use Vim on a server or can't access Neovim.

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
> Thanks to Josean Martinez and [this](https://www.josean.com/posts/nvim-treesitter-and-textobjects) blog post on treesitter and text objects for the below snippet.

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

# Resources

Below are a few resources that really helped me understand how to use Vim more effectively.

- `vimtutor` - Literally type this into your terminal and follow the instructions. It'll take you though a good chunk of the main features
- [Vim Cheat Sheet](https://vim.rtorr.com/) - Good to reference when you're starting out
- [Mastering the Vim Language](https://www.youtube.com/watch?v=wlR5gYd6um0) - An excellent video which explains motions and how to use them effectively!
