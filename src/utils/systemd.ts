import { chalk, $, fs } from "zx";
import { generalInput } from "./input";
import { ISystemdService, userPath } from "../model";
import { listSelector } from "./list";
import { verboseBash } from "./common";

export const systemdController = async () => {
  let addService = async () => {
    let service: ISystemdService = {
      name: "",
      path: "",
      type: "user",
    };

    service.name = await generalInput({
      qstring:
        "Enter " +
        chalk.cyan("name") +
        " of the " +
        chalk.green("service") +
        " (Example: " +
        chalk.cyan("gdm.service") +
        ")",
      hfile: "service_names",
    });

    let path =
      await $`systemctl show --user -p FragmentPath ${service.name} | tr -d '\\n'`;
    if (path.stdout == "FragmentPath=") {
      path =
        await $`systemctl show -p FragmentPath ${service.name} | tr -d '\\n'`;
      service.type = "root";
    } else {
      service.type = "user";
    }

    service.path = path.stdout.split("=").pop() as string;
    return service;
  };

  let services: ISystemdService[] = [];
  let systemd_menu;

  switch (fs.existsSync(userPath + "/services.json")) {
    case false:
      services.push(await addService());
      fs.outputJsonSync(userPath + "/services.json", services, {
        spaces: 2,
      });
    case true:
      while (systemd_menu != 0) {
        let service = 0;

        systemd_menu = await listSelector({
          name: "Systemd Controller",
          items: ["Services list", "Add Service"],
          options: ["continue"],
        });

        if (systemd_menu != 0) {
          switch (systemd_menu) {
            case "2":
              services = fs.readJsonSync(userPath + "/services.json");
              services.push(await addService());
              fs.outputJsonSync(userPath + "/services.json", services, {
                spaces: 2,
              });
            case "1":
              while (service + 1 != 0) {
                let statuses = [];
                let status;

                services = fs.readJsonSync(userPath + "/services.json");
                for (let item of services) {
                  if (item.type == "user") {
                    status =
                      await $`systemctl show --user -p ActiveState ${item.name} | tr -d '\\n'`;
                  } else {
                    status =
                      await $`systemctl show -p ActiveState ${item.name} | tr -d '\\n'`;
                  }
                  statuses.push(status.stdout.split("=").pop() as string);
                }
                service =
                  +(await listSelector({
                    name: "Services List",
                    items: services.map((service) => service.name),
                    descriptions: services.map((service) => service.path),
                    values: statuses,
                    options: ["continue"],
                  })) - 1;
                if (service + 1 != 0) {
                  switch (
                    await listSelector({
                      name: services[service].name,
                      items: [
                        "Start",
                        "Stop",
                        "Restart",
                        "Enable",
                        "Disable",
                        "Status",
                        "Reset",
                        "Unlist",
                      ],
                      options: ["continue"],
                    })
                  ) {
                    case "1":
                      if (services[service].type == "user") {
                        await $`systemctl start --user ${services[service].name}`;
                      } else {
                        await $`systemctl start ${services[service].name}`;
                      }
                      break;
                    case "2":
                      if (services[service].type == "user") {
                        await $`systemctl stop --user ${services[service].name}`;
                      } else {
                        await $`systemctl stop ${services[service].name}`;
                      }
                      break;
                    case "3":
                      if (services[service].type == "user") {
                        await $`systemctl restart --user ${services[service].name}`;
                      } else {
                        await $`systemctl restart ${services[service].name}`;
                      }
                      break;
                    case "4":
                      if (services[service].type == "user") {
                        await $`systemctl enable --user ${services[service].name}`;
                      } else {
                        await $`systemctl enable ${services[service].name}`;
                      }
                      break;
                    case "5":
                      if (services[service].type == "user") {
                        await $`systemctl disable --user ${services[service].name}`;
                      } else {
                        await $`systemctl disable ${services[service].name}`;
                      }
                      break;
                    case "6":
                      if (services[service].type == "user") {
                        await verboseBash(
                          `systemctl status --user ${services[service].name}`
                        );
                      } else {
                        await verboseBash(
                          `systemctl status ${services[service].name}`
                        );
                      }
                      break;
                    case "7":
                      if (services[service].type == "user") {
                        await verboseBash(
                          `systemctl reset-failed --user ${services[service].name}`
                        );
                      } else {
                        await verboseBash(
                          `systemctl reset-failed ${services[service].name}`
                        );
                      }
                      break;
                    case "8":
                      services.splice(service, 1);
                      fs.outputJsonSync(userPath + "/services.json", services, {
                        spaces: 2,
                      });
                      break;
                  }
                }
              }
              break;
          }
        }
      }
  }
};
