let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Programming/hlu-js/refactoring/src/utils/launcher
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +137 ~/Programming/hlu-js/refactoring/src/index.mts
badd +123 ~/Programming/hlu-js/refactoring/src/model/types.ts
badd +25 ~/Programming/hlu-js/refactoring/src/model/constants.ts
badd +1 ~/Programming/hlu-js/refactoring/src/utils/index.ts
badd +1 ~/Programming/hlu-js/refactoring/src/utils/selector.ts
badd +1 ~/Programming/hlu-js/refactoring/src/utils/list.ts
badd +1 ~/Programming/hlu-js/refactoring/src/utils/input.ts
badd +1 ~/Programming/hlu-js/refactoring/src/utils/wine.ts
badd +178 ~/Programming/hlu-js/refactoring/src/utils/common.ts
badd +118 ~/Programming/hlu-js/refactoring/src/utils/settings.ts
badd +16 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherInit.ts
badd +12 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherRunner.ts
badd +208 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherCommand.ts
badd +17 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherRemover.ts
badd +9 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherInfo.ts
badd +90 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherGenerator.ts
badd +24 ~/Programming/slonum/slonum-admin-frontend/src/lib/entities/words/ui/StatisticWord/StatisticWord.module.scss
badd +19 ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherSGDB.ts
argglobal
%argdel
$argadd ~/Programming/hlu-js/refactoring/src/utils/index.ts
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherRemover.ts
argglobal
balt ~/Programming/hlu-js/refactoring/src/index.mts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 10 - ((9 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 071|
tabnext
edit ~/Programming/hlu-js/refactoring/src/model/types.ts
argglobal
balt ~/Programming/hlu-js/refactoring/src/index.mts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 91 - ((0 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 91
normal! 0
tabnext
edit ~/Programming/hlu-js/refactoring/src/model/constants.ts
argglobal
balt ~/Programming/hlu-js/refactoring/src/model/types.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 1 - ((0 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 028|
tabnext
edit ~/Programming/hlu-js/refactoring/src/utils/common.ts
argglobal
balt ~/Programming/slonum/slonum-admin-frontend/src/lib/entities/words/ui/StatisticWord/StatisticWord.module.scss
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 16 - ((0 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 040|
tabnext
edit ~/Programming/hlu-js/refactoring/src/utils/selector.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 102 + 97) / 194)
exe '2resize ' . ((&lines * 28 + 31) / 62)
exe 'vert 2resize ' . ((&columns * 91 + 97) / 194)
exe '3resize ' . ((&lines * 30 + 31) / 62)
exe 'vert 3resize ' . ((&columns * 91 + 97) / 194)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 22 - ((18 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 22
normal! 016|
wincmd w
argglobal
if bufexists(fnamemodify("~/Programming/hlu-js/refactoring/src/utils/launcher/launcherGenerator.ts", ":p")) | buffer ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherGenerator.ts | else | edit ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherGenerator.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherGenerator.ts
endif
balt ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherSGDB.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 90 - ((15 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 90
normal! 015|
wincmd w
argglobal
if bufexists(fnamemodify("~/Programming/hlu-js/refactoring/src/utils/launcher/launcherCommand.ts", ":p")) | buffer ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherCommand.ts | else | edit ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherCommand.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherCommand.ts
endif
balt ~/Programming/hlu-js/refactoring/src/utils/launcher/launcherRunner.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 26 - ((11 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 26
normal! 012|
wincmd w
exe 'vert 1resize ' . ((&columns * 102 + 97) / 194)
exe '2resize ' . ((&lines * 28 + 31) / 62)
exe 'vert 2resize ' . ((&columns * 91 + 97) / 194)
exe '3resize ' . ((&lines * 30 + 31) / 62)
exe 'vert 3resize ' . ((&columns * 91 + 97) / 194)
tabnext
edit ~/Programming/hlu-js/refactoring/src/utils/list.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 95 + 97) / 194)
exe 'vert 2resize ' . ((&columns * 98 + 97) / 194)
argglobal
balt ~/Programming/hlu-js/refactoring/src/utils/selector.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 35 - ((24 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 35
normal! 031|
wincmd w
argglobal
if bufexists(fnamemodify("~/Programming/hlu-js/refactoring/src/utils/input.ts", ":p")) | buffer ~/Programming/hlu-js/refactoring/src/utils/input.ts | else | edit ~/Programming/hlu-js/refactoring/src/utils/input.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Programming/hlu-js/refactoring/src/utils/input.ts
endif
balt ~/Programming/hlu-js/refactoring/src/utils/list.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 30 - ((14 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 30
normal! 032|
wincmd w
exe 'vert 1resize ' . ((&columns * 95 + 97) / 194)
exe 'vert 2resize ' . ((&columns * 98 + 97) / 194)
tabnext
edit ~/Programming/hlu-js/refactoring/src/utils/settings.ts
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 26 - ((25 * winheight(0) + 29) / 59)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 26
normal! 010|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
