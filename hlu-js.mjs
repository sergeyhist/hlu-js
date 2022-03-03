#!/usr/bin/env zx
"use strict"
import {spawnSync} from 'child_process';
process.on('beforeExit', async () => {
  if (hlu_flags.restart == 0) {
    await script_exit()
  };
})

// Variables
const hlu_userpath = os.homedir+'/.local/share/Hist';
const hlu_bspath = hlu_userpath+'/Scripts';
const hlu_packspath = hlu_userpath+'/Packages';
const hlu_relpath = hlu_userpath+'/Packages/Releases';
const hlu_historypath = hlu_userpath+'/.history';
const hlu_logspath = hlu_userpath+'/.logs'
const hlu_defproton = hlu_userpath+'/.proton'
const steam_blocklist = ['228980','1391110','1161040','1826330'];
const steam_protonlist = ['1580130','1493710','1887720','1420170'];
const hlu_list = {
  wine: {
    prefixes: [],
    runners: []
  },
  proton: {
    prefixes: [],
    runners: []
  }
};
const steam_apps = {
  wine: [],
  native: [],
  proton_builds: [],
  blocklist: []
};
const pfx_commands_list =[
  {
    name: 'Wine config',
    command: 'winecfg'
  },
  {
    name: 'Control panel',
    command: 'control'
  },
  {
    name: 'Task manager',
    command: 'taskmgr'
  },
  {
    name: 'Explorer',
    command: 'explorer'
  },
  {
    name: 'Install/Uninstall apps',
    command: 'uninstaller'
  },
  {
    name: 'Registry editor',
    command: 'regedit'
  },
  {
    name: 'Kill running apps',
    command: 'wineserver -k'
  },
  {
    name: 'Force kill running apps',
    command: 'wineserver -k9'
  },
  {
    name: 'Custom command',
    command: 'input value'
  }
];
const os_version = await quiet($`hostnamectl | grep "Operating System" | cut -d: -f2 | tr -d ' ' | tr -d '\n'`);
const gpu_version = await quiet($`lspci | grep VGA`);
const hlu_flags = {
  restart: 0
}

// Check files
fs.ensureDirSync(hlu_packspath);
fs.ensureDirSync(hlu_relpath);
fs.ensureDirSync(hlu_historypath);
fs.ensureDirSync(hlu_logspath);
fs.ensureDirSync(hlu_defproton);
if (!fs.existsSync(hlu_userpath+'/prefixes.json')) {
  fs.outputJsonSync(hlu_userpath+'/prefixes.json', {
    wine: [
      {
        name: 'Default',
        path: os.homedir+'/.wine'
      }
    ],
    proton: [
      {
        name: 'Default',
        path: hlu_defproton
      }
    ]
  }, {
    spaces: 2
  });
};
if (!fs.existsSync(hlu_userpath+'/runners.json')) {
  fs.outputJsonSync(hlu_userpath+'/runners.json', {
    wine: [
      {
        name: 'Default',
        path: '/usr/bin/wine'
      }
    ],
    proton: []
  }, {
    spaces: 2
  });
};

// Init const variables
await steam_apps_init();
hlu_list_init();

// Main
switch (await list_options({
  name: 'Hist Linux Utilities',
  items: ['Launcher Controller','Wine/Proton Helper','Legendary Helper','Systemd Controller']
})) {
  case '1':
    switch (await list_options({
      name: 'Launcher Controller',
      items: ['Create launcher','Edit launcher','Run launcher','Delete launcher','Generate bash scripts','Display information']
    })) {
      case '1':
        switch (await list_options({
          name: "Launcher Creator",
          items: ["Wine","Proton","Linux","Legendary"]
        })) {
          case '1':
            await launcher_init('wine');
            break;
          case '2':
            await launcher_init('proton');
            break;
          case '3':
            await launcher_init('linux');
            break;
        };
        break;
      case '2':
        await launcher_editor();
        break;
      case '3':
        await launcher_runner();
        break;
      case '4':
        await launcher_remover();
        break;
      case '5':
        launcher_generator();
        break;
      case '6':
        await launcher_info();
        break;
    };
    break;
  case '2':
    switch(await list_options({
      name: 'Wine/Proton Helper',
      items: ['Prefix commands','Winetricks','Prefixes manager','Runners manager']
    })) {
      case '1':
        switch (await list_options({
          name: 'Prefix Type',
          items: ['Wine','Proton']
        })) {
          case '1':
            await prefix_commands('wine');
            break;
          case '2':
            await prefix_commands('proton');
            break;
        };
        break;
      case '2':
        await prefix_winetricks('wine');
        break;
      case '3':
        switch (await list_options({
          name: 'Prefix Type',
          items: ['Wine','Proton']
        })) {
          case '1':
            await prefix_manager('wine');
            break;
          case '2':
            await prefix_manager('proton');
            break;
        };
        break;
      case '4':
        await runner_manager();
        break;
    };
};


