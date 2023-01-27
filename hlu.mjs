#!/usr/bin/env zx
"use strict"
$.verbose=false;
import {spawnSync} from 'child_process';
process.on('beforeExit', async () => {
  if (hlu_flags.restart == 0) {
    await script_exit()
  };
});
process.on('uncaughtException', async (err,origin) => {
  console.log('\n\t'+chalk.red('Error')+'\n'+err+'\n\t'+chalk.red('Origin')+'\n'+origin+'\n');
  if (hlu_flags.restart == 0) {
    await script_exit()
  };
});

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
const gpu_version = await $`lspci | grep VGA`;
const hlu_flags = {
  restart: 0
}
const retroarch_cores = []

// Check files
fs.ensureDirSync(hlu_packspath);
fs.ensureDirSync(hlu_relpath);
fs.ensureDirSync(hlu_historypath);
fs.ensureDirSync(hlu_logspath);
fs.ensureDirSync(hlu_defproton);
if (!fs.existsSync(hlu_userpath+'/settings.json') || !fs.existsSync(hlu_userpath+'/packages.json')) {
  cd(hlu_userpath);
  await $`git clone https://github.com/sergeyhist/hlu-js.git`;
  fs.copySync('hlu-js/settings.json', hlu_userpath+'/settings.json');
  fs.copySync('hlu-js/packages.json', hlu_userpath+'/packages.json');
  fs.removeSync('hlu-js');
};
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

