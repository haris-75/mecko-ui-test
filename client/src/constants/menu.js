const data = [
  // {
  //   // id: "dashboards",
  //   // icon: "iconsminds-monitor-analytics",
  //   // label: "menu.dashboards",
  //   // to: "/app/dashboards"
  //   // subs: [
  //   //   {
  //   //     icon: "simple-icon-briefcase",
  //   //     label: "menu.default",
  //   //     to: "/app/dashboards/default"
  //   //   },
  //   //   {
  //   //     icon: "simple-icon-pie-chart",
  //   //     label: "menu.analytics",
  //   //     to: "/app/dashboards/analytics"
  //   //   },
  //   //   {
  //   //     icon: "simple-icon-basket-loaded",
  //   //     label: "menu.ecommerce",
  //   //     to: "/app/dashboards/ecommerce"
  //   //   },
  //   //   {
  //   //     icon: "simple-icon-doc",
  //   //     label: "menu.content",
  //   //     to: "/app/dashboards/content"
  //   //   }
  //   // ]
  // },
  {
    id: "jobs",
    icon: "iconsminds-monitor-analytics",
    label: "menu.jobs",
    to: "/app/jobs",
    subs: [
      {
        id: "all-jobs",
        icon: "iconsminds-monitor-analytics",
        label: "All Jobs",
        to: "/app/jobs/all"
      }
      // {
      //   id: "create-job",
      //   icon: "iconsminds-monitor-analytics",
      //   label: "Create Job",
      //   to: "/app/jobs/create",
      // },
      // {
      //   id: "graph-sample",
      //   icon: "iconsminds-monitor-analytics",
      //   label: "Graph Sample",
      //   to: "/app/jobs/graphsample"
      // }
    ]
  }
];
export default data;
