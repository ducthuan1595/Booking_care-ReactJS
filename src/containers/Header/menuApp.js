export const adminMenu = [
  //hệ thống
  //magage user
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/schedule-manage",
      },
    ],
  },

  //manage-clinic
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },

  //mange speciality
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },

  //manage handbook
  {
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

//doctor Menu
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //manage schedule check of doctor
        name: "menu.doctor.manage-schedule",
        link: "/doctor/schedule-manage",
      },
      {
        //manage patient check of doctor
        name: "menu.doctor.manage-patient",
        link: "/doctor/patient-manage",
      },
    ],
  },
];