//Functions
async function general_input(qstring,hfile,def,text) {
  let input_choices = [];
  let history_string = '';
  if (def) {input_choices.push(def)};
  if (hfile) {
    if (fs.existsSync(hlu_historypath+'/'+hfile) && fs.statSync(hlu_historypath+'/'+hfile).size != 0) {
      for (let item of fs.readFileSync(hlu_historypath+'/'+hfile, {encoding:'utf8', flag:'r'}).split('\n')) {
        input_choices.push(item)
      }
    } else {
      await quiet($`touch ${hlu_historypath}/${hfile}`);
    };
    if (input_choices.length) {history_string = ' (press "'+chalk.cyan('Tab')+'" for '+chalk.green('history')+' or '+chalk.green('default')+')'};
  };
  if (text) {
    console.log(text);
  };
  let input_ans = await question(qstring+history_string+': ', {
    choices: input_choices
  });
  if (hfile) {
    if (input_ans != def) {
      if (fs.statSync(hlu_historypath+'/'+hfile).size != 0) {
        if (!input_choices.includes(input_ans)) {
          fs.appendFileSync(hlu_historypath+'/'+hfile, '\n'+input_ans)
        }
      } else {
        fs.appendFileSync(hlu_historypath+'/'+hfile, input_ans)
      }
    };
  };
  return input_ans;
}

async function list_options(list) {
  let list_output = ['\n'+chalk.bold.magenta(list.name)+'\n'];
  let list_desc = '';
  let list_value = '';
  for (let i in list.items) {
    if (list.descs) {list_desc = ' - '+chalk.blue(list.descs[i])};
    if (list.values) {list_value = ' - ('+chalk.cyan(list.values[i])+')'};
    list_output.push(' '+chalk.cyan(+i+1)+list_value+' - '+chalk.green(list.items[i])+list_desc);
  }
  while (true) {
    list_output.forEach(element => console.log(element));
    let input_ans = await question('\nChoose '+chalk.cyan('item')+' from the '+chalk.green('list')+
    ' above ('+chalk.cyan('q|Q')+' for '+chalk.green('exit')+'): ');
    switch (input_ans) {
      case 'q': case 'Q':
        if (list.options?.includes('continue')) {
          return 0;
        } else {
          await script_exit();
        };
      default:
        if (!isNaN(input_ans)) {
          if (input_ans <= list.items.length && input_ans > 0) {
            return input_ans;
          };
        };
    };
  };
}

async function general_selector(type, list) {
  switch (type) {
    case 'launchers':
      let launcher_number = +await list_options({
        name: 'Launchers',
        items: list_init(list, 'name')
      })-1;
      return [launcher_number, list[launcher_number]];
    case 'prefixes':
       return hlu_list[list].prefixes[+await list_options({
        name: 'Prefixes',
        items: list_init(hlu_list[list].prefixes, 'name'),
        descs: list_init(hlu_list[list].prefixes, 'path')
      })-1].path;
    case 'runners':
      return hlu_list[list].runners[+await list_options({
        name: 'Runners',
        items: list_init(hlu_list[list].runners, 'name'),
        descs: list_init(hlu_list[list].runners, 'path')
      })-1].path;
    case 'prefix commands':
      return pfx_commands_list[+await list_options({
        name: 'Prefix Commands',
        items: list_init(pfx_commands_list, 'name'),
        descs: list_init(pfx_commands_list, 'command')
      })-1].command;
    case 'git releases':
      return list[+await list_options({
        name: 'Git Releases',
        items: list_init(list, 'name'),
        descs: list_init(list, 'url')
      })-1].url;
  }
}

async function script_exit() {
  switch (await general_input('Restart '+chalk.green('HLU')+' ? '+chalk.cyan('y|N'))) {
    case 'y': case 'Y':
      hlu_flags.restart = 1;
      spawnSync(process.argv.shift(),process.argv,{
        "cwd":process.cwd(),
        "detached":true,
        "stdio":"inherit"
      });
    case 'n': case 'N': case '': case ' ':
      process.exit(1);
    default:
      await script_exit();
  };
}

async function git_releases(author, git_name, ext) {
  let git_objects;
  let git_result = [];
  let response = await fetch('https://api.github.com/repos/'+author+'/'+git_name+'/releases')
  if (response.ok) {
    git_objects = JSON.parse(await response.text());
    for (let i = 0; (i < 10 && i < git_objects.length); i++) {
      for (let item of git_objects[i].assets) {
        if (item.browser_download_url.includes('.'+ext)) {
          git_result.push({
            name: item.name,
            url: item.browser_download_url
          });
        };
      };
    };
  };
  return git_result;
}

function list_init(list, array) {
  let items = [];
  for (let item of list) {
    items.push(item[array])
  };
  return items;
}

async function exec_init(exec_path,ext) {
  let executables = {
    "all":[],
    "exec_names": [],
    "exec_paths": []
  };
  try {
    cd(exec_path);
    if (ext) {
      if (ext.includes('wine')) {
        executables.exec_names = await globby('', {
          expandDirectories: {files: ext}
        });
        executables.exec_paths = await globby('', {
          absolute: true,
          expandDirectories: {files: ext}
        });
      } else {
        executables.exec_names = await globby('', {
          expandDirectories: {extensions: ext}
        });
        executables.exec_paths = await globby('', {
          absolute: true,
          expandDirectories: {extensions: ext}
        });
      };
    } else {
      executables.all = await globby('', {
        absolute: true
      });
      for (let item of executables.all) {
        try {
          fs.accessSync(item, fs.constants.X_OK);
          executables.exec_names.push(path.basename(item));
          executables.exec_paths.push(item);
        } catch(e) {}
      };
    };
    return executables.exec_paths[+await list_options({
      name: "Executables",
      items: executables.exec_names,
      descs: executables.exec_paths
    })-1];
  } catch(e) {
    return exec_path;
  };
}

