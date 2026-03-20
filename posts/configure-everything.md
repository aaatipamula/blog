---
title: Configure Everything
subTitle: My exerience with Arch Linux (I use Arch BTW 🤓☝️)
tags: [linux, archlinux, windows, os]
image: "@img/niri.png"
publishedDate: Fri Mar 20 12:22:03 PM CDT 2026
isPublic: true
---

I've been using Arch Linux as my main operating system on my school laptop for a little over a year and a half now. And, although it is extremely embarrassing and particularly horrifying to admit, I've really enjoyed using it. As much as I have enjoyed it, however, I will likely **not** install or use it again. This post will go over the process of installing Arch, talk about what I configured and used, and sum up my experience using Arch.

[Skip to my Thoughts](#final-thoughts)

# Why Move to Linux?

> I just *needed* to get off Windows.

Although many people have been switching to Linux this past year for various *ahem* reasons, this switch was was long coming for me. Even before [Microslop](https://microsoft.com) began to enshittify their operating system with AI and pushing out garbage updates[^microslop]. The inability to create local accounts and the sheer amount of bloat that I felt came with Windows was more than enough for me. The only reason it lived on my laptop this far was because I may have needed to use the Office Suite (Excel, and *maybe* Word) for school work, and because my laptop (An Asus Zephyrus G14 2022 with its own set of problems) had better driver support for Windows. My laptop felt slow even though it was barely 3 years old, and most of my development work was done on WSL anyways (which took what seemed like an eternity to start up).

I had also discovered the joys and epic utility of [tiling window managers](https://en.wikipedia.org/wiki/Tiling_window_manager) and was using [Glaze-WM](https://github.com/glzr-io/glazewm) in Windows, but wasn't completely satisfied by its performance. It just felt clunky on startup and I had a few small issues with window layouts. Not to degrade the efforts of the Glaze developers, however. They were and are constantly pushing fixes and making improvements (at the time of writing this post at least) and doing an amazing job of putting together that wonderful project. I just saw how much more seamless (and better looking) tiling window management could be in Linux and knew I had to try it.

So one fateful day during my Junior year winter break, I decided to bite the bullet and switch to Linux.

# Why Arch Linux?

> Mostly because it seemed fun.

I'd been using Ubuntu as my WSL distro and almost exclusively on my homelab servers. It was fine and it got the job done, but I didn't like how outdated some apt packages were, especially for developer tools like [fzf](https://github.com/junegunn/fzf) or [neovim](https://neovim.io/). I had also previously used Fedora on a server, and even briefly installed it on my laptop before uninstalling it due to a few ...complications[^fedora-issues] lets say. Also, I didn't really want to deal with [SELinux](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) and so opted not to choose Fedora (again).

I was also exploring other distros such as [NixOS](https://nixos.org/), which was particularly interesting to me at the time because I had been extensively learning about functional programming. I also liked the idea of declarative and reproduce able builds that I would be able to use almost anywhere. But again I ended up deciding the amount of work I would need to put in to building a NixOS configuration would far outweigh the benefits I sought to reap.

Now, I'd been wanting to try Arch for a little bit. I'd heard of its "legendary" status as a hard to use and difficult to install distro, and I considered myself to be fairly Linux-savvy, so I wanted to see if I could pass the muster. Beyond that superfluous reason, however, I was also attracted to the extensive number of packages that [pacman](https://wiki.archlinux.org/title/Pacman), the Arch package manger, and the [AUR](https://wiki.archlinux.org/title/Arch_User_Repository) provided. I'd also seen other Arch-based distros which made installing Arch and setting it up much easier, but I knew if I was going to use Arch I was going to do it the OG way.

In all Arch just seemed like the next best step for me, I'd get the packages I wanted and a fun experience setting up and learning about it.

# Installing Arch 🤡

> I decided to dual-boot Arch with Windows. This would turn out to make installing Arch so, so much harder.

I actually started by installing Arch on an old desktop of mine. I followed the [arch wiki install](https://wiki.archlinux.org/title/Installation_guide) step-by-step and got it up and running with fairly no issues. After I felt confident that I wouldn't completely mess up my laptop's installation, I moved on to installing Arch on my laptop itself.

I cleared some space on my drive to shrink the partition size of my `C:` drive and followed some steps on [arch wiki dual-boot page](https://wiki.archlinux.org/title/Dual_boot_with_Windows) to disable fast startup and hibernation on my system as it could mess with my Linux install. That's about as far as I got before the problems started to appear.

After trying to install Arch according to the [installation section](https://wiki.archlinux.org/title/Dual_boot_with_Windows#Installation) of the dual-boot arch wiki page I **couldn't boot into Arch**, at least automatically. All that showed up was a seemingly cryptic error message and a console with a grub prompt.

> An example of the grub command prompt that I saw

![grub-cli](https://access.redhat.com/webassets/avalon/d/Red_Hat_Enterprise_Linux-8-Managing_monitoring_and_updating_the_kernel-en-US/images/f4e6c5b169c2cf4e5ee136a239aac936/grub2-command-shell.png)

I was completely stumped as to why Arch didn't just boot, and it took me a few days to resolve the issue. Long story short, Windows made my life harder and dual-booting meant that I had to create a really wonky work around.

> If you're interested in dual-booting Linux with Windows, or are interested in general please read the [The EFI Partition Boot Issue](#the-efi-partition-boot-issue) section at the bottom. It's a pretty interesting/fun read in my (nerdy) opinion.

That aside, I thought the actual install of Arch was pretty easy. I actually learned a lot about how an OS is installed on a system too. The wiki page (at least for the install section) was very detailed and informative, much like many Arch nerds online have touted. Although, I do see how it can be very overwhelming for anyone who is not at least vaguely familiar with Linux, the command line, or common applications and operating system components. I won't go through all the steps of my install since it was pretty bog-standard. The only thing I changed was using a [swap file](https://wiki.archlinux.org/title/Swap#Swap_file) instead of a [swap partition](https://wiki.archlinux.org/title/Swap#Swap_partition).

# Post-Install 📝

This is where my things got more interesting. For those who aren't familiar, Arch is an extremely bare-bones operating system by default. It really only gives you the minimum you *need* to have your OS functional. Installing and configuring everything you need is up to you, including things like networking, time sync, keyboard configuration, sound servers, and on and on and on.

## Asus Linux

My laptop has notoriously bad support for Linux out of the box. Luckily the '22 model of the G14 was the only one which came with Radeon graphics which made installing drivers that much easier. But other things just don't work well on linux if at all. Facial recognition doesn't work at all, power profiles, and GPU profiles also didn't work, battery charge limits, and access to keyboard backlighting and rgb also didn't work.

Luckily, I came across [Asus-Linux](https://asus-linux.org/) which provided a custom kernel, and software for controlling power profiles and GPU profiles! The install process wasn't bad at all, I just followed the steps to add their repo to pacman which allowed me to install their software. After that I had perfect access to adjust fan curves, backlighting, charge limits, and everything else that I had access to in Windows! This was super useful and I kinda lucked out with this project for sure.

## Networking and Time

I initially spent some time getting a time server and networking set up. I elected to use [systemd-timedsync](https://wiki.archlinux.org/title/Systemd-timesyncd) to synchronize my hardware clock. Prior to reading about time syncing I didn't realize how important it was for things like SSL/TLS and other security reasons. I also chose to use [systemd-networkd]() and [iwd]() for networking and [systemd-resolved]() for DNS. In hindsight however I would much rather choose to just use [NetworkManager]() instead of networkd and iwd to manage my internet. They both work fine together, but NetworkManager is a much more holistic solution.

## Window Managers and Desktop Environments

Finally, I got to the reason why Linux looked so cool. My graphical environment. I'd seen the screenshots and videos on [r/unixporn](https://reddit.com/r/unixporn) and was so ready to put together my own awesome and cool looking rice! Yet again, I would quickly realize how much of a time sink that could become.

I learned a lot about how graphical environments worked in general. To start, I found out there was a difference between a "Desktop Environment" and a "Window Manager". [Desktop environments](https://en.wikipedia.org/wiki/Desktop_environment) (DE) are what most people tend to expect out of a GUI these days. Its a whole package of multiple programs which make up a common graphical interface for managing the operating system. This can include things like settings menus, taskbars, app launchers, wallpaper setters. 

A [window manger](https://wiki.archlinux.org/title/Window_manager) is a specific piece of software that ships with a DE which simply manages the windows that you open. Unlike a DE, window managers don't have any other software they ship with. You have to install and configure everything that you would want including a taskbar, notification daemon, screenshot tool, so on so forth. The style of window manger that Windows uses is a *stacking window manager*, this just means that windows can overlap. A *tiling window manger* on the other hand doesn't stack windows and reserves space for each window on the screen so they don't overlap. A tiling window manager is what I elected to use however there are tons of different styles of window managers and you can learn a little more about them from [this](https://www.youtube.com/watch?v=VhuQz1Rs8t8) video. 

In addition to that I also learned of two different display server protocols for Linux, **X11** and **Wayland**. [X11](https://en.wikipedia.org/wiki/X_Window_System) is the long standing and widely used display server protocol. Most linux distributions have primarily shipped with this and most applications  support it. However X11 is old and bloated, with poor code quality and lots of politics surrounding its codebase. Which is why a new display protocol called [Wayland](https://wayland.freedesktop.org/) came around. This had the goal of being a replacement for X11 but made it very easy to develop with, extend and maintain it. It started out quite obscure but has really picked up traction in the past few years especially with popular window managers like **Hyprland**.

I knew I wanted to use a window manager and not a DE and I had two options in mind, [i3wm](https://i3wm.org/) and [hyprland]. 

### i3wm

I initially chose to use i3 because I'd heard about Wayland compatibility being somewhat limited and so decided that it would be my best bet for a smoother experience with most applications. I also had to setup a *compositor* with i3 since X11 doesn't provide one. A compositor is what allows for window managers to add those sweet sweet animations and opacity to windows. There's really only one good option for X11, which is [picom](https://github.com/yshui/picom). Wayland merges the window manager with the compositor which is another great benefit of Wayland. I had to set up a `.xinitrc` file with all the commands to set up things like keyboard delay and repeat, background, and trackpad inputs.

> My `.xinitrc` file for starting up i3wm

```bash
# ~/.xinitrc

# Set the key repeat delay and Hz
# 250 ms delay
# 30 Hz key repeat
xset r rate 250 30

# Start my background
~/.fehbg

# Set input clicks
xinput set-prop "ASUE120A:00 04F3:319B Touchpad" "libinput Tapping Enabled" 1
xinput set-prop "ASUE120A:00 04F3:319B Touchpad" "libinput Natural Scrolling Enabled" 1

# Start my window manager
exec i3
```

After a little bit of using i3 however I decided to switch to hyprland. This was for two reasons, 1) I couldn't get screenshots and display scaling to work easily on X11 and 2) I thought that configuration was really clunky. Most of that would be fixed on Wayland, and I also liked the eye-candy that hyprland provided over i3.

### Hyprland

Hyprland is where I stayed for a really long time. The configuration was pretty easy, and even better hyprland had a whole host of supporting apps which made my experience much better. This included things like `hyprpapr` for managing my background, `hypridle` for suspending my system automatically, and `hyprlock` for my lock screen. The default bar for hyprland, [waybar](https://github.com/alexays/waybar), was also great and ultra customizable. I had basically everything I needed.

> My current hyprland config

![hyprland](@img/hyprland.png)

There were a few issues with Wayland compatibility, especially for electron apps. But adding a few launch flags made them work exactly like they did on X11. In all I've found hyprland to be a pretty great both feature-wise and aesthetic-wise so I never felt the need to change off it[^niri-note].

## Configuring... Everything Else

There was a lot to configure. Almost anything and everything could be changed to my liking, from app launchers, to taskbars, to how my window manager felt and looked. This was by far the most time-consuming part of setting up Arch. Everything before this was done within a week or two. Configuring on the other hand is something that I'm still doing to this day. In fact I access my configs so often that I have a dedicated [script for accessing my configuration files](https://github.com/aaatipamula/dotfiles/blob/master/scripts/config).

> A list of programs I've configured, most of which I've added since installing Arch

```
-rw-r--r--  1 aaatipamula aaatipamula 3.7K Sep 27 14:55 .bashrc
drwxr-xr-x  3 aaatipamula aaatipamula 4.0K Sep 24 12:59 bat
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Sep 27 17:40 dunst
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Sep 30 10:19 electron
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Sep 27 20:21 environment.d
drwxr-xr-x  3 aaatipamula aaatipamula 4.0K Nov  8 11:08 fastfetch
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Mar 19 11:17 ghostty
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Mar  5 17:31 git
-rw-r--r--  1 aaatipamula aaatipamula  186 Aug 20  2025 .gitconfig
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Mar 19 11:20 hypr
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Oct  1 12:28 i3
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Mar 17 16:50 kitty
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Mar  8 17:11 niri
drwxr-xr-x  3 aaatipamula aaatipamula 4.0K Jan 29 17:18 nvim
-rw-r--r--  1 aaatipamula aaatipamula  88K May 14  2025 .p10k.zsh
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Sep 27 18:08 picom
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Sep 27 20:44 polybar
-rw-r--r--  1 aaatipamula aaatipamula 2.6K Mar  5 14:33 starship.toml
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Nov  8 16:22 swaync
drwxr-xr-x  3 aaatipamula aaatipamula 4.0K Oct 31 15:45 tmux
drwxr-xr-x  3 aaatipamula aaatipamula 4.0K Mar 17 16:33 .vim
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Oct 31 15:40 vscode
drwxr-xr-x  3 aaatipamula aaatipamula 4.0K Feb 19 11:25 waybar
-rw-r--r--  1 aaatipamula aaatipamula 1.2K Sep 27 15:20 .wezterm.lua
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K Sep 27 20:43 wofi
drwxr-xr-x  2 aaatipamula aaatipamula 4.0K May 31  2025 wsl
-rw-r--r--  1 aaatipamula aaatipamula  364 Sep 26 12:11 .xinitrc
-rw-r--r--  1 aaatipamula aaatipamula   31 Sep 26 12:12 .Xresources
-rw-r--r--  1 aaatipamula aaatipamula 3.6K Mar 17 16:30 .zshrc
```

Most things didn't need too much configuration, especially terminal emulators like `kitty` or `ghostty`. But other things changed a lot as I used them, e.g. `waybar`, `hypr`. Most of it was aesthetic but there were occasional functional changes that I made with my configuration.

I found this process to be fun (because I'm a nerd like that) but I definitely see how anyone would find it more so annoying or cumbersome. However, there are some tools that I've recently found which make it much easier to get things up and running including one for Wayland that I'm trying out right now called [noctalia shell](https://noctalia.dev/) (pretty solid btw 😤).

# Final Thoughts 💭

Arch is super fun to use (at least in the eyes of a Linux nerd). I learned a lot about Linux and the customization and ability to use the most up to date packages was not only fun, but extremely useful for me. Being able to install pretty much everything from `pacman` or the `AUR` made managing my system so much easier than using multiple package managers. Having to configure all my system programs from scratch was time consuming and somewhat challenging, but honestly I think I learned a lot and had fun doing it.

Yet, I think I'm now at a point where I don't want to deal with this anymore. Installing from scratch was a great learning experience, but I don't really want to deal with that fiasco again. I've also (mostly) had my fill experimenting and tinkering with programs. I know what I want and I know how to get it now. I'll continue to try new things as they come out, but unless I *have* to configure something from scratch again I don't *want* to. I might change my mind later, but right now I'm perfectly happy with where I am.

So the next time I have to configure my Linux system, I'll probably pick a distro that's easier to install (still Arch based tho), and I'll use software that I've already configured, or is already configured well out of the box. Arch was fun, but now I just want a stable system that just works.

---

## The EFI Partition Boot Issue

It is possible to use the same [EFI system partition](https://en.wikipedia.org/wiki/EFI_system_partition) to hold both the Windows and Linux kernels. In fact the Arch Wiki encourages that you do this. However if you install Windows first it only allocates around `100 MiB` for the EFI partition. This can be changed in the installer with relative ease when you are creating the partitions but this was not the case for me. I was stuck with a 100 MiB partition, which would cause me hours of pain and suffering.

When I first installed Arch Linux the Arch kernel was successfully put into the EFI partition. However Windows kernel + Windows bootloader + Arch kernel + the [Grub](https://en.wikipedia.org/wiki/GNU_GRUB) bootloader took up all the space in my 100 MiB EFI partition, which left no more space for my grub configuration file, which is what loaded the boot menu! That was why I kept getting that grub command line interface when I tried to boot.

I found an article which showed me how to [manually boot into linux](https://www.linuxfoundation.org/blog/blog/classic-sysadmin-how-to-rescue-a-non-booting-grub-2-on-linux) from the grub command line. I had to do this **every time** I rebooted or restarted my system for the next day or two.

My initial idea after I realized this was the issue was to just resize the boot partition. Alas, I realized that I couldn't as even if I deleted the EFI partition I couldn't expand the `C:` drive partition "backwards" to fill the EFI partition. So I had to resort to creating a new, larger, EFI partition *after* my `C:` drive partition. This left about `100MiB` of unpartitioned space at the front of my drive. I then had to reinstall the Windows kernel into my EFI partition, and *then* reinstall Arch and Grub. This was a HUGE pain in the ass to do and if I accidentally wiped the wrong partition it could be game over for me.

---

[^microslop]: At this point in time I'd heard that Microsoft was considering [putting ads](https://www.pcworld.com/article/623335/microsoft-says-we-werent-supposed-to-see-windows-file-explorer-ads.html) in the file explorer along with heavily pushing for [electron apps](https://www.windowslatest.com/2026/03/17/microsoft-wants-devs-to-build-electron-ai-apps-on-windows-11-says-no-need-of-native-code-despite-ram-concerns/) which take up enormous amounts of RAM on top of the already large amount just running Windows takes. This did *not* tickle my fancy. Also, [here's a video](https://www.youtube.com/watch?v=d8WEzjDx4-E) by the Primeagen where he went over some issues Windows has had recently.

[^fedora-issues]: I had tried dual-booting Fedora with Windows about 2 years earlier but ran into a particularly puzzling issue where my Wi-Fi driver just "deleted itself" when I booted into Fedora. It would work fine on Windows but as soon as I booted into Fedora, poof, Wi-Fi gone - even when I switched back to Windows. I eventually uninstalled Fedora as I couldn't get the issue to resolve itself, and didn't want to deal with it. However, *this issue persisted even with Fedora completely uninstalled from my laptop*, and it happened often. So often in fact that I opted to carry a USB with the Wi-Fi drivers for my laptop on it at all times. I later found out that Asus had opted to install a particularly bad Mediatek Wi-Fi chip in the 22 G14 which might have been the root cause my issues. Regardless, the issue went away after a while and after an unknown number of updates, and I was able to use my computer like a normal person within about a year.

[^niri-note]: I am currently trying out [niri](https://github.com/niri-wm/niri) which I'm really liking so far. I like the scrolling feature and integrated support for screenshots/screensharing. But configuration can be a little annoying, and some of the apps I've been using aren't playing nice with it. I might come back to this post later and include a section on it, but I don't have any definitive thoughts yet.