//Arguments
if (process.argv[3] == 'run') {await launcher_runner()}
else if (process.argv[3] == 'services') {await systemd_controller()}
else {
  // Init const variables
  if (fs.existsSync(os.homedir+'/.steam') || fs.existsSync(os.homedir+'/.var/app/com.valvesoftware.Steam')) {
    await steam_apps_init();
  };
  hlu_list_init();
  await retroarch_cores_init();

  // Main
  switch (await list_options({
    name: 'Hist Linux Utilities',
    items: ['Launcher Controller','Wine/Proton Helper','Legendary Helper','Systemd Controller','Launch options for steam game','Install Luxtorpeda','Update settings and packages']
  })) {
    case '1':
      switch (await list_options({
        name: 'Launcher Controller',
        items: ['Create launcher','Edit launcher','Run launcher','Delete launcher','Generate bash scripts','Display information']
      })) {
        case '1':
          switch (await list_options({
            name: "Launcher Creator",
            items: ["Wine","Proton","Linux","Legendary","Retroarch"]
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
            case '4':
              await launcher_init('legendary');
              break;
            case '5':
              await launcher_init('retroarch');
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
          await launcher_generator();
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
      break;
    case '3':
      await legendary_helper();
      break;
    case '4':
      await systemd_controller();
      break;
    case '5':
      await steam_options();
      break;
    case '6':
      await package_installer('release', 'Luxtorpeda');
      break;
    case '7':
      await hlu_updater();
      break;
  };
};

//Functions
function readLaunchers() {
  return fs.readJsonSync(hlu_userpath+'/launchers.json').slice(0).sort((a,b) => {
    return a.name.localeCompare(b.name);
  }).sort((a,b) => {
    return a.info.category.localeCompare(b.info.category);
  });
}

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
      await $`touch ${hlu_historypath}/${hfile}`;
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
    case 'retroarch cores':
      return retroarch_cores[+await list_options({
        name: 'Retroarch Cores',
        items: list_init(retroarch_cores, 'name'),
        descs: list_init(retroarch_cores, 'path')
      })-1].path;
  }
}

async function script_exit() {
  switch (await general_input('Restart '+chalk.green('HLU')+' ? '+chalk.cyan('y|N'))) {
    case 'y': case 'Y':
      hlu_flags.restart = 1;
      spawnSync(process.argv.shift(),process.argv,{
        "cwd":process.cwd(),
        "detached":false,
        "stdio":"inherit"
      });
    case 'n': case 'N': case '': case ' ':
      process.exit(1);
    default:
      await script_exit();
  };
}

async function verbose_bash(command) {
  $.verbose = true;
  await $`eval ${command}`;
  $.verbose = false;
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
    items.push(item[array] ? item[array] : '')
  };
  return items;
}

async function exec_init(exec_path,ext,title) {
  let executables = {
    "all":[],
    "exec_names": [],
    "exec_paths": []
  };
  if (!title) {title = 'Executables'};
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
      name: title,
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
  const steamPaths = [os.homedir+'/.steam/', os.homedir+'/.var/app/com.valvesoftware.Steam/.steam/'];

  for (let path of steamPaths) {
    if (fs.existsSync(path)) {
      let steam_temp = await $`echo $(grep path ${path}root/steamapps/libraryfolders.vdf | cut -d'"' -f4) | tr -d '\n'`;
      for (let item of steam_temp.stdout.split(' ')) {
        steam_libraries.push(item)
      };
      for (let item of steam_libraries) {
        if (fs.existsSync(item)) {
          for (let item2 of await globby(item, {
            expandDirectories: {files: ['appmanifest_*']},
            deep: 2
          })) {
            !steam_appmanifests.includes(item2) && steam_appmanifests.push(item2);
          };
        };
      };
    };
  };
  for (let item of steam_appmanifests) {
    let steam_appid = await $`echo $(grep '"appid"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    let steam_name = await $`echo $(grep '"name"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    steam_name = steam_name.stdout.replace(' \\','');
    let steam_path = await $`echo $(grep '"installdir"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    let steam_dirname = await $`dirname ${item} | tr -d '\n'`;
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
  if (fs.existsSync(os.homedir+'/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d')) {
    steam_tools = await globby(os.homedir+'/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d', {
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

async function retroarch_cores_init() {
  let cores;
  let coreName;
  let name_finder = (info_path) => {
    if (fs.existsSync(info_path)) {
      for (let line of fs.readFileSync(info_path, {encoding: 'utf-8'}).split('\\n')) {
        if (line.includes('display_name')) {
          return line.split('"')[1];
        };
      };
    } else {
      return path.basename(info_path, '.info');
    };
  };
  let cores_init = async (cores_path, info_path) => {
    if (fs.existsSync(cores_path)) {
      cd(cores_path)
      cores = await globby('', {
        expandDirectories: {extensions: ['so']},
        absolute: true
      });
      cores.forEach(item => {
        if (info_path) {
          coreName = name_finder(item.replace(cores_path, info_path).replace('.so','.info'));
        } else {
          coreName = name_finder(item.replace('.so','.info'));
        };
        retroarch_cores.push({
          name: coreName,
          path: item
        });
      });
    };
  }
  await cores_init(os.homedir+'/.config/retroarch/cores');
  await cores_init(os.homedir+'/.var/app/org.libretro.RetroArch/config/retroarch/cores', '/var/lib/flatpak/app/org.libretro.RetroArch/current/19bc2de02efb8da5e2bea76f858cce45b1b20b11a2e134c462f22db0eba59d4f/files/share/libretro/info');
  await cores_init('/usr/lib/libretro', '/usr/share/libretro/info');
}

async function launcher_init(type) {
  let launcher = {
    info: {
      type: type
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
    case 'legendary':
      let typeInit = async (type) => {
        launcher.info.prefix = await general_selector('prefixes', type);
        launcher.info.runner = await general_selector('runners', type);
      };
      switch(await list_options({
        name: 'Runner Type',
        items: ['Wine', 'Proton']
      })) {
        case '1':
          await typeInit('wine');
          launcher.info.runnerType = 'wine';
          launcher.info.userPath = '/drive_c/users';
          break;
        case '2':
          await typeInit('proton');
          launcher.info.runnerType = 'proton';
          launcher.info.userPath = '/pfx/drive_c/users';
      };
      let egs_app = await legendary_list('installed', {full: true});
      launcher.name = egs_app.name;
      launcher.info.id = egs_app.id;
      if (fs.existsSync(launcher.info.prefix+launcher.info.userPath+'/steamuser') && launcher.info.runnerType == 'wine') {
        let user_names = [os.userInfo().username, 'steamuser'];
        launcher.info.userPath = launcher.info.userPath+'/'+user_names[+await list_options({
          name: 'User name for cloud saves',
          items: user_names
        })-1];
      } else if (launcher.info.runnerType == 'proton') {
        launcher.info.userPath = launcher.info.userPath+'/steamuser'
      } else {
        launcher.info.userPath = launcher.info.userPath+'/'+os.userInfo().username;
      };
      let egs_user_info = fs.readJsonSync(os.homedir+'/.config/legendary/user.json');
      let egs_app_info = await $`legendary info ${launcher.info.id} --json`;
      let egs_eos_info = await $`legendary eos-overlay info`;
      if (! egs_eos_info.stderr.includes('No Legendary-managed installation found')) {
        switch(await general_input('Install '+chalk.green('EOS-Overlay')+'? '+chalk.cyan('y|N'))) {
          case 'y': case 'Y':
            launcher.info.runnerType == 'wine' ? await verbose_bash(`legendary eos-overlay enable --prefix "${launcher.info.prefix}"`) : await verbose_bash(`legendary eos-overlay enable --prefix "${launcher.info.prefix}/pfx"`);
            break;
        };
      };
      egs_app_info = JSON.parse(egs_app_info.stdout);
      if (egs_app_info.game.cloud_saves_supported == true) {
        launcher.info.save_path = egs_app_info.game.cloud_save_folder
        .replace('{AppData}', launcher.info.prefix+launcher.info.userPath+'/AppData/Local')
        .replace('{UserSavedGames}', launcher.info.prefix+launcher.info.userPath+'/Saved Games')
        .replace('{UserDir}', launcher.info.prefix+launcher.info.userPath+'/Documents')
        .replace('{InstallDir}', egs_app_info.install?.install_path)
        .replace('{EpicID}', egs_user_info.account_id);
      };
      break;
    case 'retroarch':
      launcher.info.core = await general_selector('retroarch cores');
      launcher.info.rom = await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('ROM')+' (Example: '+chalk.cyan('/folder/with/rom/ROM.extension')+')');
      launcher.name = await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('launcher'), 'launcher_names',
        path.basename(launcher.info.rom));
  };
  launcher.info.category = await general_input('Enter '+chalk.cyan('category')+' of the '+chalk.green('launcher')+' (Default: '+chalk.cyan('General')+')', 'launcher_categories');
  if (! launcher.info.category) {launcher.info.category = 'General'}; 
  settings = await settings_init(launcher, fs.readJsonSync(hlu_userpath+'/settings.json'));
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
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
      items: list_init(settings, 'name'),
      options: ['continue']
    });
    if (setting_menu != 0) {
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
            if (selected_setting.limitation.launcher.includes(launcher.info.type) || selected_setting.limitation.launcher.includes(launcher.info.runnerType)) {
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
              let colors = {
                cyan: '\x1B[36m',
                green: '\x1B[32m',
                zero: '\x1B[0m'
              }
              setting_input = await general_input(selected_setting.text?.replace(/cyan_/g, colors.cyan).replace(/green_/g, colors.green).replace(/_end/g, colors.zero), selected_setting.name.replace(/ /g,'_'), selected_setting.default_value, selected_setting.additionalText?.replace(/cyan_/g, colors.cyan).replace(/green_/g, colors.green).replace(/_end/g, colors.zero));
              if (setting_input != '') {
                settings[+setting_menu-1].settings[+setting_item-1].value = selected_setting.example_value
                  .replace('input_value', setting_input)
                  .replace('launcher_name', launcher.name.replace(/ /g,'_'));
              } else {
                settings[+setting_menu-1].settings[+setting_item-1].value = '';
              };
            } else {
              if (!settings[+setting_menu-1].settings[+setting_item-1].value) {
                settings[+setting_menu-1].settings[+setting_item-1].value = selected_setting.example_value;
              } else {
                settings[+setting_menu-1].settings[+setting_item-1].value = '';
              };
            };
          };
        };
      } while (setting_item != '0');
    };
  };
  return settings;
}

async function launcher_editor() {
  let launcher_settings = [];
  let items = [];
  let launchers = readLaunchers();
  let settings = fs.readJsonSync(hlu_userpath+'/settings.json');
  let launcher = await general_selector('launchers', launchers);
  switch (launcher[1].info.type) {
    case 'wine': case 'proton':
      items = ['Change settings','Change name','Change category','Change executable','Change prefix and runner'];
      break;
    case 'linux':
      items = ['Change settings','Change name','Change category','Change executable'];
      break;
    case 'legendary':
      items = ['Change settings','Change name','Change category'];
      break;
    case 'retroarch':
      items = ['Change settings','Change name','Change category'];
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
          if (settings[i].settings[j].value) {
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
      launcher[1].info.category = await general_input('Enter '+chalk.green('launcher')+' '+chalk.cyan('category'), 'launcher_categories');
      launchers.splice(launcher[0], 1);
      launchers.push(launcher[1]);
      fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
      break;
    case '4':
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
    case '5':
      launcher[1].info.prefix = await general_selector('prefixes', launcher[1].info.type);
      launcher[1].info.runner = await general_selector('runners', launcher[1].info.type);
      launchers.splice(launcher[0], 1);
      launchers.push(launcher[1]);
      fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
      break;
  };
}

async function launcher_runner() {
  let launchers = readLaunchers();
  let launcher = await general_selector('launchers', launchers)
  let commands = await launcher_command(launcher[1], launcher[1].settings);
  await verbose_bash(commands.join('; '));
}

async function launcher_generator() {
  let launchers = readLaunchers();
  fs.emptyDirSync(hlu_bspath);
  for (let item of launchers) {
    let commands = await launcher_command(item, item.settings);
    fs.ensureDirSync(hlu_bspath+'/'+item.info.category);
    fs.writeFileSync( hlu_bspath+'/'+item.info.category+'/'+item.name+'.sh', '#!/bin/bash\n'+commands.join('\n'));
    fs.chmod(hlu_bspath+'/'+item.info.category+'/'+item.name+'.sh', 0o755);
  };
  console.log(chalk.green('Scripts')+' been generated in the '+chalk.green(hlu_bspath)+' folder');
}

async function launcher_remover() {
  let launchers = readLaunchers();
  let launcher = await general_selector('launchers', launchers);
  launchers.splice(launcher[0],1);
  fs.outputJsonSync(hlu_userpath+'/launchers.json', launchers, {spaces: 2});
}

async function launcher_info() {
  let launchers = readLaunchers();
  let launcher = await general_selector('launchers', launchers);
  console.log(launcher[1]);
}

async function launcher_command(launcher,settings) {
  let launcher_complete = [];
  let launcher_debug = ' &> /dev/null'
  let steamPath = fs.existsSync(os.homedir+'/.steam/steam') ? os.homedir+'/.steam/steam' : fs.existsSync(os.homedir+'/.var/app/com.valvesoftware.Steam/.steam/steam') ? os.homedir+'/.var/app/com.valvesoftware.Steam/.steam/steam' : '';
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
    let gamescope; 
    let strangle;
    for (let i in settings) {
      if (settings[i].value != '') {
        switch (settings[i].name) {
          case 'Enable virtual desktop': launcher_command.mid.push(settings[i].value); break;
          case 'Add arguments': launcher_command.post.push(settings[i].value); break;
          case 'Enable debug': launcher_debug = ' &> "'+hlu_logspath+'/'+launcher.name.replace(/ /g,'_')+'.log"'; break;
          case 'Enable gamescope': gamescope = settings[i].value; break;
          case 'Enable libstrangle': strangle = settings[i].value; break;
          default: launcher_command.pre.push(settings[i].value)
        };
      };
    };
    strangle && launcher_command.pre.push(strangle);
    gamescope && launcher_command.pre.push(gamescope);
  };
  if (launcher_command.pre.length > 0) {space.pre = ' '};
  if (launcher_command.mid.length > 0) {space.mid = ' '};
  if (launcher_command.post.length > 0) {space.post = ' '};
  switch (launcher.info.type) {
    case 'wine':
      launcher_complete.push('cd "'+path.dirname(launcher.info.exec)+'"');
      launcher_complete.push(launcher_command.pre.join(' ')+space.pre+'WINEPREFIX="'+launcher.info.prefix+'" "'+launcher.info.runner+'" '+launcher_command.mid.join(' ')+space.mid+'"'+launcher.info.exec+'"'+space.post+launcher_command.post.join(' ')+launcher_debug);
      break;
    case 'proton':
      launcher_complete.push('cd "'+path.dirname(launcher.info.exec)+'"');
      launcher_complete.push(launcher_command.pre.join(' ')+space.pre+'STEAM_COMPAT_CLIENT_INSTALL_PATH="'+steamPath+'" STEAM_COMPAT_DATA_PATH="'+launcher.info.prefix+'" "'+launcher.info.runner+'" run "'+launcher.info.exec+'"'+space.post+launcher_command.post.join(' ')+launcher_debug);
      break;
    case 'linux':
      launcher_complete.push(launcher_command.pre.join(' ')+space.pre+'"'+launcher.info.exec+'"'+space.post+launcher_command.post.join(' ')+launcher_debug);
      break;
    case 'legendary':
      if (launcher.info.save_path) {
        launcher_complete.push('legendary sync-saves -y --skip-upload --save-path "'+launcher.info.save_path+'" '+launcher.info.id+launcher_debug);
      };
      if (launcher.info.runnerType == 'wine') {
        launcher_complete.push('legendary update -y --update-only '+launcher.info.id+launcher_debug.replace('>','>>'));
        launcher_complete.push(launcher_command.pre.join(' ')+space.pre+'legendary launch --wine "'+launcher.info.runner+'" --wine-prefix "'+launcher.info.prefix+'" '+launcher.info.id+space.post+launcher_command.post.join(' ')+launcher_debug.replace('>','>>'));
      } else {
        launcher_complete.push('legendary update -y --update-only '+launcher.info.id+launcher_debug.replace('>','>>'));
        launcher_complete.push('STEAM_COMPAT_CLIENT_INSTALL_PATH="'+steamPath+'" STEAM_COMPAT_DATA_PATH="'+launcher.info.prefix+'" '+launcher_command.pre.join(' ')+space.pre+'legendary launch --no-wine --wrapper "'+'\''+launcher.info.runner+'\' run" '+launcher.info.id+space.post+launcher_command.post.join(' ')+launcher_debug.replace('>','>>'));
      };
      break;
    case 'steam':
      launcher_complete.push(launcher_command.pre.join(' ')+space.pre+'%command%'+space.post+launcher_command.post.join(' '));
      break;
    case 'retroarch':
      let retroarchExec = launcher.info.core.includes('org.libretro.RetroArch') ? 'org.libretro.RetroArch' : 'retroarch';

      launcher_complete.push(launcher_command.pre.join(' ')+space.pre+retroarchExec+' --verbose -L "'+launcher.info.core+'"'+' "'+launcher.info.rom+'"'+space.post+launcher_command.post.join(' ')+launcher_debug);
      break;
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
      await verbose_bash(`WINEPREFIX="${prefix}" "${runner}" ${command}`);
      break;
    case 'proton':
      await verbose_bash(`STEAM_COMPAT_CLIENT_INSTALL_PATH="${os.homedir}/.steam/steam" STEAM_COMPAT_DATA_PATH="${prefix}" "${runner}" run ${command}`);
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
      await verbose_bash(`WINEPREFIX="${prefix}" WINE="${runner}" winetricks ${command}`);
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
      items = ['Add prefix','Delete prefix','Create prefix','DXVK Install/Uninstall','VKD3D Install/Uninstall','MF Install','MF-Cab Install'];
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
      fs.ensureDirSync(prefix);
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
          fs.emptyDirSync(prefix);
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
          await package_installer('git','DXVK');
          verbose_bash(`WINEPREFIX=${prefix}; cp ${hlu_relpath}/dxvk/x64/*.dll $WINEPREFIX/drive_c/windows/system32; cp ${hlu_relpath}/dxvk/x32/*.dll $WINEPREFIX/drive_c/windows/syswow64; ${runner}boot -u`);
          break;
        case '2':
          await package_installer('release','DXVK');
          verbose_bash(`WINEPREFIX=${prefix}; cp ${hlu_relpath}/dxvk/x64/*.dll $WINEPREFIX/drive_c/windows/system32; cp ${hlu_relpath}/dxvk/x32/*.dll $WINEPREFIX/drive_c/windows/syswow64; ${runner}boot -u`);
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
          await package_installer('git','VKD3D');
          verbose_bash(`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/vkd3d-proton/dlls/vkd3d-proton-master/setup_vkd3d_proton.sh install`);
          break;
        case '2':
          await package_installer('release','VKD3D');
          verbose_bash(`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_relpath}/vkd3d-proton/setup_vkd3d_proton.sh install`);
          break;
      }
      break;
    case '6':
      prefix = await general_selector('prefixes', type);
      runner = await general_selector('runners', type);
      await package_installer('git', 'MF')
      verbose_bash(`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/mf-install/mf-install.sh uninstall`);
      break;
    case '7':
      prefix = await general_selector('prefixes', type);
      runner = await general_selector('runners', type);
      await package_installer('git', 'MF-Cab')
      verbose_bash(`WINEPREFIX=${prefix} PATH=${path.dirname(runner)}:$PATH WINELOADER=${runner} ${hlu_packspath}/mf-installcab/install-mf-64.sh uninstall`);
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
        path: hlu_packspath+'/GE-Wine/bin/wine'
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
      await verbose_bash(`${packages.git[pack].build_command}`);
    };
  }
  let release_install = async () => {
    release = await general_selector('git releases', await git_releases(packages.release[pack].author, packages.release[pack].git_name, packages.release[pack].extension));
    cd(hlu_relpath);
    console.log('\n'+chalk.green('Downloading...'));
    await verbose_bash(`wget ${release}`);
    if (packages.release[pack].flags?.includes('archive')) {
      fs.emptyDirSync(path.basename(release, '.'+packages.release[pack].extension));
      console.log('\n'+chalk.green('Extracting...'));
      await $`tar -xf ${path.basename(release)} -C ${path.basename(release, '.'+packages.release[pack].extension)} --strip-components 1`;
      fs.removeSync(path.basename(release));
      console.log('\n'+chalk.green('Installing...')+'\n');
      if (packages.release[pack].flags?.includes('install')) {
        for (let folder of packages.release[pack].folders) {
          folder = folder.replace('hlu_packspath', hlu_packspath).replace('home_dir', os.homedir+'');
          if (fs.existsSync(folder)) {
            folder = folder + '/' + packages.release[pack].path.replace('name', pack); 
            fs.removeSync(folder);
            fs.moveSync(path.basename(release, '.'+packages.release[pack].extension), folder);
            if (fs.existsSync(folder+'/compatibilitytool.vdf')) {
              let newArray = [];
              for (let line of fs.readFileSync(folder+'/compatibilitytool.vdf', {encoding: 'utf-8', flag: 'r'}).split('\n')) {
                let selectedLine = line;
                if (line.includes('Internal name')) {selectedLine = '    "'+pack+'"'};
                if (line.includes('"display_name"')) {selectedLine = '      "display_name" "'+pack+'"'};
                newArray.push(selectedLine);
              };
              fs.writeFileSync(folder+'/compatibilitytool.vdf', newArray.join('\n'))
            };
          };
        };
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
        $.verbose = true;
        if (packages.git[pack].url_args) {
          status = await $`git reset --hard; git submodule--helper update ${packages.git[pack].url_args}; git pull ${packages.git[pack].url}`;
        } else {
          status = await $`git reset --hard; git pull ${packages.git[pack].url}`;
        };
        $.verbose = false;
        if (status.stdout.includes('Already up to date') && packages.git[pack].build_command) {
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

async function legendary_list(type, options) {
  let apps_list = [];
  let apps_list_json;
  switch(type) {
    case 'all':
      apps_list_json = await $`legendary list --json`;
      apps_list_json = JSON.parse(apps_list_json.stdout);
      for (let item of apps_list_json) {
        apps_list.push({
          name: item.app_title,
          id: item.app_name
       });
      };
      break;
    case 'installed':
      apps_list_json = await $`legendary list-installed --json`;
      apps_list_json = JSON.parse(apps_list_json.stdout);
      for (let item of apps_list_json) {
        apps_list.push({
          name: item.title,
          id: item.app_name
       });
      };
      break;
  };
  if (options?.full == true) {
    return apps_list[+await list_options({
      name: 'EGS Games',
      items: list_init(apps_list, 'name'),
      descs: list_init(apps_list, 'id')
    })-1];
  };
  return apps_list[+await list_options({
    name: 'EGS Games',
    items: list_init(apps_list, 'name'),
    descs: list_init(apps_list, 'id')
  })-1].id;
}

async function legendary_helper() {
  if (fs.existsSync('/usr/local/bin/legendary') || fs.existsSync('/usr/bin/legendary')) {
    switch(fs.existsSync(os.homedir+'/.config/legendary/user.json')) {
      case false:
        switch(await general_input(chalk.green('Sign in')+' ? '+chalk.cyan('y|N'))) {
          case 'y': case 'Y':
            await verbose_bash(`legendary auth`);
          default:
            break;
        };
      case true:
        if (fs.existsSync(os.homedir+'/.config/legendary/user.json')) {
          switch(await list_options({
            name: 'Legendary Helper',
            items: ['Sign out','Import game','Install game','Verify game','Repair game','Update game','Move game','Uninstall game','Check updates','Upload cloud saves','Fix cloud saves','Game info','Install EOS-Overlay','Update EOS-Overlay','Remove EOS-Overlay']
          })) {
            case '1':
              await verbose_bash(`legendary auth --delete`);
              break;
            case '2':
              await verbose_bash(`legendary import ${await legendary_list('all')} "${await general_input('Enter '+chalk.cyan('path')+' to the '+chalk.green('game'), 'legendary_paths')}"`);
              break;
            case '3':
              await verbose_bash(`legendary install --base-path "${await general_input('Enter '+chalk.cyan('path')+' where the '+chalk.green('game')+' will be installed', 'legendary_paths')}" ${await legendary_list('all')}`);
              break;
            case '4':
              await verbose_bash(`legendary verify ${await legendary_list('installed')}`);
              break;
            case '5':
              await verbose_bash(`legendary repair ${await legendary_list('installed')}`);
              break;
            case '6':
              await verbose_bash(`legendary update ${await legendary_list('installed')}`);
              break;
            case '7':
              await verbose_bash(`legendary move ${await legendary_list('installed')} "${await general_input('Enter '+chalk.cyan('path')+' where the '+chalk.green('game')+' will be moved', 'legendary_paths')}"`);
              break;
            case '8':
              await verbose_bash(`legendary uninstall ${await legendary_list('installed')}`);
              break;
            case '9':
              await verbose_bash(`legendary list-installed --check-updates`);
              break;
            case '10':
              await verbose_bash(`legendary sync-saves --skip-download --disable-filters`);
              break;
            case '11':
              await verbose_bash(`legendary clean-saves --delete-incomplete`);
              break;
            case '12':
              await verbose_bash(`legendary info ${await legendary_list('all')}`);
              break;
            case '13':
              await verbose_bash(`legendary eos-overlay install --path "${await general_input('Enter '+chalk.cyan('path')+' where the '+chalk.green('eos-overlay')+' will be installed', 'legendary_paths')}/.overlay"`);
              break;
            case '14':
              await verbose_bash(`legendary eos-overlay update`);
              break;
            case '15':
              await verbose_bash(`legendary eos-overlay remove`);
              break;
          };
        };
    }
  } else {
    console.log(chalk.green('Legendary')+' '+chalk.cyan('not installed!'));
  }
  
}

async function systemd_controller() {
  let add_service = async () => {
    let service = {
      name: '',
      path: '',
      type: ''
    };
    service.name = await general_input('Enter '+chalk.cyan('name')+' of the '+chalk.green('service')+' (Example: '+chalk.cyan('gdm.service')+')', 'service_names');
    let path = await $`systemctl show --user -p FragmentPath ${service.name} | tr -d '\\n'`;
    if (path.stdout == 'FragmentPath=') {
      path = await $`systemctl show -p FragmentPath ${service.name} | tr -d '\\n'`;
      service.type = 'root';
    } else {
      service.type = 'user';
    }
    service.path = path.stdout.split('=').pop();
    return service;
  };
  
  let services = [];
  let systemd_menu;
  switch(fs.existsSync(hlu_userpath+'/services.json')) {
    case false:
      services.push(await add_service());
      fs.outputJsonSync(hlu_userpath+'/services.json', services, {spaces: 2});
    case true:
      while (systemd_menu != 0) {
        let service;
        systemd_menu = await list_options({
          name: 'Systemd Controller',
          items: ['Services list','Add Service'],
          options: ['continue']
        });
        if (systemd_menu != 0) {
          switch(systemd_menu) {
            case '2':
              services = fs.readJsonSync(hlu_userpath+'/services.json')
              services.push(await add_service());
              fs.outputJsonSync(hlu_userpath+'/services.json', services, {spaces: 2});
            case '1':
              while (service+1 != 0) {
                let statuses = [];
                let status;
                services = fs.readJsonSync(hlu_userpath+'/services.json');
                for (let item of services) {
                  if (item.type == 'user') {
                    status = await $`systemctl show --user -p ActiveState ${item.name} | tr -d '\\n'`;
                  } else {
                    status = await $`systemctl show -p ActiveState ${item.name} | tr -d '\\n'`;
                  };
                  statuses.push(status.stdout.split('=').pop())
                }
                service = +await list_options({
                  name: 'Services List',
                  items: list_init(services, 'name'),
                  descs: list_init(services, 'path'),
                  values: statuses,
                  options: ['continue']
                })-1;
                if (service+1 != 0) {
                  switch(await list_options({
                    name: services[service].name,
                    items: ['Start','Stop','Restart','Enable','Disable','Status','Unlist'],
                    options: ['continue']
                  })) {
                    case '1':
                      if (services[service].type == 'user') {
                        await $`systemctl start --user ${services[service].name}`;
                      } else {
                        await $`systemctl start ${services[service].name}`;
                      };
                      break;
                    case '2':
                      if (services[service].type == 'user') {
                        await $`systemctl stop --user ${services[service].name}`;
                      } else {
                        await $`systemctl stop ${services[service].name}`;
                      };
                      break;
                    case '3':
                      if (services[service].type == 'user') {
                        await $`systemctl restart --user ${services[service].name}`;
                      } else {
                        await $`systemctl restart ${services[service].name}`;
                      };
                      break;
                    case '4':
                      if (services[service].type == 'user') {
                        await $`systemctl enable --user ${services[service].name}`;
                      } else {
                        await $`systemctl enable ${services[service].name}`;
                      };
                      break;
                    case '5':
                      if (services[service].type == 'user') {
                        await $`systemctl disable --user ${services[service].name}`;
                      } else {
                        await $`systemctl disable ${services[service].name}`;
                      };
                      break;
                    case '6':
                      if (services[service].type == 'user') {
                        await verbose_bash(`systemctl status --user ${services[service].name}`);
                      } else {
                        await verbose_bash(`systemctl status ${services[service].name}`);
                      };
                      break;
                    case '7':
                      services.splice(service, 1);
                      fs.outputJsonSync(hlu_userpath+'/services.json', services, {spaces: 2});
                      break;
                  };
                };
              };
              break;
          };
        };
      };  
  };
}

async function steam_options() {
  let launcher_settings = [];
  let launcher = {name: 'Steam Game', info: {type: 'steam'}};
  let settings = await settings_init(launcher, fs.readJsonSync(hlu_userpath+'/settings.json'));
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcher_settings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value
        });
      };
    };
  };
  let command = await launcher_command(launcher, launcher_settings);
  console.log('Copy & paste '+chalk.cyan('this')+' to the '+chalk.green('steam game')+' properties:\n'+chalk.cyan(command));
  $`echo ${command}`;
}

async function hlu_updater() {
  cd(hlu_userpath);
  await $`git clone https://github.com/sergeyhist/hlu-js.git`;
  fs.copySync(hlu_userpath+'/hlu-js/settings.json', hlu_userpath+'/settings.json');
  fs.copySync(hlu_userpath+'/hlu-js/packages.json', hlu_userpath+'/packages.json');
  fs.removeSync(hlu_userpath+'/hlu-js');
}