async function steam_apps_init() {
  let steam_libraries = [];
  let steam_appmanifests = [];
  let steam_tools = [];
  let steam_temp = '';
  if (fs.existsSync(os.homedir+'/.steam/root/steamapps/libraryfolders.vdf')) {
    steam_temp = await quiet($`echo $(grep path ${os.homedir}/.steam/root/steamapps/libraryfolders.vdf | cut -d'"' -f4) | tr -d '\n'`);
    for (let item of steam_temp.stdout.split(' ')) {
      steam_libraries.push(item)
    };
    for (let item of steam_libraries) {
      if (fs.existsSync(item)) {
        for (let item2 of await globby(item, {
          expandDirectories: {files: ['appmanifest_*']},
          deep: 2
        })) {
          steam_appmanifests.push(item2);
        };
      };
    };
    for (let item of steam_appmanifests) {
      let steam_appid = await quiet($`echo $(grep '"appid"' ${item} | cut -d'"' -f4) | tr -d '\n'`);
      let steam_name = await quiet($`echo $(grep '"name"' ${item} | cut -d'"' -f4) | tr -d '\n'`);
      steam_name = steam_name.stdout.replace(' \\','');
      let steam_path = await quiet($`echo $(grep '"installdir"' ${item} | cut -d'"' -f4) | tr -d '\n'`);
      let steam_dirname = await quiet($`dirname ${item} | tr -d '\n'`);
      if (steam_blocklist.includes(steam_appid.stdout)) {
        steam_apps.blocklist.push({
          name: steam_name,
          appid: steam_appid.stdout
        });
      } else if (steam_protonlist.includes(steam_appid.stdout)) {
        steam_apps.proton_builds.push({
          name: steam_name,
          appid: steam_appid.stdout,
          path: steam_dirname.stdout+'/common/'+steam_path.stdout+'/proton'
        });
      } else {
        if (fs.existsSync(steam_dirname.stdout+'/compatdata/'+steam_appid+'/pfx')) {
          steam_apps.wine.push({
            name: steam_name,
            appid: steam_appid.stdout,
            path: steam_dirname.stdout+'/common/'+steam_path.stdout,
            prefix: steam_dirname.stdout+'/compatdata/'+steam_appid
          });
        } else {
          steam_apps.native.push({
            name: steam_name,
            appid: steam_appid.stdout,
            path: steam_dirname.stdout+'/common/'+steam_path.stdout
          });
        };
      };
    };
  };
  if (fs.existsSync('/usr/share/steam/compatibilitytools.d/')) {
    steam_tools = await globby('/usr/share/steam/compatibilitytools.d/', {
      expandDirectories: {files: ['proton']},
      deep: 2
    });
    for (let item of steam_tools) {
      steam_apps.proton_builds.push({
        name: path.basename(path.dirname(item)),
        path: item
      });
    };
  };
  if (fs.existsSync(os.homedir+'/.steam/root/compatibilitytools.d')) {
    steam_tools = await globby(os.homedir+'/.steam/root/compatibilitytools.d', {
      expandDirectories: {files: ['proton']},
      deep: 2
    });
    for (let item of steam_tools) {
      steam_apps.proton_builds.push({
        name: path.basename(path.dirname(item)),
        path: item
      });
    };
  };
}

function hlu_list_init() {
  let prefixes;
  let runners;
  if (fs.existsSync(hlu_userpath+'/prefixes.json')) {
    prefixes = fs.readJsonSync(hlu_userpath+'/prefixes.json');
    for (let i in prefixes) {
      for (let item of prefixes[i]) {
        hlu_list[i].prefixes.push({
          name: item.name,
          path: item.path
        });
      };
    };
  };
  for (let item of steam_apps.wine) {
    hlu_list.proton.prefixes.push({
      name: item.name,
      path: item.prefix
    });
  };
  if (fs.existsSync(hlu_userpath+'/runners.json')) {
    runners = fs.readJsonSync(hlu_userpath+'/runners.json');
    for (let i in runners) {
      for (let item of runners[i]) {
        hlu_list[i].runners.push({
          name: item.name,
          path: item.path
        });
      };
    };
  };
  for (let item of steam_apps.proton_builds) {
    hlu_list.proton.runners.push({
      name: item.name,
      path: item.path
    });
  };
}

async function launcher_init(type) {
  let launcher = {
    info: {
      type: type,
    }
  };
  let settings;
  let launchers;
  let launcher_settings = [];
  switch (type) {
    case 'wine': case 'proton':
      launcher.info.prefix = await general_selector('prefixes', type);
      launcher.info.runner = await general_selector('runners', type);
      launcher.info.exec = await exec_init(
        await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('app')+
          ' folder or '+chalk.cyan('full path')+' to the '+chalk.green('executable')+' file', 'exec_paths'),
        ['exe']
      );
      launcher.name = await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('launcher'), 'launcher_names',
        path.basename(launcher.info.exec, '.exe'));
      break;
    case 'linux':
      launcher.info.exec = await exec_init(await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('app')+
          ' folder or '+chalk.cyan('full path')+' to the '+chalk.green('executable')+' file', 'exec_paths'));
      launcher.name = await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('launcher'), 'launcher_names',
        path.basename(launcher.info.exec));
      break;
  };
  settings = await settings_init(launcher, fs.readJsonSync(hlu_userpath+'/settings.json'));
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value != '') {
        launcher_settings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value
        });
      };
    };
  };
  if (fs.existsSync(hlu_userpath+'/launchers.json')) {
    launchers = fs.readJsonSync(hlu_userpath+'/launchers.json');
    for (let i in launchers) {
      if (launchers[i].name == launcher.name) {
        launchers.splice(i,1);
      };
    };
    launchers.push({
      name: launcher.name,
      info: launcher.info,
      settings: launcher_settings
    });
    fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
  } else {
    launchers = [
      {
        name: launcher.name,
        info: launcher.info,
        settings: launcher_settings
      }
    ];
    fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
  };
}

async function settings_init(launcher, settings) {
  let setting_menu;
  let setting_item;
  let setting_input;
  let selected_setting;
  let limit_flag;
  while (setting_menu != '0') {
    setting_menu = await list_options({
      name: 'Settings',
      items: list_init(settings, 'name')
    });
    do {
      setting_item = await list_options({
        name: settings[+setting_menu-1].name,
        items: list_init(settings[+setting_menu-1].settings, 'name'),
        values: list_init(settings[+setting_menu-1].settings, 'value'),
        options: ['continue']
      });
      if (setting_item != '0') {
        limit_flag = 0;
        selected_setting = settings[+setting_menu-1].settings[+setting_item-1];
        if (selected_setting.limitation?.file) {
          for (let item of selected_setting.limitation.file) {
            if (fs.existsSync(item)) {
              limit_flag = 1;
            };
          };
          if (limit_flag == 0) {
            console.log('\n'+chalk.green(selected_setting.limitation.file)+chalk.red(' not installed!'));
          };
        } else if (selected_setting.limitation?.launcher) {
          if (selected_setting.limitation.launcher.includes(launcher.info.type)) {
            limit_flag = 1;
          } else {
            console.log('\n'+'Only for '+chalk.green(selected_setting.limitation.launcher.join(',')));
          };
        } else if (selected_setting.limitation?.video) {
          if (gpu_version.stdout.includes(selected_setting.limitation.video)) {
            limit_flag = 1;
          } else {
            console.log('\n'+'Only for '+chalk.green(selected_setting.limitation.video));
          };
        } else {
          limit_flag = 1;
        };
        if (limit_flag == 1) {
          if (selected_setting.example_value.includes('input_value')) {
            let input_text;
            let additional_text;
            switch (selected_setting.name) {
              case 'Add arguments':
                input_text = 'Enter '+chalk.cyan('arguments')+' (Example: '+chalk.cyan('-windowed')+')';
                break;
              case 'Add variables or commands':
                input_text = 'Enter '+chalk.cyan('variables')+' or '+chalk.cyan('commands')+' (Example: '+chalk.cyan('gamemoderun')+' or '+chalk.cyan('WINEESYNC=1')+')';
                break;
              case 'Enable pulse audio latency':
                input_text = 'Enter '+chalk.cyan('pulse audio')+chalk.cyan('latency')+' (Example: '+chalk.cyan('90')+')';
                break;
              case 'Enable pulse audio latency':
                input_text = 'Enter '+chalk.cyan('pulse audio')+chalk.cyan('latency')+' (Example: '+chalk.cyan('90')+')';
                break;
              case 'Enable virtual desktop':
                input_text = 'Enter '+chalk.cyan('width')+' and '+chalk.cyan('height')+' of '+chalk.green('virtual desktop')+' (Example: '+chalk.cyan('1600x900')+')';
                break;
              case 'Set Wine FSR strength':
                input_text = 'Enter '+chalk.green('FSR strength')+chalk.cyan(' value ')+'('+chalk.cyan('0')+' <= '+chalk.cyan('value')+' <= '+chalk.cyan('5')+')';
                break;
              case 'Set max framerate':
                input_text = 'Enter '+chalk.cyan('maximum framerate');
                break;
              case 'Set max framerate for battery power':
                input_text = 'Enter '+chalk.cyan('maximum framerate')+' when running on '+chalk.green('battery power');
                break;
              case 'Enable Vsync':
                additional_text = '\n\t'+chalk.green('OpenGL')+'\n'+
                chalk.cyan(' -1')+' - Adaptive sync (unconfirmed if this actually works)\n'+
                chalk.cyan(' 0')+' - Force off\n'+
                chalk.cyan(' 1')+' - Force on\n'+
                chalk.cyan(' n')+' - Sync to refresh rate / n\n'+
                '\t'+chalk.green('Vulkan')+'\n'+
                chalk.cyan(' 0')+' - Force off\n'+
                chalk.cyan(' 1')+' - Mailbox mode. Vsync with uncapped framerate\n'+
                chalk.cyan(' 2')+' - Traditional vsync with framerate capped to refresh rate\n'+
                chalk.cyan(' 3')+' - Adaptive vsync with tearing at low framerates\n';
                input_text = 'Enter '+chalk.green('Vsync ')+chalk.cyan('value');
                break;
              case 'Set mip-map LoD bias':
                input_text = 'Enter '+chalk.green('mip-map LoD bias')+chalk.cyan(' value ')+'('+chalk.cyan('-16')+' <= '+chalk.cyan('value')+' <= '+chalk.cyan('16')+')';
                break;
              case 'Set anisotropic filtering level (Vulkan only)':
                input_text = 'Enter '+chalk.green('anisotropic filtering')+chalk.cyan(' value ')+'('+chalk.cyan('1')+' <= '+chalk.cyan('value')+' <= '+chalk.cyan('16')+')';
                break;
              case 'Enable DxvkHUD':
                additional_text = '\n'+chalk.cyan(' devinfo')+' - Displays the name of the GPU and the driver version\n'+
                chalk.cyan(' fps')+' - Shows the current frame rate\n'+
                chalk.cyan(' frametimes')+' - Shows a frame time graph\n'+
                chalk.cyan(' submissions')+' - Shows the number of command buffers submitted per frame\n'+
                chalk.cyan(' drawcalls')+' - Shows the number of draw calls and render passes per frame\n'+
                chalk.cyan(' pipelines')+' - Shows the total number of graphics and compute pipelines\n'+
                chalk.cyan(' memory')+' - Shows the amount of device memory allocated and used\n'+
                chalk.cyan(' gpuload')+' - Shows estimated GPU load. May be inaccurate\n'+
                chalk.cyan(' version')+' - Shows DXVK version\n'+
                chalk.cyan(' api')+' - Shows the D3D feature level used by the application\n'+
                chalk.cyan(' compiler')+' - Shows shader compiler activity\n'+
                chalk.cyan(' samplers')+' - Shows the current number of sampler pairs used [D3D9 Only]\n'+
                chalk.cyan(' scale=value')+' - Scales the HUD by a factor of x (e.g. 1.5)\n'+
                chalk.cyan(' full')+' - Enable all options\n';
                input_text = 'Enter '+chalk.green('DxvkHUD ')+chalk.cyan('options')+' (Example: '+chalk.cyan('fps,frametimes,scale=0.8')+')';
                break;
            }
            setting_input = await general_input(input_text, selected_setting.name.replace(/ /g,'_'), selected_setting.default_value, additional_text);
            if (setting_input != '') {
              settings[+setting_menu-1].settings[+setting_item-1].value = selected_setting.example_value
                .replace('input_value', setting_input)
                .replace('launcher_name', launcher.name.replace(/ /g,'_'));
            } else {
              settings[+setting_menu-1].settings[+setting_item-1].value = '';
            };
          } else {
            if (settings[+setting_menu-1].settings[+setting_item-1].value == '') {
              settings[+setting_menu-1].settings[+setting_item-1].value = selected_setting.example_value;
            } else {
              settings[+setting_menu-1].settings[+setting_item-1].value = '';
            };
          };
        };
      };
    } while (setting_item != '0');
  };
  return settings;
}

async function launcher_editor() {
  let launcher_settings = [];
  let items = [];
  let launchers = fs.readJsonSync(hlu_userpath+'/launchers.json');
  let settings = fs.readJsonSync(hlu_userpath+'/settings.json');
  let launcher = await general_selector('launchers', launchers);
  switch (launcher[1].info.type) {
    case 'wine': case 'proton':
      items = ['Change settings','Change name','Change executable','Change prefix and runner'];
      break;
    case 'linux':
      items = ['Change settings','Change name','Change executable'];
      break;
    case 'legendary':
      items = ['Change settings','Change name'];
      break;
  };
  switch (await list_options({
    name: 'Launcher Editor',
    items: items
  })) {
    case '1':
      launcher = launcher[1];
      for (let i in settings) {
        for (let j in settings[i].settings) {
          for (let k in launcher.settings) {
            if (launcher.settings[k].name == (settings[i].settings[j].name)) {
              settings[i].settings[j].value = launcher.settings[k].value;
            };
          };
        };
      };
      settings = await settings_init(launcher, settings)
      for (let i in settings) {
        for (let j in settings[i].settings) {
          if (settings[i].settings[j].value != '') {
            launcher_settings.push({
              name: settings[i].settings[j].name,
              value: settings[i].settings[j].value
            });
          };
        };
      };
      for (let i in launchers) {
        if (launchers[i].name == launcher.name) {
          launchers.splice(i,1);
        };
      };
      launchers.push({
        name: launcher.name,
        info: launcher.info,
        settings: launcher_settings
      });
      fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
      break;
    case '2':
      launcher[1].name = await general_input('Enter '+chalk.green('launcher')+' '+chalk.cyan('name'), 'launcher_names');
      launchers.splice(launcher[0], 1);
      launchers.push(launcher[1]);
      fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
      break;
    case '3':
      switch (launcher[1].info.type) {
        case 'wine': case 'proton':
          launcher[1].info.exec = await exec_init(await general_input('Enter '+chalk.green('path to the')+' '+chalk.cyan('executable'), 'exec_paths'), ['exe']);
          break;
        case 'linux':
          launcher[1].info.exec = await exec_init(await general_input('Enter '+chalk.green('path to the')+' '+chalk.cyan('executable'), 'exec_paths'));
          break;
      };
      launchers.splice(launcher[0], 1);
      launchers.push(launcher[1]);
      fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
      break;
    case '4':
      launcher[1].info.prefix = await general_selector('prefixes', launcher[1].info.type);
      launcher[1].info.runner = await general_selector('runners', launcher[1].info.type);
      launchers.splice(launcher[0], 1);
      launchers.push(launcher[1]);
      fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
      break;
  };
}

async function launcher_runner() {
  let launchers = fs.readJsonSync(hlu_userpath+'/launchers.json');
  let launcher = await general_selector('launchers', launchers)
  await nothrow($`eval ${await launcher_command(launcher[1], launcher[1].settings)}`);
}

function launcher_generator() {
  let launchers = fs.readJsonSync(hlu_userpath+'/launchers.json');
  fs.emptyDirSync(hlu_bspath);
  for (let item of launchers) {
    fs.writeFileSync(
      hlu_bspath+'/'+item.name.replace(/ /g,'_')+'.sh',
      '#!/bin/bash\n'+launcher_command(item, item.settings)
    );
    fs.chmod(hlu_bspath+'/'+item.name.replace(/ /g,'_')+'.sh', 0o755);
  };
  console.log(chalk.green('Scripts')+' been generated in the '+chalk.green(hlu_bspath)+' folder');
}

async function launcher_remover() {
  let launchers = fs.readJsonSync(hlu_userpath+'/launchers.json');
  let launcher = await general_selector('launchers', launchers);
  launchers.splice(launcher[0],1);
  fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
}

async function launcher_info() {
  let launchers = fs.readJsonSync(hlu_userpath+'/launchers.json');
  let launcher = await general_selector('launchers', launchers);
  console.log(launcher[1]);
}

function launcher_command(launcher,settings) {
  let launcher_complete;
  let launcher_debug = ' &> /dev/null'
  let launcher_command = {
    pre: [],
    mid: [],
    post: []
  };
  let space = {
    pre: '',
    mid: '',
    post: ''
  };
  if (settings) {
    for (let i in settings) {
      if (settings[i].value != '') {
        switch (settings[i].name) {
          case 'Enable virtual desktop': launcher_command.mid.push(settings[i].value); break;
          case 'Add arguments': launcher_command.post.push(settings[i].value); break;
          case 'Enable debug': launcher_debug = ' &> "'+hlu_logspath+'/'+launcher.name.replace(/ /g,'_')+'.log"'; break;
          default: launcher_command.pre.push(settings[i].value)
        };
      };
    };
  };
  if (launcher_command.pre.length > 0) {space.pre = ' '};
  if (launcher_command.mid.length > 0) {space.mid = ' '};
  if (launcher_command.post.length > 0) {space.post = ' '};
  switch (launcher.info.type) {
    case 'wine':
      launcher_complete = 'cd "'+path.dirname(launcher.info.exec)+'"\n'+launcher_command.pre.join(' ')+space.pre+
        'WINEPREFIX="'+launcher.info.prefix+'" "'+launcher.info.runner+'" '+launcher_command.mid.join(' ')+space.mid+'"'+
        launcher.info.exec+'"'+space.post+launcher_command.post.join(' ')+launcher_debug;
      break;
    case 'proton':
      launcher_complete = 'cd "'+path.dirname(launcher.info.exec)+'"\n'+launcher_command.pre.join(' ')+space.pre+
        'STEAM_COMPAT_CLIENT_INSTALL_PATH="'+os.homedir+'.steam/steam" STEAM_COMPAT_DATA_PATH="'+
        launcher.info.prefix+'" "'+launcher.info.runner+'" run "'+
        launcher.info.exec+'"'+space.post+launcher_command.post.join(' ')+launcher_debug;
      break;
    case 'linux':
      launcher_complete = launcher_command.pre.join(' ')+space.pre+'"'+launcher.info.exec+'"'+space.post+launcher_command.post.join(' ')+launcher_debug;
  };
  return launcher_complete;
}

async function prefix_commands(type) {
  let prefix;
  let runner;
  let command;
  prefix =  await general_selector('prefixes', type);
  runner =  await general_selector('runners', type);
  command = await general_selector('prefix commands');
  if (command == 'input value') {
    command = await general_input('Enter '+chalk.green('custom')+' '+chalk.cyan('command')+' (Example: '+chalk.cyan('notepad')+')', 'pfxcoms');
  };
  switch (type) {
    case 'wine':
      await $`WINEPREFIX=${prefix} ${runner} ${command}`;
      break;
    case 'proton':
      await $`STEAM_COMPAT_CLIENT_INSTALL_PATH=${os.homedir}/.steam/steam STEAM_COMPAT_DATA_PATH=${prefix} ${runner} run ${command}`;
  };
}

async function prefix_winetricks(type) {
  let prefix;
  let runner;
  let command;
  prefix = await general_selector('prefixes', type);
  runner = await general_selector('runners', type);
  command = await general_input('Enter '+chalk.green('winetricks')+' '+chalk.cyan('arguments')+' (Example: '+chalk.cyan('vcrun2019')+
    ') (For '+chalk.green('gui')+' just '+chalk.cyan('press "Enter"')+')', 'winetricks_args');
  switch (type) {
    case 'wine':
      await $`WINEPREFIX=${prefix} WINE=${runner} winetricks ${command}`;
      break;
  };
}

async function prefix_manager(type) {
  let prefix;
  let runner;
  let items = [];
  let prefixes = fs.readJsonSync(hlu_userpath+'/prefixes.json');
  switch (type) {
    case 'wine':
      items = ['Add prefix','Delete prefix','Create prefix','Install DXVK','Install VKD3D','Install MF','Install MF-Cab'];
      break;
    case 'proton':
      items = ['Add prefix','Delete prefix'];
      break;
  };
  switch (await list_options({
    name: 'Prefixes Manager',
    items: items
  })) {
    case '1':
      prefix = await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('prefix'), 'pfx_paths');
      prefixes[type].push({
        name: await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('prefix'), 'pfx_names', path.basename(prefix)),
        path: prefix
      });
      fs.outputJsonSync(hlu_userpath+'/prefixes.json', prefixes, {spaces: 2});
      break;
    case '2':
      prefix = await general_selector('prefixes', type);
      for (let i in prefixes[type]) {
        if (prefix == prefixes[type][i].path && (prefix != '/home/hist/.wine' && prefix != hlu_defproton)) {
          prefixes[type].splice(i,1);
        };
      };
      fs.outputJsonSync(hlu_userpath+'/prefixes.json', prefixes, {spaces: 2});
      switch(await general_input('Delete '+chalk.green('folder')+'? '+chalk.cyan('y|N'))) {
        case 'y': case 'Y':
          fs.removeSync(prefix);
          break;
      };
      break;
    case '3':
      prefix = await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('prefix'), 'pfx_paths');
      prefixes[type].push({
        name: await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('prefix'), 'pfx_names', path.basename(prefix)),
        path: prefix
      });
      fs.outputJsonSync(hlu_userpath+'/prefixes.json', prefixes, {spaces: 2});
      runner = await general_selector('runners', type);
      switch (await list_options({
        name: 'Prefix Arch',
        items: ['32bit','64bit']
      })) {
        case '1':
          await $`WINEARCH=win32 WINEPREFIX=${prefix} ${runner} wineboot -u`
          break;
        case '2':
          await $`WINEPREFIX=${prefix} ${runner} wineboot -u`
          break;
      };
      break;
    case '4':
      prefix = await general_selector('prefixes', type);
      runner = await general_selector('runners', type);
      switch (await list_options({
        name: 'DXVK Installer',
        items: ['Git master','Release']
      })) {
        case '1':
          switch (await list_options({
            name: 'DXVK Git Package',
            items: ['Install','Uninstall']
          })) {
            case '1':
              await package_installer('git','DXVK');
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/dxvk/dlls/dxvk-master/setup_dxvk.sh install`;
              break;
            case '2':
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/dxvk/dlls/dxvk-master/setup_dxvk.sh uninstall`;
              break;
          };
          break;
        case '2':
          switch (await list_options({
            name: 'DXVK Release Package',
            items: ['Install','Uninstall']
          })) {
            case '1':
              await package_installer('release','DXVK');
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_relpath}/dxvk/setup_dxvk.sh install`;
              break;
            case '2':
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_relpath}/dxvk/setup_dxvk.sh uninstall`;
              break;
          }
          break;
      }
      break;
    case '5':
      prefix = await general_selector('prefixes', type);
      runner = await general_selector('runners', type);
      switch (await list_options({
        name: 'VKD3D Installer',
        items: ['Git master','Release']
      })) {
        case '1':
          switch (await list_options({
            name: 'VKD3D Git Package',
            items: ['Install','Uninstall']
          })) {
            case '1':
              await package_installer('git','VKD3D');
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/vkd3d-proton/dlls/vkd3d-proton-master/setup_vkd3d_proton.sh install`;
              break;
            case '2':
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/vkd3d-proton/dlls/vkd3d-proton-master/setup_vkd3d_proton.sh uninstall`;
              break;
          };
          break;
        case '2':
          switch (await list_options({
            name: 'VKD3D Release Package',
            items: ['Install','Uninstall']
          })) {
            case '1':
              await package_installer('release','VKD3D');
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_relpath}/vkd3d-proton/setup_vkd3d_proton.sh install`;
              break;
            case '2':
              await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_relpath}/vkd3d-proton/setup_vkd3d_proton.sh uninstall`;
              break;
          }
          break;
      }
      break;
    case '6':
      prefix = await general_selector('prefixes', type);
      runner = await general_selector('runners', type);
      await package_installer('git', 'MF')
      await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/mf-install/mf-install.sh uninstall`;
      break;
    case '7':
      prefix = await general_selector('prefixes', type);
      runner = await general_selector('runners', type);
      await package_installer('git', 'MF-Cab')
      await $`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/mf-installcab/install-mf-64.sh uninstall`;
      break;
  };
}

async function runner_manager() {
  let runner;
  let runners = fs.readJsonSync(hlu_userpath+'/runners.json');
  switch (await list_options({
    name: 'Runners Manager',
    items: ['Add wine runner','Delete wine runner','Install GE-Proton','Install GE-Wine']
  })) {
    case '1':
      runner = await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('runner'), 'pfx_paths');
      runner = await exec_init(runner, ['wine']);
      runners.wine.push({
        name: await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('runner'), 'pfx_names'),
        path: runner
      });
      fs.outputJsonSync(hlu_userpath+'/runners.json', runners, {spaces: 2});
      break;
    case '2':
      runner = await general_selector('runners', 'wine');
      for (let i in runners.wine) {
        if (runner == runners.wine[i].path && runner != '/usr/bin/wine') {
          runners.wine.splice(i,1);
        };
      };
      fs.outputJsonSync(hlu_userpath+'/runners.json', runners, {spaces: 2});
      switch(await general_input('Delete '+chalk.green('folder')+'? '+chalk.cyan('y|N'))) {
        case 'y': case 'Y':
          fs.removeSync(runner);
          break;
      };
      break;
    case '3':
      await package_installer('release','GE-Proton');
      break;
    case '4':
      await package_installer('release','GE-Wine');
      for (let i in runners.wine) {
        if (runners.wine[i].name == 'GE-Wine') {
          runners.wine.splice(i, 1);
        };
      };
      runners.wine.push({
        name: 'GE-Wine',
        path: hlu_packspath+'/GE-Wine'
      });
      fs.outputJsonSync(hlu_userpath+'/runners.json', runners, {spaces: 2});
      break;
  };
}

async function package_installer(type, pack) {
  let packages = fs.readJsonSync(hlu_userpath+'/packages.json');
  let release;
  let status;
  let git_build = async () => {
    if (packages.git[pack].delete_folders) {
      for (let item of packages.git[pack].delete_folders) {
        fs.removeSync(item);
      };
    };
    if (packages.git[pack].build_command) {
      await $`eval ${packages.git[pack].build_command}`;
    };
  }
  let release_install = async () => {
    release = await general_selector('git releases', await git_releases(packages.release[pack].author, packages.release[pack].git_name, packages.release[pack].extension));
    cd(hlu_relpath);
    await $`wget ${release}`;
    if (packages.release[pack].flags?.includes('archive')) {
      fs.emptyDirSync(path.basename(release, '.'+packages.release[pack].extension));
      await $`tar -xf ${path.basename(release)} -C ${path.basename(release, '.'+packages.release[pack].extension)} --strip-components 1`;
      fs.removeSync(path.basename(release));
      if (packages.release[pack].flags?.includes('install')) {
        packages.release[pack].folder = packages.release[pack].folder
        .replace('hlu_packspath',hlu_packspath)
        .replace('home_dir', os.homedir+'');
        fs.removeSync(packages.release[pack].folder);
        fs.moveSync(path.basename(release, '.'+packages.release[pack].extension), packages.release[pack].folder);
      } else {
        fs.removeSync(packages.release[pack].git_name);
        fs.moveSync(path.basename(release, '.'+packages.release[pack].extension), packages.release[pack].git_name);
      };
    };
  };
  switch (type) {
    case 'git':
      if (fs.existsSync(hlu_packspath+'/'+path.basename(packages.git[pack].url, '.git'))) {
        cd(hlu_packspath);
        cd(path.basename(packages.git[pack].url, '.git'));
        if (packages.git[pack].url_args) {
          status = await $`git reset --hard; git pull ${packages.git[pack].url_args} ${packages.git[pack].url}`;
        } else {
          status = await $`git reset --hard; git pull ${packages.git[pack].url}`;
        };
        if (status.stdout.includes('Already up to date') && packages.git[pack].install_command) {
          switch(await general_input('Rebuild '+chalk.green('package')+' ? '+chalk.cyan('y|N'))) {
            case 'y': case 'Y':
              await git_build();
          }
        } else {
          await git_build();
        };
      } else {
        cd(hlu_packspath);
        if (packages.git[pack].url_args) {
          await $`git clone ${packages.git[pack].url_args} ${packages.git[pack].url}`;
        } else {
          await $`git clone ${packages.git[pack].url}`;
        };
        cd(path.basename(packages.git[pack].url, '.git'));
        await git_build();
      };
      break;
    case 'release':
      if (fs.existsSync(hlu_relpath+'/'+packages.release[pack].git_name)) {
        switch (await general_input('Download another '+chalk.green('release package')+' ? '+chalk.cyan('y|N'))) {
          case 'y': case 'Y':
            await release_install();
        }
      } else {
        await release_install();
      };
      break;
  };
}
